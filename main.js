var game;

const curVersion = "0.1";

const screens = {
    EDUCATION: {
        ACTIONS: "actions",
        UPGRADES: "upgrades"
    },
    ADVENTURE: "adventure"
}

const overlays = {
    NONE: "none",
    HELP: "help",
    SHOP: "shop"
}


/**
 * Function that creates a new game object with an empty save file
 * @returns New blank game object
 */
function newGame()
{  
    var education_actions = [{id: 0, text: "action1", unlocked: true}, {id: 1, text: "action2", unlocked: false}];
    return {
        topscreen: screens.EDUCATION,
        subscreen: screens.EDUCATION.ACTIONS,
        version: curVersion,
        overlay: overlays.NONE,
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
 * This function may be extended if variables of the game object change between versions and have to be converted or added
 * @returns Loaded game object
 */
function loadSaveGame(save)
{
    game = newGame();
    version = save.version;
    if(version != curVersion)
    {
        game = save; //update this in the future with additions/conversions if versions change variables
    }else{
        game = save;
    }
    game.version = curVersion;
    console.log(version + " old version");
    console.log(curVersion + " new version");
    return game; 
}



function start_game_context()
{
    //TODO: test for which screen the game should load in on
    load_education_screen();    
}



/**
 * First called function on html body's onload() that creates a game context either from a savefile or from a fresh save
 */
function load_game()
{
    try{
        let save = JSON.parse(atob(localStorage.getItem("plethora_careers")));
        if(save == null || save == undefined){
            game = newGame();
        }else{
            game = newGame(); //For testing: start newGames always
            //game = loadSaveGame(save);  //TODO: currently, a loaded game has a topscreen variable that reads as a construct instead of its actual value
            //console.log(game);
        }
    }catch(tEx)
    {
        //console.log(tEx);
        game = newGame();
    }
    init_vue();  //with the game object created, a Vue environment can be created that uses the game object as its data

    start_game_context();
}



















