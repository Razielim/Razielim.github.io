
//unlocked: can be seen by player, available: can be currently clicked by the player, active: has been clicked by the player and activated
var doHomework = {id: 0, text: "Do Homework", unlocked: true, active: false, available: true, automatable: false, curTime: 0, maxTime: 500, bpGain: 5, hwGain: -1, spGain: 0, ppGain: 0, 
                    tooltip: "Can only do homework when you have homework to do."};
var goToSchool = {id: 1, text: "Go To School", unlocked: false, active: false, available: false, automatable: false, curTime: 0, maxTime: 5000, bpGain: 15, hwGain: 5, spGain: 0, ppGain: 3, 
                    tooltip: "Can only go to school when you have no homework left.", count: 0};
var takeTest = {id: 2, text: "Take Test", unlocked: false, active: false, available: false, automatable: false, curTime: 0, maxTime: 2500, bpGain: 50, hwGain: 0, spGain: 0, ppGain: 20, 
                    tooltip: "Can only take test after going to school more.", count: 0};
var pursueHobby = {id: 3, text: "Pursue Hobby", unlocked: false, active: false, available: true, automatable: false, curTime: 0, maxTime: 1500, bpGain: 0, hwGain: 0, spGain: 10, ppGain: 5, 
                    tooltip: ""};
var scienceExperiment = {id: 4, text: "Scientific Experiment", unlocked: false, active: false, available: true, automatable: false, curTime: 0, maxTime: 6000, bpGain: "5-25", hwGain: 0, spGain: 0, ppGain: 0, 
                    tooltip: ""};
var skipSchool = {id: 5, text: "Skip School", unlocked: false, active: false, available: true, automatable: false, curTime: 0, maxTime: 2500, bpGain: 0, hwGain: 5, spGain: 0, ppGain: 0, 
                    tooltip: "Can not skip school with more than 25 homework left."};
var pullAllNighter = {id: 6, text: "Pull an All-Nighter", unlocked: false, active: false, available: true, automatable: false, curTime: 0, maxTime: 1500, bpGain: 0, hwGain: "-100%", spGain: 0, ppGain: 0, 
                    tooltip: "Can not pull an all-nighter at 100 Stress."};
var masterCourse  = {id: 7, text: "Master a Course", unlocked: false, active: false, available: true, automatable: false, curTime: 0, maxTime: 5000, bpGain: 0, hwGain: 0, spGain: 150, ppGain: 0, 
                    tooltip: "Can not master a course until you have taken more tests."};
var repeatYear = {id: 8, text: "Repeat a Year", unlocked: false, active: false, available: true, automatable: false, curTime: 0, maxTime: 10000, bpGain: 200, hwGain: 0, spGain: 0, ppGain: -200, 
                    tooltip: "Can not repeat a year when you have less than 200 progress points"};
var studyAhead = {id: 9, text: "Study Ahead", unlocked: false, active: false, available: true, automatable: false, curTime: 0, maxTime: 3500, bpGain: 50, hwGain: 0, spGain: 0, ppGain: 0, 
                    tooltip: "Can only study ahead when you have no homework left."};
var education_actions = [doHomework, goToSchool, takeTest, pursueHobby, scienceExperiment, skipSchool, pullAllNighter, masterCourse, repeatYear, studyAhead];

var bp = {id: 0, text: "Brain Points", count: 0, total: 0};
var hw = {id: 1, text: "Homework Left", count: 5};
var sp = {id: 2, text: "Spark Points", count: 0};
var stress = {id: 3, text: "Stress", count: 0, required: 100, rate: 2, clickDecrease: 1};
var education_resources = [bp, hw, sp, stress];

