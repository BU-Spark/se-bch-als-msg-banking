(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{123:function(e,t,n){},125:function(e,t,n){},126:function(e,t,n){},128:function(e,t,n){"use strict";n.r(t);var a,c=n(2),r=n.n(c),s=n(38),o=n.n(s),i=(n(94),n(95),n(18)),l=n(80),b=n(134),u=n(133),j=n(131),d=n(87),h=n(82),g=n.p+"static/media/BCHlogo.0d2773d9.png",p=(n(96),n(0)),O=n.n(p),m=n(1),f=n(89),x=n(60),v=(n(98),n(129),n(67)),k=n.n(v),w=x.a.initializeApp({apiKey:"AIzaSyBsq899DDVYofdoPCf2bqVBwHw_lvhejyE",authDomain:"als-message-banking.firebaseapp.com",projectId:"als-message-banking",storageBucket:"als-message-banking.appspot.com",messagingSenderId:"490757581389",appId:"1:490757581389:web:f9b333a23d6ab25a4cca04",measurementId:"G-YX8E8LDL9S"}),y=w.auth(),L=w.firestore(),N=(Object(f.a)(w),new x.a.auth.GoogleAuthProvider),C=new x.a.auth.FacebookAuthProvider,F=function(){var e=Object(m.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.signInWithPopup(N);case 3:(t=e.sent).user.getIdTokenResult().then(function(){var e=Object(m.a)(O.a.mark((function e(n){var a,c,r;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.user,c="Bearer "+n.token,console.log(c),e.next=5,k.a.post("https://api-dev-z2scpwkwva-uc.a.run.app/register",{uid:a.uid,name:a.displayName,authProvider:"google",email:a.email},{headers:{"Content-Type":"application/json",Authorization:c}});case 5:r=e.sent,console.log(r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0),alert(e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),I=function(){var e=Object(m.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.signInWithPopup(C);case 3:(t=e.sent).user.getIdTokenResult().then(function(){var e=Object(m.a)(O.a.mark((function e(n){var a,c,r;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.user,c="Bearer "+n.token,console.log(c),e.next=5,k.a.post("https://api-dev-z2scpwkwva-uc.a.run.app/register",{uid:a.uid,name:a.displayName,authProvider:"facebook",email:a.email},{headers:{"Content-Type":"application/json",Authorization:c}});case 5:r=e.sent,console.log(r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0),alert(e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),S=function(){y.signOut()},A=n(36),E=n(7);var B=function(){var e,t=h.a.div(a||(a=Object(l.a)(["\n      .navbar-custom {\n        background-color: #EEF5DB;\n      }\n      .navbar-light .nav-link {\n        color: #2ca6a4;\n        &:hover {\n          color: black;\n        }\n      }\n    "]))),n=Object(A.a)(y),c=Object(i.a)(n,3),r=c[0];return c[1],c[2],e=r?Object(E.jsx)(b.a,{className:"ml-auto",children:Object(E.jsx)(b.a.Link,{onClick:S,className:"login-item",children:"Log Out"})}):Object(E.jsx)(b.a,{className:"ml-auto",children:Object(E.jsx)(b.a.Link,{href:"/se-bch-als-msg-banking/login",className:"login-item",children:"Log In"})}),Object(E.jsx)(E.Fragment,{children:Object(E.jsx)(t,{children:Object(E.jsx)(u.a,{className:"navbar-custom block-example border-bottom border-dark shadow",children:Object(E.jsxs)(j.a,{children:[Object(E.jsxs)(u.a.Brand,{href:"https://www.childrenshospital.org/",style:{color:"#1b4079"},children:[Object(E.jsx)(d.a,{src:g,alt:"Logo"}),"ALS Message Ediging"]}),Object(E.jsx)(u.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(E.jsxs)(b.a,{className:"me-auto",children:[Object(E.jsx)(b.a.Link,{href:"/se-bch-als-msg-banking/",children:"Home"}),r&&Object(E.jsx)(b.a.Link,{href:"/se-bch-als-msg-banking/upload",children:"Upload"}),Object(E.jsx)(b.a.Link,{href:"/se-bch-als-msg-banking/about",children:"About Us"})]}),e]})})})})},_=n(21);n(123);var P=function(){var e=Object(A.a)(y),t=Object(i.a)(e,3),n=t[0],a=t[1],r=(t[2],Object(c.useState)("")),s=Object(i.a)(r,2),o=(s[0],s[1],Object(_.f)());return Object(c.useEffect)((function(){a||n&&o.replace("/se-bch-als-msg-banking/dashboard")}),[n,a]),Object(E.jsxs)(E.Fragment,{children:[Object(E.jsx)("h1",{className:"home-header text-center",children:"Rediscover your voice"}),Object(E.jsx)("h2",{className:"home-header text-center",children:"ALS Voice Editing"})]})},D=n(135);var T=function(){var e=Object(A.a)(y),t=Object(i.a)(e,3),n=t[0],a=t[1],r=(t[2],Object(_.f)());return Object(c.useEffect)((function(){a||n||r.replace("/home")}),[n,a]),Object(E.jsx)("div",{children:Object(E.jsx)(D.a.Group,{controlId:"formFile",class:"col-lg-6 offset-lg-3",children:Object(E.jsxs)("div",{className:"row justify-content-center",children:[Object(E.jsx)(D.a.Label,{children:"Label your File"}),Object(E.jsx)(D.a.Control,{type:"input",style:{width:"50%"},name:"title"}),Object(E.jsx)(D.a.Label,{children:"Upload your data"}),Object(E.jsx)(D.a.Control,{type:"file",style:{width:"50%"},name:"fileName"}),Object(E.jsx)(D.a.Control,{type:"submit",onClick:function(){},style:{width:"20%",backgroundColor:"#2ca6a4"}})]})})})},z=n(132);n(125);var U=function(){var e=Object(A.a)(y),t=Object(i.a)(e,3),n=t[0],a=t[1],r=(t[2],Object(c.useState)("")),s=Object(i.a)(r,2),o=s[0],l=s[1],b=Object(_.f)(),u=function(){var e=Object(m.a)(O.a.mark((function e(){var t,a;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,L.collection("users").where("uid","==",null===n||void 0===n?void 0:n.uid).get();case 3:return t=e.sent,e.next=6,t.docs[0].data();case 6:a=e.sent,l(a.name),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0),alert("An error occured while fetching user data");case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){if(!a)return n?void u():b.replace("/se-bch-als-msg-banking/")}),[n,a]),Object(E.jsxs)(E.Fragment,{children:[Object(E.jsx)("h1",{className:"dashboard-header text-center",children:"Rediscover your voice"}),Object(E.jsx)("h2",{className:"dashboard-header text-center",children:"ALS Voice Editing"}),Object(E.jsx)("br",{}),Object(E.jsxs)("div",{class:"col-md-12 text-center",children:[Object(E.jsx)(z.a,{className:"align-center",href:"/se-bch-als-msg-banking/Upload",children:"Upload your audio"}),Object(E.jsxs)("div",{children:["Logged in as",Object(E.jsx)("div",{children:o}),Object(E.jsx)("div",{children:null===n||void 0===n?void 0:n.email}),Object(E.jsx)(z.a,{onClick:S,children:"Logout"})]})]})]})};n(126);var G=function(){var e=Object(c.useState)(""),t=Object(i.a)(e,2),n=(t[0],t[1],Object(c.useState)("")),a=Object(i.a)(n,2),r=(a[0],a[1],Object(A.a)(y)),s=Object(i.a)(r,3),o=s[0],l=s[1],b=(s[2],Object(_.f)());return Object(c.useEffect)((function(){l||o&&b.replace("/se-bch-als-msg-banking/dashboard")}),[o,l]),Object(E.jsxs)(E.Fragment,{children:[Object(E.jsx)("div",{children:Object(E.jsx)("h1",{className:"login-header text-center",children:"Login to use ALS Message Banking services"})}),Object(E.jsx)("div",{className:"login",children:Object(E.jsxs)("div",{className:"login__container",children:[Object(E.jsx)("button",{className:"login__btn login__google",onClick:F,children:"Login with Google"}),Object(E.jsx)("button",{className:"login__btn login__facebook",onClick:I,style:{textDecoration:"line-through"},children:"Login with Facebook"})]})})]})},R=n(66);n(127);var V=function(){return Object(E.jsx)("div",{children:Object(E.jsxs)(R.a,{children:[Object(E.jsx)(B,{}),Object(E.jsx)("br",{}),Object(E.jsxs)(_.c,{children:[Object(E.jsx)(_.a,{exact:!0,path:"/se-bch-als-msg-banking/",component:P}),Object(E.jsx)(_.a,{path:"/se-bch-als-msg-banking/upload",component:T}),Object(E.jsx)(_.a,{path:"/se-bch-als-msg-banking/dashboard",component:U}),Object(E.jsx)(_.a,{path:"/se-bch-als-msg-banking/login",component:G})]})]})})},H=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,136)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};o.a.render(Object(E.jsx)(r.a.StrictMode,{children:Object(E.jsx)(V,{})}),document.getElementById("root")),H()},94:function(e,t,n){},95:function(e,t,n){},96:function(e,t,n){}},[[128,1,2]]]);
//# sourceMappingURL=main.ea38a937.chunk.js.map