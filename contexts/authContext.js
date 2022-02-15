import { createContext, useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from './../hooks/useLocalStorage'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(() => getLocalStorage("session", undefined))

    useEffect(() => {
        setLocalStorage("session", session);
        if (session) {
            if (Object.keys(session).length > 0) {
                document.cookie = `userName=${session.user.name}; userId=${session.user._id}; token=${session.token}; role=${session.user.role}`
            }
        }
    }, [session]);

    const quitSession = async () => {
        document.cookie = 'userName = ; userId = ; token = ; role = ; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setSession(undefined)
    };

    return (
        <AuthContext.Provider value={{ session, setSession, quitSession }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;