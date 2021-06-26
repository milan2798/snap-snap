import React, { useState,useEffect } from 'react'
import { auth, provider } from '../../features/firebase'
import MonochromePhotosIcon from '@material-ui/icons/MonochromePhotos';

import './signin.css'
import {useDispatch} from 'react-redux';
import { login } from '../../features/appSlice';

function Signin() {
    const dispatch = useDispatch();
    const handlesignin = () => {
        auth.signInWithPopup(provider)
        .then(result=>{
          dispatch(login({
            userName:result.user.displayName,
            useImage:result.user.photoURL ,
            id:result.user.uid
        }))})
        .catch((error)=>alert(error.message));
    }
    useEffect(() => {
        console.log("Redirect");
        // auth
        // .getRedirectResult()
        // .then((result) => {
        //   if (result.credential) {
        //     /** @type {firebase.auth.OAuthCredential} */
        //     var credential = result.credential;
      
        //     // This gives you a Google Access Token. You can use it to access the Google API.
        //     var token = credential.accessToken;
        //     console.log("Redirected-success",token);
        //     history.push('/chats')
        //     // ...
        //   }
        //   // The signed-in user info.
        //   var user = result.user;
        // }).catch((error) => {
        //   // Handle Errors here.
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   // The email of the user's account used.
        //   var email = error.email;
        //   // The firebase.auth.AuthCredential type that was used.
        //   var credential = error.credential;
        //   console.log("Redirected-failed",credential);
        //   // ...
        // });
    
    })
    return (
        <div className="signin">
           <MonochromePhotosIcon className="snap_icon"/>
            <h5 className="signin_btn" onClick={handlesignin}>SIGN IN</h5>   
            {<p></p>}
        </div>
    )
}

export default Signin
