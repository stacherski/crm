// useApi.js
import { useState } from "react"

export function useApi() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    const request = async (url, method, body) => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(body),
            })
            console.log('useApi res', res)
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

            return await res.json()
        } catch (err) {
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    const patch = (url, body) => request(url, "PATCH", body)
    const post = (url, body) => request(url, "POST", body)
    const del = (url) => request(url, "DELETE")

    return { patch, post, del, loading, error }
}