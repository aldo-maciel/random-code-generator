export const properties = {
    server: {
        port: process.env.PORT || 3001,
        host: process.env.HOST_NAME || 'localhost'
    },
    mongo: {
        host: process.env.MONGODB_HOST || 'localhost',
        port: process.env.MONGODB_PORT || 27017,
        base: process.env.MONGODB_BASE || 'codes',
        fullHost: process.env.MONGODB_FULL_HOST
    },
    log: {
        level: process.env.LOG_LEVEL || 'INFO',
        daysToKeep: process.env.LOG_DAYS || 15,
        path: process.env.LOG_PATH || 'logs/'
    }
};
