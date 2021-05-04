

function define_education_components()
{
    Vue.component('education_tabs', {
        props: ['subscreen'],
        template: `<div><div v-if="subscreen == screens.EDUCATION.ACTIONS" class="tab_active">    ACTIONS</div>
                        <div v-if="subscreen == screens.EDUCATION.UPGRADES" class="tab_inactive" v-on:click="swap_education_subscreen()">    ACTIONS</div>
                        <div v-if="subscreen == screens.EDUCATION.ACTIONS" class="tab_inactive" v-on:click="swap_education_subscreen()">    UPGRADES</div>
                        <div v-if="subscreen == screens.EDUCATION.UPGRADES" class="tab_active">    UPGRADES</div></div>`
    });
    Vue.component('stressdisplay', {
        props: ['stress'],
        template: `<div id="stressdisplay" class="tooltippable"> 
                        <span class="tooltiptext">The higher your Stress, the slower your actions finish! Click the Teddy to reduce Stress!</span>
                    <div style="grid-column: 1;grid-row: 1;margin-top: 2px;">
                        <img src="assets/Education/stressFill.png" v-bind:style="{width: (stress.count/stress.required)*164 + 'px', height: 23 + 'px'}"></div>
                    <point_counter_requirement style="grid-column: 1;grid-row: 1;" v-bind:item = "stress" class="centered_vertically"></point_counter_requirement></div>`
    });
    Vue.component('education_sidebar', {
        props: ['resources'],
        template: `<div id="education_sidebar" class="right_entries">
            <div id="education_sidebar_pointdisplay">
            <div class="centered_vertically tooltippable">
                <span class="tooltiptext" style="width: 120px;">Brain Points</span>    
                <img src="assets/iconpack/icon_bp.png" width="30" height="30"><point_counter_standard v-bind:item = "resources[0]" style="padding-left: 10px"></div>
            <div class="centered_vertically tooltippable">
                <span class="tooltiptext" style="width: 150px;">Homework Left</span>
                <img src="assets/iconpack/icon_hw.png" width="30" height="30"><point_counter_standard v-bind:item = "resources[1]" style="padding-left: 10px"></div>
            <div class="centered_vertically tooltippable">
                <span class="tooltiptext" style="width: 120px;">Spark Points</span>
                <img src="assets/iconpack/icon_sp.png" width="30" height="30"><point_counter_standard v-bind:item = "resources[2]" style="padding-left: 10px"></div></div>
            <div id="education_sidebar_stressdisplay">Stress
            <stressdisplay v-bind:stress = "resources[3]"></stressdisplay></div>
            <div id="stressteddy" v-on:click="clickedStressTeddy()"></div>
            </div>`
    });
    Vue.component('education_action_points', {
        props: ['action'],
        template: `<div><div class="centered_vertically" style="margin-right: 5px;" v-if="action.bpGain != 0"><img src="assets/iconpack/icon_bp.png" width="24" height="24">  {{action.bpGain}} </div>
            <div class="centered_vertically" style="margin-right: 5px;" v-if="action.hwGain != 0"><img src="assets/iconpack/icon_hw.png" width="24" height="24">  {{action.hwGain}} </div>
            <div class="centered_vertically" style="margin-right: 5px;" v-if="action.spGain != 0"><img src="assets/iconpack/icon_sp.png" width="24" height="24">  {{action.spGain}} </div>
            <div class="centered_vertically" style="margin-right: 5px;" v-if="action.ppGain != 0"><img src="assets/iconpack/icon_pp.png" width="24" height="24">  {{action.ppGain}} </div>
            </div>`
    });
    Vue.component('education_action', {
        props: ['action', 'resources'],
        template: `<div v-on:click="clickedAction(action)" v-bind:class="{education_action: true, unavailable:action.available?false:true, tooltippable: !action.available?true:false}">
                <span v-if="!action.available" class="tooltiptext">{{action.tooltip}}</span> 
            <div class="education_action_name">{{ action.text }}</div>
            <div class="education_action_timeleft_bar"><div style="grid-column: 1;grid-row: 1;"><img src="assets/Education/stressFill.png" v-bind:style="{width: (action.curTime/action.maxTime)*225 + 'px', height: 24 + 'px'}"></div>
            <div style="grid-column: 1;grid-row: 1;">{{ Math.round(action.curTime) }}/{{ action.maxTime }}</div></div>
            <education_action_points class="education_action_pointsdisplay" v-bind:action="action"></education_action_points>
            <div class="education_action_automationsection">Automate</div>
        </div>`
    });
    Vue.component('education_upgrade', {
        props: ['upgrade', 'resources'],
        template: `<div v-on:click="clickedUpgrade(upgrade)" v-bind:class="{education_upgrade: true, unavailable:upgrade.available?false:true}"> 
            <div class="education_upgrade_name">{{ upgrade.text }}</div>
            <div class="centered_vertically" style="margin-right: 5px;"><img src="assets/iconpack/icon_bp.png" width="28" height="28">  {{upgrade.bpCost}} </div>
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
        template: `<div>{{  Math.round(item.count) }}</div>`
    });
    Vue.component('point_counter_requirement', {
        props: ['item'],
        template: `<div>{{  Math.round(item.count) }}/{{  Math.round(item.required) }}</div>`
    });
    Vue.component('top_pane_holder', {
        template: `<div><div class="left_entries"><div>Stage 1: Educate yourself!</div> <div>Clear Reward: First Career Choice</div>
            </div><div class="right_entries centered_vertically tooltippable">
                <span class="tooltiptext" style="width: 120px;">Progress Points</span>
            <img src="assets/iconpack/icon_pp.png" width="30" height="30" class="left_entries">
            <point_counter_requirement v-bind:item = "game.resources[0][0]"></point_counter_requirement></div>`
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