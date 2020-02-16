<template>
    <v-card flat color="grey lighten-3">
        <!--create the modal the appears when you click on it-->
        <v-dialog v-model="showDialog">
            <v-card>
                <v-toolbar :color="p_info.colors[0]" >
                    <v-app-bar-nav-icon disabled></v-app-bar-nav-icon>
                    <v-toolbar-title class="white--text">{{ p_info.title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon disabled>
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                    <v-btn icon disabled>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon disabled>
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
                            <v-flex md6 xs12>
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
                                <v-flex>
                                    <v-layout wrap>
                                        <v-flex class="pa-3" md6 xs12>
                                            <v-btn @click="createAndDownload" block outlined>
                                                Export Palette to CSS
                                            </v-btn>
                                        </v-flex>
                                        <v-flex class="pa-3" md6 xs12>
                                            <v-btn @click="downloadImageFromCanvas" block outlined>
                                                Export Palette to PNG
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>

                                </v-flex>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- second dialog to preview the file -->
        <v-dialog v-model="showDialog2" max-width="550px">
            <v-card>
                <!-- toolbar to indicate the preview-->
                <v-toolbar :color="p_info.colors[1]" >
                    <v-toolbar-title class="white--text"> Preview </v-toolbar-title>
                </v-toolbar>
                <v-card-text class="text-center pt-4">
                    <!-- create the canvas --->
                    <MyCanvas @loaded="canvasLoaded = !canvasLoaded" ref="main_canvas" style="width: 500px; height: 500px; background-color: whitesmoke;">
                        <Box v-for="(c, index) in p_info.colors" :key="c" :index="index" :x1="100 * index" :y1="100" :color="c"></Box>
                    </MyCanvas>
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
    import FileSaver from 'file-saver';
    import MyCanvas from '../components/MyCanvas';
    import Box from '../components/Box';

    export default {
        name: "imageResults",
        components: {
          PulseLoader,
          MyCanvas,
          Box
        },
        props: {
            palette_info: Object
        },
        data () {
            return {
                p_info: this.palette_info, // seems useless might be good reason?
                showDialog: false,
                showDialog2: false,
                canvasLoaded: false
            }
        },
        methods: {
            toggleDialog: function () {
                this.showDialog = !this.showDialog;
            },
            createAndDownload: async function () {
                var outputString = ":root {";

                for(var i = 0; i < this.p_info.colors.length; i++){
                    outputString += `\n\tvar(color-${i}, ` +  this.p_info.colors[i] + ');';
                }

                outputString += "\n}";


                var file = new File([outputString], `${this.p_info.title}.css`, {type: "text/css;charset=utf-8"});
                FileSaver.saveAs(file);
            },
            downloadImageFromCanvas: function () {
                this.showDialog2 = true;
                setTimeout(() => {

                    this.$refs.main_canvas.downloadCanvas();

                }, 100)
            }
        },

    }
</script>

<style scoped>
    .textShadow {
        text-shadow: 7px 6px 5px rgba(0,0,0,0.25);
    }


</style>