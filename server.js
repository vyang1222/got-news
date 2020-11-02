import express from "express";
import favicon from "express-favicon";
import path from "path";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
app.use(favicon(__dirname + "/build/favicon.ico"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT);
