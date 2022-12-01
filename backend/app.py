# app.py

# Required imports
from flask_cors import CORS, cross_origin
from flask import Flask
import uuid
from google.cloud import storage
import os
import datetime
from flask import Flask, request, jsonify
from google.cloud import firestore
import google.auth.transport.requests
from google.oauth2 import id_token
from functools import wraps
from audio import processAudio

from pyasn1.type.univ import Null
import sys

HTTP_REQUEST = google.auth.transport.requests.Request()

# Initialize Flask app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Initialize Firestore DB
db = firestore.Client()
users_collection = db.collection('users')

# Initialize Cloud Storage
CLOUD_STORAGE_BUCKET_NAME = "als-audio-bucket"
storage_client = storage.Client.from_service_account_json(
    'serviceaccount.json')
bucket = storage_client.get_bucket(CLOUD_STORAGE_BUCKET_NAME)

# Helper function to check the user's token


def check_token(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        auth_header = request.headers['Authorization']
        if not auth_header:
            return {'message': 'No token provided'}, 400
        idtoken = auth_header.split(' ').pop()
        claims = id_token.verify_firebase_token(
            idtoken, HTTP_REQUEST, audience=os.environ.get('GOOGLE_CLOUD_PROJECT'))
        if not claims:
            return 'Unauthorized', 401
        return f(*args, **kwargs)
    return wrap

# Register a new user


@app.route('/register', methods=['POST'])
@check_token
def register():
    data = request.get_json()
    if not data:
        return {'message': 'No data provided'}, 400
    auth_header = request.headers['Authorization']
    idtoken = auth_header.split(' ').pop()
    claims = id_token.verify_firebase_token(
        idtoken, HTTP_REQUEST, audience=os.environ.get('GOOGLE_CLOUD_PROJECT'))
    user_ref = users_collection.document(claims['sub'])
    user_snapshot = user_ref.get()
    if user_snapshot.exists:
        return {'message': 'User already exists'}, 400
    user_ref.set(data)
    return {'message': data}, 200

# "Login" a user


@app.route('/login', methods=['GET'])
@check_token
def login():
    return {'message': 'Successfully logged in'}, 200

# Upload Audio


@app.route('/upload_audio', methods=['POST'])
@check_token
def upload_audio():
    destination_file_name = f'Audio{uuid.uuid1()}.wav'
    file = request.files['file']
    fileName = file.filename
    blob = bucket.blob(destination_file_name)
    
    blob.upload_from_string(file.read(), content_type=file.content_type)
    
    # tmp folder for processed audio files
    file_path = '/tmp/' + str(fileName)
    blob.download_to_filename(file_path)
    processedFilePaths = processAudio(file_path)

    firebaseEntries = []

    unique_folder="Folder "+str(uuid.uuid1()) #generates a unique folder id for all the chunks the audio file will be split into
    
    # uploads processed audio files to new blobs
    for path in processedFilePaths:
        dest_processed_file = f'Audio{uuid.uuid1()}.wav'
        processedFileName = path.split('/tmp/')[1]
        firebaseEntries.append((processedFileName, dest_processed_file, unique_folder))

        blob = bucket.blob(dest_processed_file)
        blob.upload_from_filename(path, content_type='audio/wav')
    

    auth_header = request.headers['Authorization']
    idtoken = auth_header.split(' ').pop()
    claims = id_token.verify_firebase_token(
        idtoken, HTTP_REQUEST, audience=os.environ.get('GOOGLE_CLOUD_PROJECT'))
    user_ref = users_collection.document(claims['sub'])

    doc = user_ref.get()
    if doc.exists:        
        doc = doc.to_dict()

        # uploads each processed file name/path to firebase
        for (procfileName, destprocFile, folderid) in firebaseEntries:
            if "audio" in doc:
                doc["audio"].append({procfileName: destprocFile})
                user_ref.update({"audio": doc["audio"]})
            else:
                user_ref.update({"audio": [{procfileName: destprocFile}]})
                doc = user_ref.get()
                doc = doc.to_dict()

    else:
        print(u'No such document!')
    
    if len(processedFilePaths) == 0:
        return "No processed files to upload"
    else:
        fileNames, destFiles, folderid = zip(*firebaseEntries)
        return "Files {} uploaded to {} in folder {}.".format(fileNames, destFiles, folderid)


@app.route('/upload_audios', methods=['POST'])
@check_token
def upload_audios():
    # Upload multiple audio files
    files = request.files.getlist('file')
    if not files:
        return {'message': 'No files provided'}, 400
    auth_header = request.headers['Authorization']
    idtoken = auth_header.split(' ').pop()
    claims = id_token.verify_firebase_token(
        idtoken, HTTP_REQUEST, audience=os.environ.get('GOOGLE_CLOUD_PROJECT'))
    # check if claims is None
    if not claims:
        return 'Unauthorized', 401
    user_ref = users_collection.document(claims['sub'])
    doc = user_ref.get()
    if doc.exists:
        doc = doc.to_dict()
        for file in files:
            destination_file_name = f'Audio{uuid.uuid1()}.wav'
            blob = bucket.blob(destination_file_name)
            blob.upload_from_string(file.read(), content_type=file.content_type)
            # process audio
            file_path = '/tmp/' + str(file.filename)
            blob.download_to_filename(file_path)
            processedFilePaths = processAudio(file_path)
            # upload processed audio
            for path in processedFilePaths:
                dest_processed_file = f'Audio{uuid.uuid1()}.wav'
                processedFileName = path.split('/tmp/')[1]
                blob = bucket.blob(dest_processed_file)
                blob.upload_from_filename(path, content_type='audio/wav')
                if "audio" in doc:
                    doc["audio"].append({processedFileName: destination_file_name, "processed": {dest_processed_file}})
                    user_ref.update({"audio": doc["audio"]})
                else:
                    user_ref.update({"audio": [{processedFileName: destination_file_name, "processed "+ destination_file_name: {dest_processed_file}}]})
                    doc = user_ref.get()
                    doc = doc.to_dict()
        return {'message': 'Files uploaded successfully'}, 200
    else:
        print(u'No such document!')
        return {'message': 'No such document'}, 400


# Get Audio
@app.route('/retrieve_audio', methods=['POST'])
def retrieve_audio():
    fileName = request.json['fileName']
    blob = bucket.blob(fileName)

    url = blob.generate_signed_url(version="v4",
                                   # This URL is valid for 30 minutes
                                   expiration=datetime.timedelta(minutes=30),
                                   # Allow GET requests using this URL.
                                   method="GET",)
    print("Generated GET signed URL:")
    return url

@app.route('/delete_unprocessed_audio', methods=['DELETE'])
def delete_unprocessed_audio():
    # In firebase, under audio, there is a list of uploaded audio,
    # each uploaded audio has two entries: the original audio file name and "processed".
    # The original audio file is by itself like "name":"address", 
    # while the "processed" is a list containing the names of the processed audio files like "processed":"[address1, address2, address2]".
    
    cloud_storage_filename = request.json['cloudStorageFileName']
    auth_header = request.json['Authorization']

    # delete the audio from firebase, and the associated processed audios from cloud storage
    idtoken = auth_header.split(' ').pop()
    claims = id_token.verify_firebase_token(
        idtoken, HTTP_REQUEST, audience=os.environ.get('GOOGLE_CLOUD_PROJECT'))
    user_ref = users_collection.document(claims['sub'])
    
    doc = user_ref.get()
    if doc.exists:
        doc = doc.to_dict()
        new_audios = []
        for audio in doc["audio"]:
            if cloud_storage_filename not in list(audio.values()):
                new_audios.append(audio)
            else:
                # delete the processed audios from cloud storage
                for processed_audio in audio["processed"]:
                    blob = bucket.blob(processed_audio)
                    blob.delete()

        user_ref.update({'audio': new_audios})
        return {'message': "Success"}, 200
    else:
        print(u'No such document!')
        return {'message': 'No such document'}, 400
    

@app.route('/delete_processed_audio', methods=['DELETE'])
def delete_processed_audio():
    # get request data
    cloud_storage_filename = request.json['cloudStorageFileName']
    auth_header = request.json['Authorization']

    # delete the unprocessed audio from cloud storage
    blob = bucket.blob(cloud_storage_filename)
    blob.delete()

    # delete the audio from firebase, and the associated processed audios from cloud storage
    idtoken = auth_header.split(' ').pop()
    claims = id_token.verify_firebase_token(
        idtoken, HTTP_REQUEST, audience=os.environ.get('GOOGLE_CLOUD_PROJECT'))
    user_ref = users_collection.document(claims['sub'])

    doc = user_ref.get()
    if doc.exists:        
        doc = doc.to_dict()
        for audio in doc["audio"]:
            if cloud_storage_filename in audio['processed']:
                audio['processed'].remove(cloud_storage_filename)

        user_ref.update({'audio': doc['audio']})
        return {'message': 'File deleted successfully'}, 200

    else:
        print(u'No such document!')
        return {'message': 'No such document'}, 400


    
port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port, debug=True)