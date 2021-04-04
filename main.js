var game;


function newGame()
{
    return {
        screen: "education"
    }
}


function save_game()
{
    localStorage.setItem("plethora_careers", btoa(JSON.stringify(game)));
}


function load_game()
{
    let save = localStorage.getItem("plethora_careers");
    if(save == null || save == undefined){
        game = newGame();
    }
    init_vue(); 
}