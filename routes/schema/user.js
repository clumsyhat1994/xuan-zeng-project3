const Schema = require('mongoose').Schema;

exports.UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Job' }]
});