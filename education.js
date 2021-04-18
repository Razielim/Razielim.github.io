
//unlocked: can be seen by player, available: can be currently clicked by the player, active: has been clicked by the player and activated
var education_actions = [{id: 0, text: "Do Homework", unlocked: true, active: false, available: true, curTime: 0, maxTime: 500, bpGain: 5, hwGain: -1, spGain: 0, ppGain: 0}, 
                        {id: 1, text: "Go To School", unlocked: false, active: false, available: false, curTime: 0, maxTime: 5000, bpGain: 15, hwGain: 5, spGain: 0, ppGain: 3}, 
                        {id: 2, text: "Take Test", unlocked: false, active: false, available: false, curTime: 0, maxTime: 2500, bpCost: 50, hwGain: 0, spGain: 0, ppGain: 20}, 
                        {id: 3, text: "Pursue Hobby", unlocked: false, active: false, available: true, curTime: 0, maxTime: 1500, bpGain: 0, hwGain: 0, spGain: 10, ppGain: 5}];

var education_resources = [{id: 0, text: "Brain Points", count: 0, total: 0}, 
                        {id: 1, text: "Homework Left", count: 5}, 
                        {id: 2, text: "Spark Points", count: 0}, 
                        {id: 3, text: "Stress", count: 0, required: 100, rate: 2, clickDecrease: 1}];

var education_upgrades = [{id: 0, text: "Ask A Friend", unlocked: false, active: false, available: false, bpCost: 50},
                        {id: 1, text: "Squeaky Teddy", unlocked: false, active: false, available: false, bpCost: 100}];

var education_spark_upgrades = [{id: 0, text: "NYI", unlocked: false, active: false}];


function swap_education_subscreen()
{
    if(game.subscreen == screens.EDUCATION.ACTIONS){
        game.subscreen = screens.EDUCATION.UPGRADES;
    }else{
        if(game.subscreen == screens.EDUCATION.UPGRADES){
            game.subscreen = screens.EDUCATION.ACTIONS;
        }
    }
}


function load_education_screen()
{
    game.topscreen = screens.EDUCATION;
    game.subscreen = screens.EDUCATION.ACTIONS;
}



function update_education()
{
    for(action of education_actions)
    {
        if(action.active)
        {
            action.curTime += (1/tickrate) * 1000 * (1 - (0.66 * (education_resources[3].count/100)));
            if(action.curTime >= action.maxTime)
            {
                handleActionDone(action);
            }
        }
    }
    if(education_resources[3].count < education_resources[3].required)
    {
        education_resources[3].count += education_resources[3].rate/tickrate;
    }

    checkAvailabilitiesAndUnlocks();
}


function checkAvailabilitiesAndUnlocks()
{
    if(!education_actions[0].available && education_resources[1].count > 0){
        education_actions[0].available = true;
    }
    if(education_actions[0].available && education_resources[1].count <= 0){
        education_actions[0].available = false;
    }

    if(!education_actions[1].unlocked && education_resources[1].count <= 2){ //school action unlocked when hw <= 2
        education_actions[1].unlocked = true;
    }
    if(!education_actions[1].available && education_resources[1].count <= 0){ //school action possible when hw <= 0
        education_actions[1].available = true;
    }

    for(upgrade of education_upgrades)
    {
        if(!upgrade.unlocked && education_resources[0].total >= upgrade.bpCost/2){
            upgrade.unlocked = true;
        }
        if(!upgrade.available && upgrade.bpCost <= education_resources[0].count){
            upgrade.available = true;
        }
        if(upgrade.available && upgrade.bpCost > education_resources[0].count){
            upgrade.available = false;
        }
    }
}



function handleActionDone(action)
{
    action.active = false;
    action.curTime = 0;
    switch(action.id)
    {
        case 0:{
            handleHomeworkDone(action);
            break;
        }
        case 1:{
            handleSchoolDone(action);
            break;
        }
        case 2:{
            break;
        }
        case 3:{
            break;
        }
        default:{
            break;
        }
    }
}


function handleHomeworkDone(action) //here, action is the homework action
{
    //space here if special upgrades need to change behaviour
    education_resources[1].count += action.hwGain;
    education_resources[0].count += action.bpGain;
    education_resources[0].total += action.bpGain;

    if(education_resources[1].count < 0){
        education_resources[1].count = 0;
    }
}


function handleSchoolDone(action)
{
    education_resources[0].count += action.bpGain;
    education_resources[0].total += action.bpGain;
    general_resources[0].count += action.ppGain;
    education_resources[1].count += action.hwGain;
    education_actions[1].available = false;
}


function clickedAction(action)
{
    if(!action.available || action.active || !action.unlocked){
        return;
    }
    switch(action.id)
    {
        case 0:{
            activateHomeworkAction(action);
            break;
        }
        case 1:{
            activateSchoolAction(action);
            break;
        }
        case 2:{
            break;
        }
        case 3:{
            break;
        }
        default:{
            break;
        }
    }
}


function clickedStressTeddy()
{
    if(education_resources[3].count >= 1){
        education_resources[3].count -= education_resources[3].clickDecrease;
    }
}


function activateHomeworkAction(action)
{
    if(education_resources[1].count > 0 && !education_actions[1].active){
        action.active = true;
    }
}

function activateSchoolAction(action)
{
    if(education_resources[1].count == 0){
        action.active = true;
    }
}


function clickedUpgrade(upgrade)
{
    if(upgrade.active || !upgrade.unlocked){
        return;
    }
    switch(upgrade.id)
    {
        case 0:{
            activateAskAFriendUpgrade(upgrade);
            break;
        }
        case 1:{
            activateSqueakyTeddyUpgrade(upgrade);
            break;
        }
        case 2:{
            break;
        }
        case 3:{
            break;
        }
        default:{
            break;
        }
    }
}


function activateAskAFriendUpgrade(upgrade)
{
    if(upgrade.bpCost <= education_resources[0].count)
    {
        education_resources[0].count -= upgrade.bpCost;
        upgrade.active = true;

        education_actions[0].hwGain *= 2;
    }
}

function activateSqueakyTeddyUpgrade(upgrade)
{
    if(upgrade.bpCost <= education_resources[0].count)
    {
        education_resources[0].count -= upgrade.bpCost;
        upgrade.active = true;

        education_resources[3].clickDecrease += 1;
    }
}