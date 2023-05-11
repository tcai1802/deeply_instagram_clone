const admin = require('firebase-admin');
var serviceAccount = require("./service-account-file.json");


const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = app
