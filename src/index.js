//Criar tabela usuário (id,name,email,coursesAlreadyMade,Schedule) X
//Criar tabela dos cursos(id,name,requiredCourse) X
//Autenticar usuário com firebase
//Criar rota pro usuário Enviar a schedule X
//Criar Rota pro usuário finalizar curso
//Criar Rota pro usuário matricular
//Criar Rota de CRUD pros cursos

const express = require("express");
const cors = require("cors");
const authMiddleware = require("./auth-middleware");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/register", authMiddleware);

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Hello World",
  });
});

app.listen(4000, () => {
  console.log("App is listening port 4000");
});
