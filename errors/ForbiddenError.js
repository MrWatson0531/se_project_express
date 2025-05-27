class ForbiddenError extends Error {
    constructor(message){
        super(message)
        this._statusCode = 403;
    }
}

module.exports = ForbiddenError