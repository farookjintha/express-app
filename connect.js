const mongoose = require('mongoose');

exports.db = () => {
    mongoose.connect(`${process.env.MONGO_URI}`).then(()=> {
        console.log('Connection established...')
    }).catch((err) => {
        console.log(err);
    })
}
