import { useState, useEffect, useRef } from "react"

const cache = {}
const timestamps = {}
const STALE_TIME = 1000 * 60 * 60 // 1 hour

export function useFetch(url, options = {}, deps = []) {
    const [data, setData] = useState(cache[url] || null)
    const [loading, setLoading] = useState(!cache[url])
    const [error, setError] = useState(null)
    const optionsRef = useRef(options)

    useEffect(() => {
        if (!url) return
        const controller = new AbortController()
        const signal = controller.signal

        async function fetchData() {
            const now = Date.now()
            const isStale = !timestamps[url] || now - timestamps[url] > STALE_TIME

            if (cache[url] && !isStale) {
                setData(cache[url])
                setLoading(false)
                return
            }

            setLoading(!cache[url])
            setError(null)

            try {
                const res = await fetch(url, { ...optionsRef.current, signal })
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
                const json = await res.json()
                cache[url] = json
                timestamps[url] = Date.now()
                setData(json)
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        return () => controller.abort()
    }, [url, ...deps])
    return { data, loading, error }
}