var doubletime = {id: 0, text: "Work doubletime", unlocked: false, active: false, available: false, bpCost: 50, tooltip: "Finish 2 homework pieces at once for every Do Homework task."};
var squeakyTeddy = {id: 1, text: "Squeaky Teddy", unlocked: false, active: false, available: false, bpCost: 100, tooltip: "Clicking the Stress Teddy reduces Stress by 1 additional point."};
var askAFriend = {id: 2, text: "Ask a friend", unlocked: false, active: false, available: false, bpCost: 200, tooltip: "Unlocks the ability to Automate the Do Homework task."};
var dailyRoutine = {id: 3, text: "Develop a daily routine", unlocked: false, active: false, available: false, bpCost: 250, tooltip: "Unlocks the ability to Automate the Go To School task."};
var drinkBetterSoda = {id: 4, text: "Drink better soda", unlocked: false, active: false, available: false, bpCost: 350, tooltip: "Halves the rate at which Stress accumulates."};
var getAHobby = {id: 5, text: "Get A Hobby", unlocked: false, active: false, available: false, bpCost: 500, tooltip: "Unlocks the Hobby task, which you have to give a name to first when you get this upgrade."};
var workSmarter = {id: 6, text: "Work smarter", unlocked: false, active: false, available: false, bpCost: 600, tooltip: "Gain the Brain Points of the Do Homework task per homework completed when completing homework through other tasks."};
var education_upgrades = [doubletime, squeakyTeddy, askAFriend, dailyRoutine, drinkBetterSoda, getAHobby, workSmarter];

var NYI = {id: 0, text: "NYI", unlocked: false, active: false};
var education_spark_upgrades = [NYI];


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
    tickMass = (1/tickrate) * 1000 * (1 - (0.66 * (stress.count/100))); //tick speed is 1000 per second, slowed down to 333 with 100 Stress; tickMass is one frame worth of tick speed
    tickMass *= 50; //for debugging and testing
    for(action of education_actions)
    {
        if(action.active)
        {
            action.curTime += tickMass;
            if(action.curTime >= action.maxTime)
            {
                handleActionDone(action);
            }
        }
    }
    if(stress.count < stress.required)
    {
        stress.count += stress.rate/tickrate;
    }

    checkAvailabilitiesAndUnlocks();
}


function checkAvailabilitiesAndUnlocks()
{
    doHomework.available = hw.count > 0 ? true : false;

    if(!goToSchool.unlocked && hw.count <= 2){ //school action unlocked when hw <= 2
        goToSchool.unlocked = true;
    }
    goToSchool.available = hw.count <= 0 ? true : false;

    if(!takeTest.unlocked && bp.total >= 150){ //take test action unlocked at 50+ total bp earned
        takeTest.unlocked = true;
    }
    takeTest.available = goToSchool.count >= 5 ? true : false;

    if(!scienceExperiment.unlocked && general_resources[0].count >= 50){
        scienceExperiment.unlocked = true;
    }

    if(!skipSchool.unlocked && bp.total >= 200){
        skipSchool.unlocked = true;
    }
    skipSchool.available = hw.count <= 25 ? true : false;

    if(!pullAllNighter.unlocked && bp.total >= 300){
        pullAllNighter.unlocked = true;
    }
    pullAllNighter.available = stress.count < 100 ? true : false;

    if(!masterCourse.unlocked && bp.total >= 500){
        masterCourse.unlocked = true;
    }
    masterCourse.available = takeTest.count >= 5 ? true : false;

    if(!repeatYear.unlocked && bp.total >= 800){
        repeatYear.unlocked = true;
    }
    repeatYear.available = general_resources[0].count >= 200 ? true : false;

    if(!studyAhead.unlocked && bp.total >= 1250){
        studyAhead.unlocked = true;
    }
    studyAhead.available = hw.count <= 0 ? true : false;

    for(upgrade of education_upgrades)
    {
        if(!upgrade.unlocked && bp.total >= upgrade.bpCost/2){
            upgrade.unlocked = true;
        }
        if(!upgrade.active && !upgrade.available && upgrade.bpCost <= bp.count){
            upgrade.available = true;
        }
        if(upgrade.available && upgrade.bpCost > bp.count){
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
            handleTestDone(action);
            break;
        }
        case 3:{
            handleHobbyDone(action);
            break;
        }
        case 4:{
            handleExperimentDone(action);
            break;
        }
        case 5:{
            handleSkipDone(action);
            break;
        }
        case 6:{
            handleAllNighterDone(action);
            break;
        }
        case 7:{
            handleMasterCourseDone(action);
            break;
        }
        case 8:{
            handleRepeatDone(action);
            break;
        }
        case 9:{
            handleStudyDone(action);
            break;
        }
        default:{
            break;
        }
    }
}


