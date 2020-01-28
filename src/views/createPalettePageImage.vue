<template>
    <!--This is the create palette stuff using the image upload feature-->
    <v-stepper fill-height v-model="e6" vertical non-linear>

        <v-dialog v-model="connectionRefusedError" max-width="290">
            <v-card>
                <v-card-title class="headline font-weight-light">
                    Shoot, looks like our <br>
                    server isn't responding
                </v-card-title>
                <v-card-text>
                    It'll be back up in a moment. In the meantime, take a look at some palettes.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="connectionRefusedError = false">
                        Exit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="progress" max-width="290">
            <v-card>

                <v-card-text>
                    <v-container bg fill-height grid-list-md text-xs-center>
                        <v-layout column wrap align-center>
                            <v-flex class="text-center">
                                <span class="headline font-weight-light">
                                    One Moment...
                                </span>
                            </v-flex>

                            <v-flex class="text-center mt-4">
                                <RotateLoader :loading="progress"></RotateLoader>
                            </v-flex>
                        </v-layout>
                    </v-container>


                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="posting" max-width="290">
            <v-card>
                <v-card-text>
                    <v-container bg fill-height grid-list-md text-xs-center>
                        <v-layout column wrap align-center>
                            <v-flex class="text-center">
                                <span class="headline font-weight-light">
                                    Posting...
                                </span>
                            </v-flex>

                            <v-flex class="text-center mt-4">
                                <RotateLoader :loading="posting"></RotateLoader>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Step 1 upload the image-->
        <v-stepper-step editable step="1">
            Upload your image
        </v-stepper-step>

        <v-stepper-content step="1">
            <v-layout row wrap>
                <v-flex>
                    <v-layout column v-if="!paletteInfo.image" class="pa-4">
                        <!--center for the newEvent component-->
                        <ImageUpload v-model="paletteInfo.image">
                            <div slot="activator">
                                <v-flex class="text-center">
                                    <v-btn>
                                        Upload Image
                                    </v-btn>
                                </v-flex>
                            </div>
                        </ImageUpload>
                    </v-layout>
                    <!--only shows up if the image is inputted-->
                    <v-layout pt-4 row wrap align-center justify-center v-if="paletteInfo.image">
                        <v-flex>
                            <ImageUpload v-model="paletteInfo.image">
                                <div slot="activator">
                                    <v-card class="elevation-10">
                                        <v-img :src="paletteInfo.image.imageURL" aspect-ratio="1"></v-img>
                                    </v-card>
                                </div>
                            </ImageUpload>
                        </v-flex>
                    </v-layout>

                    <v-layout column class="pa-10" v-if="paletteInfo.image">
                        <v-flex>
                            <span class="subheading font-weight-light">
                                Number of Colors in Palette
                            </span>
                        </v-flex>
                        <v-flex class="pb-3" >
                            <v-slider
                                    v-model="colorAmount"
                                    min="1"
                                    max="50"

                                    hide-details
                            >
                                <template v-slot:append>
                                    <v-text-field
                                            v-model="colorAmount"
                                            class="mt-0 pt-0"
                                            hide-details
                                            single-line
                                            type="number"
                                            style="width: 60px"
                                    ></v-text-field>
                                </template>
                            </v-slider>
                        </v-flex>
                    </v-layout>

                    <v-layout class="px-10" v-if="paletteInfo.image">
                        <v-flex class="pb-3">
                            <!-- should start generating colors as soon as you continue on -->
                            <v-btn block @click="generateColors">
                                Generate Colors
                            </v-btn>
                        </v-flex>
                    </v-layout>

                </v-flex>

            </v-layout>
        </v-stepper-content>

        <!-- Step 2 -->
        <v-stepper-step editable step="2">
            Palette Colors
            <small> View the colors from your palette! </small>
        </v-stepper-step>

        <v-stepper-content step="2">
            <!-- here we will display the picture next to the color palette -->
            <v-container fluid fill-height v-if="paletteInfo.image">
                <v-layout row wrap>
                    <v-flex md6 xs12>
                        <v-card flat tile class="d-flex">
                            <v-card-text>
                                <v-img
                                        :src=paletteInfo.image.imageURL
                                        :lazy-src="paletteInfo.image.imageURL"
                                        aspect-ratio="1"
                                >
                                    <template v-slot:placeholder>
                                        <v-row
                                                class="fill-height ma-0"
                                                align="center"
                                                justify="center"
                                        >
                                            <RotateLoader></RotateLoader>

                                        </v-row>
                                    </template>

                                </v-img>
                            </v-card-text>
                        </v-card>

                    </v-flex>
                    <v-flex md6 v-if="resData">
                        <v-row v-if="resData.body">
                            <v-col
                                    v-for="c in resData.body"
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
                </v-layout>
            </v-container>
            <!-- if there is no paletteInfo -->
            <v-container v-else bg fill-height grid-list-md text-xs-center>
                <v-layout row wrap>
                    <v-flex>
                        <v-card flat>
                            <v-card-text>
                                <v-alert type="error">
                                    Please Upload an Image.
                                </v-alert>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-stepper-content>

        <!--Step 3-->
        <v-stepper-step editable step="3">
            Choose a title
            <small> Title it something cool! </small>
        </v-stepper-step>

        <v-stepper-content step="3">
            <v-layout>
                <v-flex>
                    <v-textarea
                            label="enter title here"
                            v-model="paletteInfo.title"
                            value="My awesome palette">
                    </v-textarea>
                </v-flex>
            </v-layout>
        </v-stepper-content>

        <!-- Step 4 -->
        <v-stepper-step editable step="4">
            Choose some tags
            <small> create a tag with your name! </small>
        </v-stepper-step>

        <v-stepper-content step="4">
            <v-card>
                <v-card-text>
                    <v-combobox
                            v-model="paletteInfo.chips"
                            :items="items"
                            chips
                            clearable
                            label="choose a tag from the list or create your own!"
                            multiple
                            solo
                    >
                        <template v-slot:selection="{ attrs, item, select, selected }">
                            <v-chip
                                    v-bind="attrs"
                                    :input-value="selected"
                                    close
                                    @click="select"
                                    @click:close = "remove(item)">

                                <strong>{{ item }}</strong>&nbsp;
                                <span></span>
                            </v-chip>
                        </template>

                    </v-combobox>
                </v-card-text>

                <v-card-actions>
                    <v-btn block color="primary" @click="submit">
                        Submit Palette
                    </v-btn>

                </v-card-actions>
            </v-card>
        </v-stepper-content>
    </v-stepper>


