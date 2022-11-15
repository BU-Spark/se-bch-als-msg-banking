import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../firebase";

import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  const validateEmail = e => {
    if (email === confirmEmail) {
      setEmailError("");
    }
    else {
      setEmailError("Emails do not match.");
    }
  }

  const validatePassword = e => {
    if (password === confirmPassword) {
      setPasswordError("");
    }
    else {
      setPasswordError("Passwords do not match.");
    }
  }

  const register = () => {
    if (!name) {
      alert("Please enter name");
    } else if (emailError) {
      alert("Email and confirmation email do not match.");
    } else if (passwordError) {
      alert("Password and confirmation password do not match.");
    } else {
      registerWithEmailAndPassword(name, email, password);
    }
  };
  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading]);
  return (
    <>
      <div>
        <h1 className="login-header text-center">Register</h1>
      </div>
      <div className="register">
        <div className="register__container">
          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="text"
            className="register__textBox"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="Confirm E-mail"
            onBlur={validateEmail}
          />
          {emailError && <span className='err'>{emailError}</span>}
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="password"
            className="register__textBox"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            onBlur = {validatePassword}
          />
          {passwordError && <span className='err'>{passwordError}</span>}
          <button className="register__btn" onClick={register}>
            Register
          </button>
          <div>
            Already have an account?{" "}
            <Link to={process.env.PUBLIC_URL + "/login"}>Login</Link> now.
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
