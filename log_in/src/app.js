import cors from "cors";
import express from "./services/express.js";
import productRouter from "./routes/products.js";
import productsService from "./services/entities/Products.js";
import messagesService from "./services/entities/Messages.js";
import io from "./services/io.js";
import { app } from "./services/express.js";
import { __dirname } from "./utils.js.js";
import { databaseMySql, databaseSqlite3 } from "./services/database/db.js";
import session from 'express-session'
import MongoStore from 'connect-mongo'
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(cors());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.static(__dirname + "/public"));

app.use("/api/productos", productRouter);

const products = new productsService(databaseMySql, "products");
const messages = new messagesService(databaseSqlite3, "messages");

io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  const productsArray = await products.getAll();
  const messagesArray = await messages.getAll();
  socket.emit("deliverProducts", productsArray.payload);
  socket.emit("deliverMessages", messagesArray.payload);
  socket.on("message", (data) => {
    messages.save(data).then((result) => {
      io.emit("sendMessage", result.payload);
    });
  });
});


app.use(session({
  store: MongoStore.create({
      mongoUrl: `mongodb+srv://noelia:<password>@cluster0.drbgsha.mongodb.net/?retryWrites=true&w=majority`,
      mongoOptions: advancedOptions
  }),

  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 40000
  }
}))

app.get('/', (req, res) => {
  res.send('Servidor express ok!')
})

let contador = 0
app.get('/sin-session', (req, res) => {
  res.send({ contador: ++contador })
})

app.get('/con-session', (req, res) => {
  if (req.session.contador) {
      req.session.contador++
      res.send(`Ud ha visitado el sitio ${req.session.contador} veces.`)
  } else {
      req.session.contador = 1
      res.send('Bienvenido!')
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
      if (!err) res.send('Logout ok!')
      else res.send({ status: 'Logout ERROR', body: err })
  })
})

app.get('/info', (req, res) => {
  console.log('------------ req.session -------------')
  console.log(req.session)
  console.log('--------------------------------------')

  console.log('----------- req.sessionID ------------')
  console.log(req.sessionID)
  console.log('--------------------------------------')

  console.log('----------- req.cookies ------------')
  console.log(req.cookies)
  console.log('--------------------------------------')

  console.log('---------- req.sessionStore ----------')
  console.log(req.sessionStore)
  console.log('--------------------------------------')

  res.send('Send info ok!')
})