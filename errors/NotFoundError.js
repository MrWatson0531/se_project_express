class NotFoundError extends Error {
    constructor(message){
        super(message)
        this._statusCode = 404;
    }
}

module.exports = NotFoundError