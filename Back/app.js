import express from "express"
import {LocalStorage} from 'node-localstorage'
import {addGame} from './gamesCRUD.js'

const app = express();
app.use(express.json());
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


app.post("/addGame",(req,res)=>{
    const newGame = req.body;
    addGame(newGame)
    console.log(newGame);  
    res.json(newGame);
    
})




app.listen(8000,()=>{
    console.log("serveur lancé sur localhost:8000")
})