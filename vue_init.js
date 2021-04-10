

function define_education_components()
{
    Vue.component('test_item', {
        props: ['actions'],
        template: '<td v-if="actions.unlocked">{{ actions.text }}</td>'
    });
    Vue.component('education_tabs', {
        props: ['subscreen'],
        template: `<div><div v-if="subscreen == screens.EDUCATION.ACTIONS" class="tab_active">    ACTIONS</div>
                        <div v-if="subscreen == screens.EDUCATION.UPGRADES" class="tab_inactive" v-on:click="swap_education_subscreen()">    ACTIONS</div>
                        <div v-if="subscreen == screens.EDUCATION.ACTIONS" class="tab_inactive" v-on:click="swap_education_subscreen()">    UPGRADES</div>
                        <div v-if="subscreen == screens.EDUCATION.UPGRADES" class="tab_active">    UPGRADES</div></div>`
    });
    Vue.component('stressdisplay', {
        props: ['stress'],
        template: `<div id="stressdisplay"><point_counter_requirement v-bind:item = "stress" class="centered_vertically"></point_counter_requirement></div>`
    });
    Vue.component('education_sidebar', {
        props: ['resources'],
        template: `<div id="education_sidebar" class="right_entries">
            <div id="education_sidebar_pointdisplay">
            <div class="centered_vertically"><img src="assets/iconpack/icon_bp.png" width="30" height="30"><point_counter_standard v-bind:item = "resources[0]" style="padding-left: 10px"></div>
            <div class="centered_vertically"><img src="assets/iconpack/icon_hw.png" width="30" height="30"><point_counter_standard v-bind:item = "resources[1]" style="padding-left: 10px"></div>
            <div class="centered_vertically"><img src="assets/iconpack/icon_sp.png" width="30" height="30"><point_counter_standard v-bind:item = "resources[2]" style="padding-left: 10px"></div></div>
            <div id="education_sidebar_stressdisplay">Stress
            <stressdisplay v-bind:stress = "resources[3]"></stressdisplay></div>
            <div id="stressteddy"></div>
            </div>`
    });
}


function define_adventure_components()
{
    //placeholder
}


function define_misc_components()
{
    Vue.component('point_counter_standard', {
        props: ['item'],
        template: `<div>{{ item.count }}</div>`
    });
    Vue.component('point_counter_requirement', {
        props: ['item'],
        template: `<div>{{ item.count }}/{{ item.required }}</div>`
    });
    Vue.component('top_pane_holder', {
        template: `<div><div class="left_entries"><div>Stage 1: Educate yourself!</div> <div>Clear Reward: First Career Choice</div>
            </div><div class="right_entries"><div class="centered_vertically"><img src="assets/iconpack/icon_pp.png" width="30" height="30" class="left_entries">
            <point_counter_requirement v-bind:item = "game.resources[0][0]"></point_counter_requirement></div></div>`
    });
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
    });
}