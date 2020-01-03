<template>
    <!--This is the create palette stuff using the image upload feature-->
    <v-stepper fill-height v-model="e6" vertical non-linear>

        <!-- Step 1 upload the image-->
        <v-stepper-step step="1">
            Upload your image
        </v-stepper-step>

        <v-stepper-content step="1">
            <v-layout column wrap>
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

                </v-flex>
                <!-- only shows if there is a picture-->
                <v-flex class="pb-3" v-if="paletteInfo.image">
                    <!-- should start generating colors as soon as you continue on -->
                    <v-btn block @click="generateColors">
                        Generate Colors
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-stepper-content>

        <!-- Step 2 -->
        <v-stepper-step editable step="2">
            Describe the Palette
            <small> Be as clear and concise as possible! </small>
        </v-stepper-step>

        <v-stepper-content step="2">
            <v-card>
                <v-card-text>
                    <v-textarea label="describe away!" v-model="paletteInfo.description" hint="here's a hint: be creative">

                    </v-textarea>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="primary" @click="e6 = 3; saveStep()">
                        Continue
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-stepper-content>

        <!-- Step 3 -->
        <v-stepper-step editable step="3">
            Create The Palette!
            <small> Get Creative! </small>
        </v-stepper-step>

        <v-stepper-content step="3">
            <color-picker @clicked="e6 = 4, saveStep()"></color-picker>
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
    import colorPicker from '../components/colorPicker.vue';
    import ImageUpload from '../components/ImageUpload';

    //import firebase from 'firebase';
    export default {
        name: "createPalettePage",
        components: {
          colorPicker: colorPicker,
          ImageUpload: ImageUpload
        },
        data () {
            return {
                e6: "",
                loading: false,
                paletteInfo: {
                    title: "",
                    description: "",
                    author: "",
                    chips: ['all'],
                    UID: "",
                    image: null
                },
                chips: [''],
                items: ['nature', 'regal', 'fashion','amber', 'bold', 'energetic', 'bright'],
            }
        },
        methods: {
            generateColors: function () {

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

                // add the title to the chips
                this.paletteInfo.chips.push(this.paletteInfo.title);
                this.paletteInfo.chips.push(this.paletteInfo.author); // push the author so i can search that way

                // save to the store
                this.$store.commit('changePaletteInfo', this.paletteInfo);

                // set the loading to true
                this.loading = true;

                // store the state as a variable
                var pal = this.$store.state.createdPalette;
                //this.pal = pal;

                // send to firebase
                this.$http.post("https://kaleidoscope-app-92131.firebaseio.com/palettes.json", pal).then(() => {
                    //alert(data);
                    this.loading = false;
                });

                // route to the next page
                this.$router.push('home');


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