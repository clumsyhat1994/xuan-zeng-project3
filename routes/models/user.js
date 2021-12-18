const mongoose = require('mongoose');
const UserSchema = require('../schema/user').UserSchema;

const UserModel = mongoose.model('User', UserSchema);

function getAllUser() {
    return UserModel.find().exec();
}

function findUserById(id) {
    return UserModel.findById(id).exec();
}

function createUser(user) {
    return UserModel.create(user);
}

function findUserByName(name) {
    return UserModel.findOne({ username: name }).exec();
}

function findUserFav(name) {
    return UserModel.findOne({ username: name }).populate('favorites', 'job_title company_name location').exec();
}

function addFav(username, jobId) {
    return UserModel.updateOne(
        { username: username },
        { $push: { favorites: jobId } }
    ).exec();
}

function removeFav(username, jobId) {
    return UserModel.updateOne(
        { username: username },
        { $pull: { favorites: jobId } }
    ).exec();
}

module.exports = {
    createUser,
    findUserById,
    findUserByName,
    getAllUser,
    addFav,
    removeFav,
    findUserFav
}