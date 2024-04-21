const nedb = require('gray-nedb');
const adminDB = new nedb({ filename: './databases/adminDB.db', autoload: true });
const bcrypt = require('bcrypt');
const saltRounds = 10;

class Admin{
    constructor(name, email, password, role){
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    lookup(email, cb) {
        adminDB.find({'email': email}, function (err, entries) {
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

    deleteAdmin(id) {
        adminDB.remove({ _id: id }, {}, function(err, numRemoved) {
            if (err) {
                console.log('Error deleting user:', err);
            } else if (numRemoved === 0) {
                console.log('User not found');
            } else {
                console.log('User deleted successfully');
            }
        });
    }

    createAdmin(name, email, password){
        bcrypt.hash(password, saltRounds).then(function(hash){
            var entry = {
                name: name,
                email: email,
                password: hash,
                role: 'admin'
            };

            console.log('entry created', entry);
            adminDB.insert(entry, function (err, doc) {
                if (err) {
                    console.log('Error adding user', subject);
                } else {
                    console.log('User added into the database', doc);
                }
            });
        });
    }

    updateAdmin(id, name, password){
        bcrypt.hash(password, saltRounds).then(function(hash) {
            var update = {
                $set: {
                    name: name,
                    password: hash
                }
            };

            adminDB.update({_id: id}, update, {}, function(err, numReplaced) {
                if(err){
                    console.log('Error updating user: ', err);
                } else{
                    console.log('User updated successfully');
                }
            });
        });
    }  
    
    loadAllAdmins(){
        return new Promise((resolve, reject) => {
            adminDB.find({'role': 'admin'}, function(err, users){
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

module.exports = Admin;