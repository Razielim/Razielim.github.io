var education_actions = [{id: 0, text: "action1", unlocked: true}, {id: 1, text: "action2", unlocked: false}];
var education_resources = [{id: 0, name: "Brain Points", count: 0}, {id: 1, name: "Homework Left", count: 0}, {id: 2, name: "Spark Points", count: 0}, {id: 3, name: "Stress", count: 0, required: 100}]



function update_education()
{
    //general_resources[0].count += 1;
}


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