//déclaration des variables
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const todoRoutes = express.Router();
const PORT = 4000;
let Todo = require("./model/todo");
const todo = require("./model/todo");

app.use(cors());
app.use(bodyParser.json());
//configuration des routes
app.use("/todos", todoRoutes);
todoRoutes.route("/").get(function (req, res) {
  todo.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});
todoRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Todo.findById(id, function (err, todo) {
    res.json(todo);
  });
});

todoRoutes.route("/add").post(function (req, res) {
  let todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json({ todo: "Enregistrer avec succès" });
    })
    .catch((err) => {
      res.status(400).send("Echèc de validation");
    });
});
todoRoutes.route("/update/:id").patch(function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (!todo) {
      res.status(404).send("Valeur nous trouvée");
    } else {
      todo.todo_description = req.body.todo_description;
      todo.todo_responsable = req.body.todo_responsable;
      todo.todo_priorite = req.body.todo_priorite;
      todo.todo_completed = req.body.todo_completed;

      todo
        .save()
        .then((todo) => {
          res.json("Mise à jour réussie");
        })
        .catch((err) => {
          res.status(400).send("Mise à jour impossible");
        });
    }
  });
});

//démarrage du serveur
app.listen(PORT, function () {
  console.log("Le serveur a démarré sur le port:" + PORT);
});
//connexion à la base de données
mongoose.connect("mongodb://localhost:27017/todos", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("Connexion à la base de données effectuée avec succès !");
});
