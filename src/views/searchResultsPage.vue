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
            <v-flex v-if="isLoading" class="text-center mt-6">
                <v-progress-circular indeterminate color="purple" size="64"></v-progress-circular>
            </v-flex>
            <v-flex class="text-center mt-5" v-if="!checkResultsLength && !isLoading">
                <span class="headline font-weight-light">
                    Sorry! No results found.
                </span>
            </v-flex>
            <v-flex v-if="!isLoading">
                <v-container fluid fill-height>
                    <v-layout row>

                        <v-flex
                                md2
                                lg3
                                sm6
                                xs12
                                class="py-2 px-2"
                                v-for="palette in targetPalettes"
                                :key="palette.key">
                            <!--will replace this will imageResults-->
                            <imageResult v-bind:palette_info="palette"></imageResult>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    //import result from "../components/result";

    import imageResult from "../components/imageResults";

    export default {
        name: "searchResultsPage",
        components: {
            imageResult
        },
        data (){
            return {
                someData: [2,2,2,2,2,2,2,2,2,2,2],
                paletteResults: null,
                keys:[],
                targetPalettes: [],
                query: "",
                isLoading: true,
            }
        },
        mounted() {
            this.query = this.$route.params.query;

            // get the posts from firebase
            this.$http.get('https://kaleidoscope-app-92131.firebaseio.com/imagePalettes.json').then((data) => {
                return data.json(); // returns a promise to use below
            }).then((data) => {
                //this.paletteResults = data;

                // have a lists of alternates
                const TitleQuery = this.query.charAt(0).toUpperCase() + this.query.substring(1);
                const UppercaseQuery = this.query.toUpperCase();

                // filter to get the targeted palettes
                for(let key in data){
                    if(data[key].chips.includes(this.query)){
                        this.targetPalettes.push(data[key]);
                    }

                    if(data[key].chips.includes(TitleQuery)){
                        this.targetPalettes.push(data[key]);
                    }

                    if(data[key].chips.includes(UppercaseQuery)){
                        this.targetPalettes.push(data[key]);
                    }
                }




                this.isLoading = false;
            })
        },
        computed: {
            checkResultsLength: function () {
                if(this.targetPalettes.length === 0){
                    return false
                }
                return true
            }
        }

    }
</script>

<style scoped>

</style>