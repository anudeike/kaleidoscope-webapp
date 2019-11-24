<template>
    <v-card class="mx-auto">
        <v-card-title>Sign Up for Kaleidoscope</v-card-title>
        <!-- The Login Form-->
        <v-form v-model="valid">
            <v-container text-center>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field
                                v-model="email"
                                :rules="namesRules"
                                :counter="10"
                                label="Email"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field
                                v-model="username"
                                :rules="namesRules"
                                :counter="10"
                                label="Enter a unique username"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field
                                v-model="password"
                                :rules="namesRules"
                                :counter="10"
                                label="Enter a password"
                        ></v-text-field>
                    </v-col>

                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
    export default {
        name: "auth",
        data () {
            return {
                email: "",
                username: "",
                password: ""
            }
        }
    }
</script>

<style scoped>

</style>