import express from "express"
import {LocalStorage} from 'node-localstorage'
import {addGame} from './gamesCRUD.js'
import {getGame } from "./gamesCRUD.js"
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
    let html = `
  <h1>Liste des jeux</h1>
  <ul>
`;

for (const game of games) {
  html += `
    <li>
      <a href="/games/${game.name}"> <strong>${game.name}</strong> </a> – ${game.price}€
      <br>
      <em>${game.desc}</em>
    </li>
    <hr>
  `;
}

html += `</ul>
<a href="/addGame">Ajouter un jeu</a>
<a href="/delGame">Supprimer un jeu</a>
`;

res.send(html);    
});


app.get("/games/:name",(req,res)=>{
    const name = req.params.name
    const list = getGame()
    let html = "<p>aucune produit</p>"
    list.forEach((val,index)=>{

        if (val.name === name) {
   html = `
    <h1>${val.name}</h1>
    <p><strong>Prix :</strong> ${val.price}€</p>
    <p><strong>Description :</strong><br>${val.desc}</p>
    <hr>

    <button onclick="toggleForm()">🛠 Modifier ce jeu</button>

    <div id="editForm" style="display:none; margin-top:20px;">
      <h2>Modification</h2>
      <form action="/editgame" method="POST">
        <input type="hidden" name="oldName" value="${val.name}">
        <label>Nom :</label>
        <input type="text" name="name" value="${val.name}" required><br><br>
        <label>Prix :</label>
        <input type="number" name="price" value="${val.price}" required><br><br>
        <label>Description :</label><br>
        <textarea name="desc" required>${val.desc}</textarea><br><br>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>

    <script>
      function toggleForm() {
        const form = document.getElementById('editForm');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
      }
    </script>

    <br>
    <a href="/games">← Retour à la liste</a>
  `;
}
})
res.send(html);
})

app.post("/editgame", (req, res) => {
  const { oldName, name, price, desc } = req.body;

  let games = JSON.parse(localStorage.getItem("games") || "[]");

  games = games.map(game => {
    if (game.name === oldName) {
      return {
        name, 
        price: parseFloat(price),
        desc
      };
    }
    return game;
  });

  localStorage.setItem("games", JSON.stringify(games));

  res.redirect("/games");
});


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
    res.redirect("/games" )
})

app.get("/delgame", (req, res) => {
  const gamesJSON = localStorage.getItem("games");
  let games = [];
  if (gamesJSON) {
    games = JSON.parse(gamesJSON);
  }

  let html = `<h1>Supprimer un jeu</h1><ul>`;

  for (const game of games) {
    html += `
      <li>
        ${game.name} – ${game.price}€
        <form action="/delgame" method="POST" style="display:inline">
          <input type="hidden" name="name" value="${game.name}">
          <button type="submit">Supprimer</button>
        </form>
      </li>
      <hr>
    `;
  }

  html += `</ul>
  <a href="/games">← Retour à la liste</a>
  `;

  res.send(html);
});

app.post("/delgame", (req, res) => {
  const name = req.body.name;
  let games = [];

  const gamesJSON = localStorage.getItem("games");
  if (gamesJSON) {
    games = JSON.parse(gamesJSON);
  }

  games = games.filter(game => game.name !== name);
  localStorage.setItem("games", JSON.stringify(games));

  res.redirect("/delgame");
});





app.listen(8000,()=>{
    console.log("serveur lancé sur localhost:8000")
})