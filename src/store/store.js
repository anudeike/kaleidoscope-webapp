import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// this is where we define the state of our application
export const store = new Vuex.Store({
    state: {
        exampleItem1: "exampleOne",
        exampleItem2: "exampleTwo",
        exampleItem3: "exampleThree",
        listOfInts: [1,2,3,4,5,6,7]
    }
})