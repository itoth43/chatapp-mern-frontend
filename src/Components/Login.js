import React from "react";
import { Button } from "@material-ui/core";
import "../style/Login.css";
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from "../reducer";

const Login = () => {
    const [{}, dispatch] = useStateValue();

    // signup function to sign in with email and password using firebase
    // const signUp = (e) => {
    //     e.preventDefault();

    //     auth  
    //     .createUserWithEmailAndPassword(email, password)
    //     .then((authUser) => {
    //         return authUser.user.updateProfile({
    //         displayName: username,
    //         photoUrl: "./profile.jpg",
    //         })
    //     })
    //     .catch((error) => alert(error.message))
    // }

    // login function to sign in with email and password using firebase
    // const login = (e) => {
    //     e.preventDefault();

    //     auth
    //     .signInWithEmailAndPassword(email, password)
    //     .catch((error) => alert(error.message))
    // }
    

    // login function to sign in with google email
    const signInWithGoogle = () => {
        auth
        .signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error) => alert(error.message));
    }

    // login function to sign in with a demo email and password preset in firebase
    const demoLogin = (e) => {
        e.preventDefault();

        auth
        .signInWithEmailAndPassword("email@email.com", "demoPassword")
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error) => alert(error.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Telegram_X_2019_Logo.svg/512px-Telegram_X_2019_Logo.svg.png"
                    alt="appLogo"
                />
                <div className="login__text">
                    <h1>Sign in to ChatApp</h1>
            </div>
            <Button type="submit" onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</Button>
            <Button type="submit" onClick={demoLogin}>DEMO LOGIN</Button>
            </div>
        </div>
    )
}

export default Login
