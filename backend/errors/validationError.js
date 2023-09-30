class ValidationError extends Error {
    constructor(message, fields) {
        super(message);
        this.name = "ValidationError";
        this.fields = fields;
    }

    // Custom static method to handle ValidationError
    static handle(error, req, res, next) {
        res.status(400).json({
            success: false,
            error: {
                code: 400,
                message: error.message || "Validation Error",
                fields: error.fields || [],
            },
        });
    }
}

export default ValidationError;
