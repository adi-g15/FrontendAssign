const { model, Schema } = require("mongoose");

/**
 * The schema contains these, should be readable from the schema itself too
 * 
 * Pretty Name: Name , Type: string, key: name
 * Pretty Name: Screen Name, type: string, key: screen_name
 * Pretty Name: Followers Count, type: number, key: followers_count
 * Pretty Name: Following Count, type: number, key: following_count
 * Pretty Name: Location, type: string. key: location
 * Pretty Name: Verified, type: boolean, key:verified
 */
const profileSchema = Schema({
    name: {
        type: String
    },
    screen_name: {
        type: String,
        unique: true,
        required: true
    },
    followers_count: {
        type: Number
    },
    following_count: {
        type: Number
    },
    location: {
        type: String
    },
    verified: {
        type: Boolean
    }
});

module.exports = model('profiles', profileSchema);
