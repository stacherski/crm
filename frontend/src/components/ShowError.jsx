export function ShowError({ error = "There has been an error... 404" }) {

    const errorList = {
        200: "All ok, proceed!",
        401: "Unauthorized, authentication failed",
        403: "Access forbidden, no permission",
        404: "Not found",
        500: "Internal Server Error, try again later",
        503: "Service unavailable"
    }

    return (
        <div className="error">
            <h2>{errorList[error.match(/\d+/g)[0]]}</h2>
        </div>
    )
}