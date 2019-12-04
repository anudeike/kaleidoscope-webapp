<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
                <v-card flat>
                    <v-card-text>
                        <span class="display-3 font-weight-thin">
                            Search Term: <span class="font-weight-light">{{ $route.params.query }}</span>
                        </span>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex>
                <v-container fill-height>
                    <v-layout row>
                        <v-flex md2 v-for="s in someData" :key="s">
                            <v-card>
                                <v-card-text>
                                    {{ s }} something
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    //import result from "../components/result";

    export default {
        name: "searchResultsPage",
        components: {

        },
        data (){
            return {
                someData: [2,2,2,2,2,2,2,2,2,2,2],
                paletteResults: null,
                keys:[],
                targetPalettes: [],
                query: ""
            }
        },
        mounted() {
            this.query = this.$route.params.query;

            // get the posts from firebase
            this.$http.get('https://kaleidoscope-app-92131.firebaseio.com/palettes.json').then((data) => {
                return data.json(); // returns a promise to use below
            }).then((data) => {
                this.paletteResults = data;

                // append the keys - get the targeted palettes
                for (let key in data){
                    if(data[key].tags.includes(this.query)){
                        this.targetPalettes.push(data[key]);
                    }
                }
            })

        }

    }
</script>

<style scoped>

</style>