<template>
    <v-card class="mx-auto">
        <v-card-title primary-title class="justify-center" v-if="isSignUp">Sign Up for Kaleidoscope</v-card-title>
        <v-card-title primary-title class="justify-center" v-else>Log Into Kaleidoscope</v-card-title>


        <v-form v-model="valid">
            <transition name="fade" mode="out-in">
                <!-- The Sign Up Form -->
                <v-container key="1" text-center v-if="isSignUp">
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="Email"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field
                                    v-model="username"
                                    :counter="15"
                                    label="Enter a unique username"
                                    :rules="usernameRules"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field
                                    v-model="password"
                                    :counter="15"
                                    :rules="passwordRules"
                                    label="Enter a password"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn
                                    :disabled="!valid"
                                    color="success"
                                    class=""
                                    block
                                    @click="signUp">

                                Submit
                            </v-btn>
                        </v-col>
                        <v-col>
                            <!-- on click change isSignUp to false -->
                            <v-btn block @click="isSignUp = false">
                                Login
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>

                <!-- Login Form -->
                <v-container key="2" text-center v-else >
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="Enter your email"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field
                                    v-model="password"
                                    :counter="15"
                                    label="Enter a password"
                                    :rules="passwordRules"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn
                                    :disabled="!valid"
                                    color="success"
                                    class=""
                                    block
                                    @click="login">

                                Submit
                            </v-btn>
                        </v-col>

                        <v-col>
                            <!-- on click change isSignUp to false -->
                            <v-btn block @click="isSignUp = true">
                                Sign Up
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </transition>
        </v-form>
    </v-card>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: "auth",
        data () {
            return {
                isSignUp: true,
                email: "",
                username: "",
                password: "",
                valid: true,
                emailRules: [
                    v => !!v || 'Email is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                ],
                usernameRules: [
                    v => !!v || 'Username is required'
                ],
                passwordRules: [
                    v => !!v || 'Password is required'
                ],
                submitted: false
            }
        },
        methods: {
            signUp: function () {
                let self = this;
                //add user in firebase
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((authUser) => {
                    //alert("Account has been created. " + authUser)

                    // set the current user in the store
                    this.$store.commit('setNewUser', self.username); // commit("name of the function")

                    // create the username and add it to the profile
                    authUser.user.updateProfile({
                        displayName: self.username,
                    }).then(() => {
                        // profile updated successfully

                        // go to the home route
                        this.$router.push('home');
                    }, (err) => {
                        // error happened
                        alert("error happened trying to insert username: " + err.message)
                    })
                }, (err) => {
                    alert("error: " + err.message)

                });
            },
            login: function () {
                // log into firebase

                //set a loading variable to enable loading
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((authUser) => {
                    //alert("Nice, " + authUser.user.displayName + " is authenticated");

                    // set the current user in the store
                    this.$store.commit('setNewUser', authUser.user.displayName); // commit("name of the function")

                    //go to home route
                    this.$router.push('home');
                }, (err) => {
                    alert("Error: " + err.message)
                })

            }
        },

    }
</script>

<style scoped>

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>