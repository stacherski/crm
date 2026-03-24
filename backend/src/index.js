require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpec = require('./swagger.json');
const fs = require('fs');

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err));

const app = express();

app.use(express.json());

//Swagger API

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//company routes API
const companyRoutes = require("./routes/companyRoutes");
app.use("/api/companies", companyRoutes);

//user routes API
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send({ message: "CRM API running" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
