var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var carSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    repairing: [ 
        {
        description: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now()
        },
        cost: {
            type: Number
        }
            ,
        username: {
            type: String
        },
        privilage: {
            type: String
        }
    }
    ],
    owner: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("Cars", carSchema);
