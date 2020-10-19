export function emptyToString(str) {
    return typeof (str) == "undefined" ? "" : str == null ? "" : str
}

export function ApiFormat(code, info, data) {
    return { code: code, info: info, data: data }
}

export function rejectNull(str, label, res, message) {
    if (!message) {
        message = label + " cannot be empty"
    }

    if (typeof (str) == "undefined") {
        res.status(200).json(ApiFormat(500, message, []))
        throw new Error("data is empty");
    } else {
        if (str == null) {
            res.status(200).json(ApiFormat(500, message, []))
            throw new Error("data is empty");
        } else {
            return str
        }
    }
}