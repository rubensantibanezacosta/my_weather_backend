const crypto = require("crypto");
const db = require("../models");
const ApiKeys = db.apiKey;

const adminScopes = "login:auth,singup:auth,read:city, create:city,update:city,delete:city,read:users,create:users,update:users,delete:users"

const publicScopes = "login:auth,singup:auth,read:city, create:city,update:city,delete:city";

const apiKeys = [
    {
        id: 1,
        token: generateRandomToken(),
        scopes: adminScopes
    },
    {
        id: 2,
        token: generateRandomToken(),
        scopes: publicScopes
    }
]

function generateRandomToken() {
    const buffer = crypto.randomBytes(32);
    return buffer.toString('hex');
}

function seedApiKey(apiKey) {
    if (!ApiKeys.findAll()) {
        // Save apiKeys in the database if not exists, and update if exists
        ApiKeys.create(apiKey)
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log({
                    message:
                        err.message || "Some error occurred while creating the api keys."
                });
            });
    } else {
        // Save apiKeys in the database if not exists, and update if exists
        ApiKeys.update(apiKey, {
            where: { id: apiKey.id }
        })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log({
                    message:
                        err.message || "Some error occurred while creating the api keys."
                });
            });
    }
};

seedApiKey(apiKeys[0]);
seedApiKey(apiKeys[1]);
