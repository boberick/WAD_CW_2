const nedb = require('gray-nedb');
const pantryDB = new nedb({ filename: './databases/pantryDB.db', autoload: true });
const bcrypt = require('bcrypt');
const saltRounds = 10;

class Pantry{
    constructor(name, email, address, postcode, telephone, password, role){
        this.name = name;
        this.email = email;
        this.address = address;
        this.postcode = postcode;
        this.telephone = telephone;
        this.password = password;
        this.role = role;
    }

    lookup(email, cb) {
        pantryDB.find({'email': email}, function (err, entries) {
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
        pantryDB.remove({ _id: id }, {}, function(err, numRemoved) {
            if (err) {
                console.log('Error deleting user:', err);
            } else if (numRemoved === 0) {
                console.log('User not found');
            } else {
                console.log('User deleted successfully');
            }
        });
    }    

    createPantry(name, email, address, postcode, telephone, password){
        bcrypt.hash(password, saltRounds).then(function(hash){
            var entry = {
                name: name,
                email: email,
                address: address,
                postcode: postcode,
                telephone: telephone,
                password: hash,
                role: 'pantry'
            };

            console.log('entry created', entry);
            pantryDB.insert(entry, function (err, doc) {
                if (err) {
                    console.log('Error adding pantry', subject);
                } else {
                    console.log('Pantry added into the database', doc);
                }
            });
        });
    }

    updatePantry(id, name, address, postcode, telephone, password){
        bcrypt.hash(password, saltRounds).then(function(hash) {
            var update = {
                $set: {
                    name: name,
                    address: address,
                    postcode: postcode,
                    telephone: telephone,
                    password: hash,
                }
            };

            pantryDB.update({_id: id}, update, {}, function(err, numReplaced) {
                if(err){
                    console.log('Error updating user: ', err);
                } else{
                    console.log('User updated successfully');
                }
            });
        });
    }

    loadAllPantries(){
        return new Promise((resolve, reject) => {
            pantryDB.find({}, function(err, users){
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

module.exports = Pantry;