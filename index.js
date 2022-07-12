const express = require("express");
const port = 8080;

const router = require("./router");

const app = express();
app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
})

//usar função lista.some() para ver se tem algum elemento dentro da lista que corresponde à comparação