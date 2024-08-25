class AppError extends Error {
    public readonly message!: string
    public readonly statusCode?: number

    constructor(message: string, statusCode: number) {
        super(
            message,
            
        )
    }
}

export default AppError
