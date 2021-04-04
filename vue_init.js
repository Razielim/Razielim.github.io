

function define_education_components()
{
    Vue.component('test_item', {
        props: ['actions'],
        template: '<td v-if="actions.unlocked">{{ actions.text }}</td>'
    })
}


function define_adventure_components()
{

}


function define_misc_components()
{

}




function define_Vue_components()
{
    define_education_components();
    define_adventure_components();
    //etc.
    define_misc_components();
}


function init_vue()  //this function is called as part of an onload() function (load_game()) for the html body
{
    define_Vue_components(); //calls definitions for special Vue components to be used in the html to be made

    var app = new Vue({ //create a new Vue environment
        el:"#app",  //on this div
        data:{  //with these variables we will use within this div as Vue variables
            game  //base object that will hold game variables and context
        },
    })
}