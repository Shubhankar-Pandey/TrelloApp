const mongoose = require("mongoose");



const issuesSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : true,
    },
    description : {
        type : String, 
        required : true,
    },
    department : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Department"
    },
    privacy : {
        type : String, 
        enum : ["Private", "Public"],
    }
})


module.exports = mongoose.model("Issues", issuesSchema);