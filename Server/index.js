const express = require("express");
const app = express();

const userRoutes = require("./routes/Users");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://study-notion-edtech-platform-virid.vercel.app",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and runnning....",
  });
});

app.listen(PORT, () => {
  console.log("App is running at",PORT);
});
