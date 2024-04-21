const nedb = require('gray-nedb');
const Nedb = require('nedb');
const donationDB = new nedb({ filename: './databases/donationDB.db', autoload: true });
const claimedDB = new nedb({ filename: './databases/claimedDB.db', autoload: true });

class Donation{
    constructor(harvestDate, description, author, email, authorId, publishedDate){
        this.harvestDate = harvestDate;
        this.description = description;
        this.author = author;
        this.email = email;
        this.authorId = authorId;
        this.publishedDate = publishedDate;
    }

    createDonation(harvestDate, description, author, email, authorId){
        var entry = {
            harvestDate: harvestDate,
            description: description,
            author: author,
            email: email,
            authorId: authorId,
            publishedDate: new Date().toISOString().split('T')[0]
        }

        console.log('entry created', entry);
        donationDB.insert(entry, function(err, doc) {
            if (err) {
                console.log('Error inserting document', subject);
            } else {
                console.log('document inserted into the database', doc);
            }
        });
    }

    deleteExpired() {
        var sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
        donationDB.find({ publishedDate: { $lt: sevenDaysAgo.toISOString().split('T')[0] } }, function(err, docs) {
            if (err) {
                console.log('Error finding expired donations:', err);
                return;
            }
        
            docs.forEach(function(doc) {
                donationDB.remove({ _id: doc._id }, function(err, numRemoved) {
                    if (err) {
                        console.log('Error removing donation:', err);
                    } else {
                        console.log('Donation removed:', doc);
                    }
                });
            });
        });
    }


    updateDonation(id, harvestDate, description){
        var update = {
            $set: {
                harvestDate: harvestDate,
                description: description,
        
            }
        };

        donationDB.update({_id: id}, update, {}, function(err, numReplaced) {
            if(err){
                console.log('Error updating post: ', err);
            } else{
                console.log('Post updated successfully');
            }
        });
    }

    deleteDonation(id){
        donationDB.remove({ _id: id }, {}, function(err, numRemoved) {
            if (err) {
                console.log('Error deleting post:', err);
            } else if (numRemoved === 0) {
                console.log('Post not found');
            } else {
                console.log('Post deleted successfully');
            }
        });
    }

    getDonation(id){
        console.log(id);
        return new Promise((resolve, reject) => {
            donationDB.find({_id: id}, function(err, entry) {
                if(err){
                    reject(err);
                } else {
                    resolve(entry); // Resolve with entry data
                    console.log('Returned entry: ', entry);
                }
            });
        });
    }    

    getAllDonations() {
        return new Promise((resolve, reject) => {
            donationDB.find({}, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('function all() returns: ', entries);
                }
            });
        });
    }

    getDonationsByUser(authorId) {
        console.log(authorId);
        return new Promise((resolve, reject) => {
            donationDB.find({'authorId': authorId }, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('Returns: ', entries);
                }
            });
        });
    }

    //Claimed donations

    claimDonation(harvestDate, description, author, email, authorId, publishedDate, donationId, pantry, pantryId){
        var entry = {
            harvestDate: harvestDate,
            description: description,
            author: author,
            email: email,
            authorId: authorId,
            publishedDate: publishedDate,
            donationId: donationId,
            pantry: pantry,
            pantryId
        }

        console.log('entry created', entry);
        claimedDB.insert(entry, function(err, doc) {
            if (err) {
                console.log('Error inserting document', subject);
            } else {
                console.log('document inserted into the database', doc);
            }
        });
    }

    showAllClaimed(){
        return new Promise((resolve, reject) => {
            claimedDB.find({}, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('function all() returns: ', entries);
                }
            });
        });
    }

    getClaimedByPantry(pantryId) {
        console.log(pantryId);
        return new Promise((resolve, reject) => {
            claimedDB.find({'pantryId': pantryId }, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('Returns: ', entries);
                }
            });
        });
    }
}

module.exports = Donation;