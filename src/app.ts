
import express from 'express';
import { AuthRouter } from './routes/routes';
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
const port = 3000;

app.use("/api/v1",AuthRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});