</template>

<script>
    import ImageUpload from '../components/ImageUpload';
    import RotateLoader from "vue-spinner/src/RotateLoader";
    import firebase from 'firebase';

    //import firebase from 'firebase';
    export default {
        name: "createPalettePage",
        components: {
          RotateLoader,
          ImageUpload: ImageUpload
        },
        data () {
            return {
                e6: "",
                paletteInfo: {
                    author: "",
                    chips: ['all'],
                    UID: "",
                    image: null,
                    firebaseImageURL: null,
                    date: new Date().toISOString().substr(0,10),
                    title: "",
                    colors: null
                },
                resData: null,
                chips: [''],
                items: ['nature', 'regal', 'fashion','amber', 'bold', 'energetic', 'bright'],
                connectionRefusedError: false,
                progress: false,
                colorAmount: 5,
                posting: false
            }
        },
        methods: {
            generateColors: function () {
                // set loading to true
                this.progress = true;

                // append the colorAmount to the formdata
                this.paletteInfo.image.formData.set("colorAmount",this.colorAmount);

                // testing the route to see that it works
                this.$http.post(`http://127.0.0.1:3001/getColorsFromImage/`, this.paletteInfo.image.formData).then((data) => {
                    this.progress = false;
                    this.resData = data;
                    this.paletteInfo.colors = data.body; // set the palette colors at the same time
                    this.e6 = "2"; // move to the next panel

                }).catch((e) => {
                    this.progress = false;
                    if (e.status === 0){
                        this.connectionRefusedError = true;
                    }
                });
            },
            remove (item) {
                // stop any errors
                if(this.chips.length === 0){
                    return
                }
                this.chips.splice(this.chips.indexOf(item), 1);
                this.chips = [...this.chips]
            },
            saveStep: function(){
                // save to the store
                this.$store.commit('changePaletteInfo', this.paletteInfo);

                // save step
                // store the state as a variable
                this.pal = this.$store.state.createdPalette; // for debug purposes
                //this.pal = pal;
            },
            submit: function() {
                // set posting to true
                this.posting = true;

                // add the title to the chips
                this.paletteInfo.chips.push(this.paletteInfo.title);

                // generate a unique id for each palette
                var d = new Date().getTime();

                // get the page load time || zero if not supported
                var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;

                // helps to generate the ID
                this.paletteInfo.UID =  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                    var r = Math.random() * 16
                    if(d > 0 ){
                        r = (d + r) % 16 | 0;
                        d = Math.floor(d/16);
                    } else {
                        r = (d2 + r) % 16 | 0;
                        d2 = Math.floor(d2/16);
                    }

                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });

                // instead of updating the state (no info needs to persist)
                // we just send over the paletteInfo object

                // define storage
                var storage = firebase.storage();
                let file = this.paletteInfo.image.imageFile;
                // create a ref
                storage.ref('/imageForPalette' + file.name).put(file).then(response => {
                    response.ref.getDownloadURL().then((downloadURL) => {
                        this.paletteInfo.firebaseImageURL = downloadURL;
                    }).then(() => {
                        // post the palette information here
                        this.$http.post("https://kaleidoscope-app-92131.firebaseio.com/imagePalettes.json", this.paletteInfo).then(() => {
                            this.posting = false;
                            this.$router.push('home');
                        });
                    })
                })

                // // add the title to the chips
                // this.paletteInfo.chips.push(this.paletteInfo.title);
                // this.paletteInfo.chips.push(this.paletteInfo.author); // push the author so i can search that way
                //
                // // save to the store
                // this.$store.commit('changePaletteInfo', this.paletteInfo);
                //
                // // set the loading to true
                // this.loading = true;

                // // store the state as a variable
                // var pal = this.$store.state.createdPalette;
                // //this.pal = pal;



                // route to the next page



            }
        },
        mounted () {
            // get the author
            this.paletteInfo.author = this.$store.state.createdPalette.author;
        },
        computed: {
            submittable() {
                if(this.chips.length > 5){
                    return false
                }
                return true
            }

        }
    }
</script>

<style scoped>

</style>