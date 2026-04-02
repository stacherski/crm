export function Loading({ loadingText = "Loading..." }) {
    return (
        <div className="loading">
            <p>{loadingText}</p>
        </div>
    )
}