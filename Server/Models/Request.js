const mongoose = require("mongoose");


const requestSchema = new mongoose.Schema({
    from : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    to : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    issue : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Issue",
        required : true,
    },
    message : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        enum : ["Pending", "Accepted"],
        required : true,
    }
},{timestamps : true});


module.exports = mongoose.model("Request", requestSchema);