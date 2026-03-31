const mongoose = require("mongoose");


const departmentSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : true,
    },
    description : {
        type : String, 
        required : true,
    },
    organisationId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Organisation",
        required : true,
    },
    issues : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Issue",
        }
    ],
    privacy : {
        type : String,
        enum : ["Private", "Public"],
        required : true,
    }
})

module.exports = mongoose.model("Department", departmentSchema);