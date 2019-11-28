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
        ]
    },
    getters: {
        getUser: (state) => {
            return state.user
        }
    },
    mutations: {
        setUser: (state) => {
            // this sets the state
            state.user = firebase.auth().currentUser;
        }
    }

})