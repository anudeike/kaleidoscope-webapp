<template>
    <v-card flat color="grey lighten-3">
        <!--create the modal the appears when you click on it-->
        <v-dialog v-model="showDialog">
            <v-card>
                <v-toolbar :color="p_info.colors[0]" >
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>
                    <v-toolbar-title class="white--text">{{ p_info.title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-container fluid fill-height>
                        <v-layout row wrap>
                            <v-flex md6 xs12>
                                <v-card flat tile class="d-flex">
                                    <v-card-text>
                                        <v-img
                                                :src="p_info.firebaseImageURL"
                                                :lazy-src="p_info.firebaseImageURL"
                                                aspect-ratio="1"
                                                contain
                                        >
                                            <template v-slot:placeholder>
                                                <v-row
                                                        class="fill-height ma-0"
                                                        align="center"
                                                        justify="center"
                                                >
                                                    <PulseLoader></PulseLoader>

                                                </v-row>
                                            </template>

                                        </v-img>
                                    </v-card-text>
                                </v-card>

                            </v-flex>
                            <v-flex md6>
                                <v-row>
                                    <v-col
                                            v-for="c in p_info.colors"
                                            :key="c"
                                            class="d-flex child-flex"
                                            cols="3"
                                    >
                                        <v-card tile class="d-flex" height="100px" :color="c">
                                            <v-card-text>
                                        <span class="white--text">
                                            {{ c }}
                                        </span>
                                            </v-card-text>
                                        </v-card>

                                    </v-col>
                                </v-row>
                            </v-flex>
                            <v-flex>
                                <v-btn block outlined>
                                    Export Palette to CSS
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- image at the top -->
        <v-img v-bind:src="p_info.firebaseImageURL" @click="toggleDialog">
            <v-card-title>
                <span class="font-weight-light white--text textShadow" > {{ p_info.title }}</span>
            </v-card-title>
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
                showDialog: false
            }
        },
        computed: {
            palettesHead() {
                return 3
            }
        },
        methods: {
            toggleDialog: function () {
                this.showDialog = !this.showDialog;
            },
            downloadCSSFile: function () {
                
            }
        }
    }
</script>

<style scoped>
    .textShadow {
        text-shadow: 7px 6px 5px rgba(0,0,0,0.25);
    }


</style>