const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { sequelize } = require("./DB/index");
const { initRoutes } = require("./routes");
const passport = require("passport");
const { Server, Socket } = require("socket.io");
const { initSocket } = require("./utils/notification.utils");
require("./middlewares/passport.auth");
const http = require("http");
const server = http.createServer(app);
const HttpException = require("./exceptions/httpException");
app.use(express.json());
app.use(passport.initialize());
app.use(cors());
initRoutes(app);
const staticPath = path.join(__dirname, "./canteen_front/Front");
// console.log(staticPath);
app.use(express.static(staticPath));
//connecting to sequelize database
sequelize
  .authenticate()
  .then(() => {
    //  sequelize.sync({force:true})
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });
//returning photo
app.get("/photos/:name", (req, res) => {
  const pd = __dirname;
  res.sendFile(`${pd}/photos/${req.params.name}`);
});
//serving html js
// app.get("/static", (req, res) => {
//   const pd = __dirname;
//   res.sendFile(`${pd}/canteen_front/Front/index.html`);
// });
//handling unlisted api calls
app.use((req, res, next) => {
  const err = new HttpException(
    404,
    "The Route is Invalid/Not Found In Server"
  );
  next(err);
});
//global error handler
app.use((err, req, res, next) => {
  err.success = false;
  err.status = err.status || 500;
  err.message = err.message || "Internal Server Error";
  err.data = err.data || null;
  res.status(err.status).json({
    success: err.success,
    status: err.status,
    message: err.message,
    data: err.data,
  });
});
//opening server to listen on port 9001
server.listen(9001, () => {
  console.log("Server started at localhost:9001");
});
//socket io socket server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
initSocket(io);
