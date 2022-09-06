const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/user.route");

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

// root api 
app.get("/", (req, res) => {
  res.send("Random user api");
});

app.all("*", (req, res) => {
  res.send("No route found.");
});


app.listen(port, () => {
  console.log(`Random user app listening on port ${port}`);
});