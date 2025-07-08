import express from "express"
import {LocalStorage} from 'node-localstorage'
import {addGame} from './gamesCRUD.js'
import bodyParser from 'body-parser'

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({extended : true}))
const localStorage = new LocalStorage('./');




app.get("/games",(req,res)=>{
    const gamesJSON = localStorage.getItem("games");
    let games = null 
    if(gamesJSON != null){
        games = JSON.parse(gamesJSON);
    }else{
        console.log("item games unknow");  
    }
    
    
    res.json(games);    
});


app.get("/games/:id",(req,res)=>{
    const id = req.params.id;
    res.send(`ID reçue : ${id}`);
    
})


app.get("/addgame",(req,res)=>{
    res.send("<form action='/addGame' method='POST'>\
    <label for='name'>Nom :</label>\
    <input type='text' name='name' required><br><br>\
    <label for='price'>Prix :</label>\
    <input type='number' name='price' required><br><br>\
    <label for='desc'>Description :</label>\
    <textarea name='desc' required></textarea><br><br>\
    <button type='submit'>Envoyer</button>\
  </form>");
  
})


app.post("/addgame",(req,res)=>{
    const newGame = req.body;
    console.log(newGame)

    addGame(newGame)
    res.send("Test")
})



app.listen(8000,()=>{
    console.log("serveur lancé sur localhost:8000")
})