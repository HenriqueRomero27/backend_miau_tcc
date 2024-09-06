export default {
    jwt: {
        secret: process.env.JWT_SECRET || "default-secret",
        expiresIn: '30d'
    }
}