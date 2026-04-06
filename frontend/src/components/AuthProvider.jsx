import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext('AuthContext')

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchMe() {
            try {
                const res = await fetch("/auth/me", {
                    credentials: "include"
                })
                if (!res.ok) throw new Error()
                const data = await res.json()
                setUser(data)
            } catch {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchMe()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}