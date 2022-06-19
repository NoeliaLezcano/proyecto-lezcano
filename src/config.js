import fs from 'fs'

export default {
    fileSystem: {
        path: './DB'
    },
    mongodb: {
        cnxStr: 'mongodb+srv://noelia:<password>@cluster0.drbgsha.mongodb.net/?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
        serviceAccount : JSON.parse(fs.readFileSync("./DB/coderhouse-26159-firebase-adminsdk-mkgn3-bed90d151a.json", 'utf8'))
    },
    MODO_PERSISTENCIA: 'json'
}
