/**
 * Created by User on 4/29/2017.
 */
var mongoose = require("mongoose")
var Subs = mongoose.Schema;

var SubsSchema = new Subs({
    Emaile:{
        type:String,
        unique:true
    }
});

module.exports = mongoose.model("Subs",SubsSchema);