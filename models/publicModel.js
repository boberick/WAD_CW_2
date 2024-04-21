const nedb = require('gray-nedb');
const publicDB = new nedb({ filename: './databases/contactDB.db', autoload: true });

class Public{
    constructor(name, email, message, messageDate){
        this.name = name;
        this.email = email;
        this.message = message;
        this.messageDate = messageDate;
    }

    addMessage(name, email, message){
        var entry = {
            name: name,
            email: email,
            message: message,
            messageDate: new Date().toISOString().split('T')[0]
        }

        publicDB.insert(entry, function (err, doc) {
            if (err) {
                console.log('Error adding message', subject);
            } else {
                console.log('Message added into the database', doc);
            }
        });
    }

    deleteMessage(id){
        publicDB.remove({ _id: id }, {}, function(err, numRemoved) {
            if (err) {
                console.log('Error deleting user:', err);
            } else if (numRemoved === 0) {
                console.log('Message not found');
            } else {
                console.log('Message deleted successfully');
            }
        });
    }

    loadAllMessages(){
        return new Promise((resolve, reject) => {
            publicDB.find({}, function(err, posts){
                if(err){
                    reject(err);
                } else{
                    resolve(posts)
                    console.log("Function returns: ", posts);
                }
            });
        });
    }
}

module.exports = Public;