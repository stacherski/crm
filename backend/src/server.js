require("dotenv").config();

const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
// const apiKey = require("./middleware/apiKey");
const authToken = require("./middleware/authToken");

const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.json");

const cors = require("cors");
const jwt = require("jsonwebtoken");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err));

const app = express();

// Compression middleware
app.use(compression());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
// app.use("/api", apiKey);
app.use("/api", authToken);

const options = {
  // setHeaders(res, path, stat) {
  //   res.set("x-api-key", process.env.API_KEY);
  // },
};

app.use(express.static("public", options));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//Swagger API
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
      withCredentials: true,
    },
  }),
);

//company routes API
const companyRoutes = require("./routes/companyRoutes");
app.use("/api/company", companyRoutes);

//user routes API
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

//role routes API
const roleRoutes = require("./routes/roleRoutes");
app.use("/api/role", roleRoutes);

//auth login routes API
const loginRoutes = require("./routes/loginRoutes");
app.use("/auth/login", loginRoutes);

const meRoutes = require("./routes/meRoutes");
app.use("/auth/me", meRoutes);

const logoutRoutes = require("./routes/logoutRoutes");
app.use("/auth/logout", logoutRoutes);

// const refreshRoutes = require("./routes/refreshRoutes");
// app.use("/auth/refresh", refreshRoutes);

app.get("/", (req, res) => {
  res.send({ message: "CRM API running" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
