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
        
        let gamesGetter = []
        if(gamesJSON != null){
            gamesGetter = JSON.parse(gamesJSON);
        }else{
            gamesGetter.push("Aucun jeux disponible") 
        }
        return gamesGetter
}



