import {LocalStorage} from 'node-localstorage'

const localStorage = new LocalStorage('./');

export function addGame (newGame){
    let gamesJSON = localStorage.getItem("games");
    if(gamesJSON == null){
         localStorage.setItem("games",JSON.stringify([]))
         gamesJSON = localStorage.getItem("games");
        }
        
        const games = JSON.parse(gamesJSON);
    games.push(newGame);

    localStorage.setItem("games",JSON.stringify(games));

    return;
}

export function getGame(){
        const gamesJSON = localStorage.getItem("games");
        
        let GamesGetter = null 
        if(gamesJSON != null){
            GamesGetter = JSON.parse(gamesJSON);
        }else{
            console.log("item games unknow");  
        }
}