function handleHomeworkDone(action)
{
    hw.count += action.hwGain;
    bp.count += action.bpGain;
    bp.total += action.bpGain;

    if(hw.count < 0){
        hw.count = 0;
    }
}


function handleSchoolDone(action)
{
    bp.count += action.bpGain;
    bp.total += action.bpGain;
    general_resources[0].count += action.ppGain;
    hw.count += action.hwGain;
    action.count++;
    goToSchool.available = false;
}

                   
function handleTestDone(action)
{
    bp.count += action.bpGain;
    bp.total += action.bpGain;
    general_resources[0].count += action.ppGain;
    takeTest.available = false;
    goToSchool.count = 0;
    action.count++;
}

function handleHobbyDone(action)
{
    hw.count += action.hwGain;
    general_resources[0].count += action.ppGain;
}

function handleExperimentDone(action)
{
    gain = Math.floor(Math.random() * 21) + 5;
    bp.count += gain;
    bp.total += gain;
}

function handleSkipDone(action)
{
    hw.count += action.hwGain;
    goToSchool.available = false;
    stress.count *= 0.5;
}

function handleAllNighterDone(action)
{
    if(workSmarter.active){
        bp.count += hw.count * doHomework.bpGain;
    }
    hw.count = 0;
    stress.count = 100;
}

function handleMasterCourseDone(action)
{
    sp.count += action.spGain;
    takeTest.count = 0;
}

function handleRepeatDone(action)
{
    bp.count += action.bpGain;
    bp.total += action.bpGain;
    general_resources[0].count += action.ppGain;
}

function handleStudyDone(action)
{
    bp.count += action.bpGain;
    bp.total += action.bpGain;
    stress.count += 10;
}




function clickedStressTeddy()
{
    if(stress.count >= 1){
        stress.count -= stress.clickDecrease;
    }
}

function clickedAction(action)
{
    if(!action.available || action.active || !action.unlocked){
        return;
    }else{
        action.active = true;
    }
}


function clickedUpgrade(upgrade)
{
    if(upgrade.active || !upgrade.unlocked || !(upgrade.bpCost <= bp.count)){
        return;
    }else{

        bp.count -= upgrade.bpCost;
        upgrade.active = true;
        upgrade.available = false;

        switch(upgrade.id)
        {
            case 0:{
                activateDoubleTimeUpgrade(upgrade);
                break;
            }
            case 1:{
                activateSqueakyTeddyUpgrade(upgrade);
                break;
            }
            case 2:{
                activateAskAFriendUpgrade(upgrade);
                break;
            }
            case 3:{
                activateDailyRoutineUpgrade(upgrade);
                break;
            }
            case 4:{
                activateDrinkBetterSodaUpgrade(upgrade);
                break;
            }
            case 5:{
                activateGetAHobbyUpgrade(upgrade);
                break;
            }
            case 6:{
                activateWorkSmarterUpgrade(upgrade);
                break;
            }
            default:{
                break;
            }
        }
    }
}


function activateDoubleTimeUpgrade(upgrade)
{
    doHomework.hwGain *= 2;
}

function activateSqueakyTeddyUpgrade(upgrade)
{
    stress.clickDecrease += 1;
}

function activateAskAFriendUpgrade(upgrade)
{
    doHomework.automatable = true;
}

function activateDailyRoutineUpgrade(upgrade)
{
    goToSchool.automatable = true;
}

function activateDrinkBetterSodaUpgrade(upgrade)
{
    stress.rate *= 0.5;
}

function activateGetAHobbyUpgrade(upgrade)
{
    bp.count += upgrade.bpCost;
    //TODO: show hobby naming dialogue; if the user fails to complete this, return so that the bpCost doesnt get deducted
    //pursueHobby.text = inputText;
    bp.count -= upgrade.bpCost;
    pursueHobby.unlocked = true;
    pursueHobby.available = true;
}

function activateWorkSmarterUpgrade(upgrade)
{
    //empty, this gets checked during the completion of other actions
}















