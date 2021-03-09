const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (cb) => {
    MongoClient.connect('mongodb+srv://xyfka:KrB5lDNMddLb7apQ@cluster0.cumre.mongodb.net/shop?retryWrites=true&w=majority', { 
        useUnifiedTopology: true })
.then(client => {
    console.log("Database Connected!");
    _db = client.db();
    cb();
})
.catch(err => {console.log(err);
    throw err;
    });
};

const getDB = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;