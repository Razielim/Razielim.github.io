var game;

const screens = {
    EDUCATION: {
        ACTIONS: "actions",
        UPGRADES: "upgrades"
    },
    ADVENTURE: "adventure"
}


/**
 * Function that creates a new game object with an empty save file
 * @returns New blank game object
 */
function newGame()
{  
    var education_actions = [{id: 0, text: "action1", unlocked: true}, {id: 1, text: "action2", unlocked: false}]; //TODO: make screens, subscreens, and education_actions into enums
    return {
        topscreen: screens.EDUCATION,
        subscreen: screens.EDUCATION.ACTIONS,
        education_actions
    }
}

/**
 * Saves a game onto a save file
 */
function save_game()
{
    localStorage.setItem("plethora_careers", btoa(JSON.stringify(game)));
}

/**
 * Loads a saved game from a given save and return the loaded game object
 * @returns Loaded game object
 */
function loadSaveGame(save)
{
    game = newGame(); //TODO: actually load a game here from the save
    return game; 
}

/**
 * First called function on html body's onload() that creates a game context either from a savefile or from a fresh save
 */
function load_game()
{
    let save = localStorage.getItem("plethora_careers");
    if(save == null || save == undefined){
        game = newGame();
    }else{
        game = loadSaveGame(save); 
    }
    init_vue();  //with the game object created through newGame(), a Vue environment can be created that uses the game object as its data
}



















