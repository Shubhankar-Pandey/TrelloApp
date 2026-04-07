const mongoose = require("mongoose");

const issuesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    privacy: {
        type: String,
        enum: ["Private", "Public"],
        required: true,
    },
    status: {
        type: String,
        enum: ["Open", "Working", "Done"],
        default: "Open",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true,
    },
    organisationId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organisation",
        required : true,
    },
    assignedTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        default : null,
    }
}, { timestamps: true });

module.exports = mongoose.model("Issue", issuesSchema);