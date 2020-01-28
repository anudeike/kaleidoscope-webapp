<template>
    <v-card flat color="grey lighten-3">
        <!-- image at the top -->
        <v-img v-bind:src="p_info.firebaseImageURL">
            <template v-slot:placeholder>
                <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center">
                    <PulseLoader color="#ff00ff"></PulseLoader>
                </v-row>
            </template>
        </v-img>

        <!-- add the colors -->
        <v-card-text >
            <v-layout class="ma-0" row>
                <v-flex
                        v-for="color in p_info.colors.slice(0,5)"
                        :key="color"
                >
                    <v-card flat tile class="d-flex" height="100px" :color="color">
                        <v-card-text>

                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-card-text>

    </v-card>
</template>

<script>
    import PulseLoader from "vue-spinner/src/PulseLoader";

    export default {
        name: "imageResults",
        components: {
          PulseLoader
        },
        props: {
            palette_info: Object
        },
        data () {
            return {
                p_info: this.palette_info, // seems useless might be good reason?
            }
        },
        computed: {
            palettesHead() {
                return 3
            }
        }
    }
</script>

<style scoped>


</style>