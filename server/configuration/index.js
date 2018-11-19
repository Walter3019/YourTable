if (process.env.NODE_ENV === 'test') {
    module.exports = {
        JWT_SECRET: '',
        MONGODB_URI: '',
        SESSION: '',
        google: {
            clientID: '',
            clientSecret: '',
            callbackURL: '',
        },
        facebook: {
            clientID: '',
            clientSecret: '',
            callbackURL: ''
        }
    }
} else {
    module.exports = {
        JWT_SECRET: '',
        MONGODB_URI: '',
        SESSION: '',
        google: {
            clientID: '',
            clientSecret: '',
            callbackURL: '',
        },
        facebook: {
            clientID: '',
            clientSecret: '',
            callbackURL: ''
        }
    }
}