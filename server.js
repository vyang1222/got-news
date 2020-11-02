import express from "express";
import expressfavicon from "express-favicon";
import path from "path";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(expressfavicon(__dirname + "/build/favicon.ico"));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT);
