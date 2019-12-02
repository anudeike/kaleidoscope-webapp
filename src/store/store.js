import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

// this is where we define the state of our application
export const store = new Vuex.Store({
    state: {
        exampleItem1: [
            {name: "Ike", price: 20},
            {name: "Jana", price: 25},
            {name: "Jazz", price: 30},
            {name: "Cass", price: 35}
        ],
        user: "New User",
        createdPalette: {
            title: "Example Title",
            description: "i'm mr.description, look at me!",
            swatches: [
                {
                    key: 0,
                    color: "#FF00FF",
                    height: "30vh"
                },
                {
                    key: 1,
                    color: "#A8A8A8",
                    height: "15vh"
                },
                {
                    key: 2,
                    color: "#575757",
                    height: "10vh"
                },
                {
                    key: 3,
                    color: "#141414",
                    height: "10vh"
                }
            ]
        }

    },
    mutations: {
        setUser: (state) => {
            // this sets the state
            state.user = firebase.auth().currentUser.displayName;
        },
        changeSwatches: (state, swatches) => {
            // set the swatches in the store
            state.createdPalette.swatches = swatches
        }
    }

})