require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ragRoutes = require("./routes/ragRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/rag", ragRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  require("./services/vectorDBService").initializeWithSampleData();
});
