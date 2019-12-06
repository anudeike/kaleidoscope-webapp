<template>
    <v-stepper fill-height v-model="e6" vertical non-linear>

        <!-- Step 1-->
        <v-stepper-step editable step="1">
            Name your Palette
            <small> Make it catchy! </small>
        </v-stepper-step>

        <v-stepper-content step="1">
            <v-card>
                <v-card-text>
                    <v-text-field label="Regular" v-model="paletteInfo.title">

                    </v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="primary" @click="e6 = 2; saveStep()">
                        Continue
                    </v-btn>
                </v-card-actions>
            </v-card>
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
    //import firebase from 'firebase';
    export default {
        name: "createPalettePage",
        components: {
          colorPicker: colorPicker
        },
        data () {
            return {
                e6: "",
                loading: false,
                paletteInfo: {
                    title: "",
                    description: "",
                    author: "",
                    chips: ['all']
                },
                chips: [''],
                items: ['nature', 'regal', 'fashion','amber', 'bold', 'energetic', 'bright'],
                pal: null
            }
        },
        methods: {
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
                // save to the store
                this.$store.commit('changePaletteInfo', this.paletteInfo);

                // set the loading to true
                this.loading = true;

                // store the state as a variable
                var pal = this.$store.state.createdPalette;
                this.pal = pal;

                // send to firebase
                this.$http.post("https://kaleidoscope-app-92131.firebaseio.com/palettes.json", pal).then((data) => {
                    alert(data);
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