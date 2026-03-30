const mongoose = require("mongoose");


const organisationSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String, 
        required : true,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true,
    },
    department : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Department",
        }
    ],
    privacy : {
        type : String, 
        enum : ["Private", "Public"],
        required : true,
    }
})


module.exports = mongoose.model("Organisations", organisationSchema);