const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors"); // integrate backend with frontend



const dotenv = require("dotenv");
dotenv.config();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:process.env.FRONTEND_URL,
		credentials:true,
	})
)


// connect to db
const {dbConnect} = require("./Configure/Database");
dbConnect();


// import routes
const auth = require("./Routes/Auth");
const organisation = require("./Routes/Organisation");
const department = require("./Routes/Department");
const issue = require("./Routes/Issue");
const owner = require("./Routes/Owner");
const request = require("./Routes/Request");
const employee = require("./Routes/Employee");



// map routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/organisation", organisation);
app.use("/api/v1/organisation/department", department);
app.use("/api/v1/organisation/department/issue", issue);
app.use("/api/v1/owner", owner);
app.use("/api/v1/request", request);
app.use("/api/v1/employee", employee);



// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started at port nummber ${PORT}`);
})