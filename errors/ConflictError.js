class ConflictError extends Error {
    constructor(message){
        super(message)
        this._statusCode = 409;
    }
}

module.exports = ConflictError