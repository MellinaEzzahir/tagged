import { createContext, useState, useEffect } from 'react';
import { account } from './lib/app-write';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const user = await account.get();
                setIsLoggedIn(true)
            }catch (error) {
                console.log("Auth check failed:", error.message);
                setIsLoggedIn(false);
            }
        }
        checkLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value ={{
            isLoggedIn,
            setIsLoggedIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}