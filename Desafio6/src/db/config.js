import mongoose from "mongoose";

const URI = 'mongodb+srv://guidomnavia:w3SJc6cZGZ1ZwwSz@cluster0.fzxtsdv.mongodb.net/?retryWrites=true&w=majority)'

mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.log(err));
