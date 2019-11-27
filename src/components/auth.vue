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
                <v-container key="2" text-center v-else>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                    v-model="username"
                                    :counter="15"
                                    :rules="usernameRules"
                                    label="Enter a unique username"
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
                                    @click="submit">

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
                alert(this.username + " " + this.email + " " + this.password);
            },
            login: function () {
                // log into firebase
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