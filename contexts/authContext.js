import { createContext, useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from './../hooks/useLocalStorage'
import { useRouter } from 'next/router'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const router = useRouter()
    const [session, setSession] = useState(() => getLocalStorage("session", undefined))

    useEffect(() => {
        setLocalStorage("session", session);
        // console.log(session)
        if (session) {
            if (Object.keys(session).length > 0) {
                document.cookie = `userName=${session.user.name}`
                document.cookie = `userId=${session.user._id}`
                document.cookie = `token=${session.token}`
                document.cookie = `role=${session.user.role}`
            }
        }
    }, [session]);

    const quitSession = async () => {
        document.cookie = '';
        document.cookie = '';
        document.cookie = '';
        document.cookie = '';
        document.cookie = 'expires=Thu, 01 Jan 1970 00:00:00 UTC'
        setSession(undefined)
        router.replace('/');
    };

    return (
        <AuthContext.Provider value={{ session, setSession, quitSession }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;