import Vue from 'vue';
import Vuex from 'vuex';
import {fb} from "../firebase";

Vue.use(Vuex);
Vue.config.devtools = true;

// this is where we define the state of our application
export const store = new Vuex.Store({
    state: {
        user: "New User",
        createdPalette: {
            UUID: "",
            title: "Example Title",
            description: "i'm mr.description, look at me!",
            author: "",
            tags: ["all"],
            score: 0, // this is your total rating score
            num_ratings: 0, // number of ratings you got
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
            state.user = fb.auth().currentUser.displayName;
        },
        changeSwatches: (state, swatches) => {
            // set the swatches in the store
            state.createdPalette.swatches = swatches
        },
        changePaletteInfo: (state, paletteInfo) => {
            // update the palette information when a new step is progressed too
            state.createdPalette.title = paletteInfo.title;
            state.createdPalette.description = paletteInfo.description;
            state.createdPalette.tags = paletteInfo.chips;
            state.createdPalette.author = paletteInfo.author; // set the auithor here instead
            state.createdPalette.UUID = paletteInfo.UID; // set the unique ID
        },
        setNewUser: (state, newUser) => {
            // set a new user
            state.user = newUser;

            // set the author
            state.createdPalette.author = newUser;
        },
    },
    getters: {
        // helps get the tags from the state
        getTags: state => {
            return state.createdPalette.tags
        },

        getPalette: state => {
            return state.createdPalette
        }
    }

})