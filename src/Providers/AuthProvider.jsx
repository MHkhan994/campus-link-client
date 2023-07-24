import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase.config";
import { createContext, useEffect, useState } from "react";

const auth = getAuth(app)
export const AuthContext = createContext()



const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    console.log(user);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const googleProvider = new GoogleAuthProvider()
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const fbProvider = new FacebookAuthProvider()
    const facebookLogin = () => {
        return signInWithPopup(auth, fbProvider)
    }

    const gitProvider = new GithubAuthProvider()
    const githubLogin = () => {
        return signInWithPopup(auth, gitProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => { unsubscribe() }
    }, [])


    const passwordReset = (email) => {
        return sendPasswordResetEmail(auth, email)
    }


    const authInfo = {
        user,
        loading,
        createUser,
        login,
        googleLogin,
        logOut,
        facebookLogin,
        githubLogin,
        passwordReset
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
