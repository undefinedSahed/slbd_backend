const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => {
            console.error("AsyncHandler caught an error:", error);
            next(error)
        });
    };
}

export { asyncHandler };