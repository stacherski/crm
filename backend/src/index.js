require("dotenv").config();

const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const apiKey = require("./middleware/apiKey");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.json");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err));

const app = express();

// Compression middleware
app.use(compression());

app.use("/api", apiKey);

const options = {
  setHeaders(res, path, stat) {
    res.set("x-api-key", process.env.API_KEY);
  },
};

app.use(express.static("public", options));

app.use(express.json());

//Swagger API
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  }),
);

//company routes API
const companyRoutes = require("./routes/companyRoutes");
app.use("/api/company", companyRoutes);

//user routes API
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send({ message: "CRM API running" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
