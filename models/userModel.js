const nedb = require('gray-nedb');
const userDB = new nedb({ filename: './databases/userDB.db', autoload: true });
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User{
    constructor(name, email, password, role){
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    lookup(email, cb) {
        userDB.find({'email': email}, function (err, entries) {
        if (err) {
            return cb(null, null);
        } else {
            if (entries.length == 0) {
                return cb(null, null);
            }
                return cb(null, entries[0]);
            }
        });
    }

    deleteUser(id) {
        userDB.remove({ _id: id }, {}, function(err, numRemoved) {
            if (err) {
                console.log('Error deleting user:', err);
            } else if (numRemoved === 0) {
                console.log('User not found');
            } else {
                console.log('User deleted successfully');
            }
        });
    }    

    createUser(name, email, password) {
        bcrypt.hash(password, saltRounds).then(function(hash) {
            var entry = {
                name: name,
                email: email,
                password: hash,
                role: 'user'
            };

            userDB.insert(entry, function (err) {
                if (err) {
                    console.log("Can't insert user: ", email);
                }
            });
        });
    }

    updateUser(id, name, password){
        bcrypt.hash(password, saltRounds).then(function(hash) {
            var update = {
                $set: {
                    name: name,
                    password: hash
                }
            };

            userDB.update({_id: id}, update, {}, function(err, numReplaced) {
                if(err){
                    console.log('Error updating user: ', err);
                } else{
                    console.log('User updated successfully');
                }
            });
        });
    }

    loadAllUsers(){
        return new Promise((resolve, reject) => {
            userDB.find({'role': 'user'}, function(err, users){
                if(err){
                    reject(err);
                } else{
                    resolve(users)
                    console.log("Function returns: ", users);
                }
            });
        });
    }
}

module.exports = User;