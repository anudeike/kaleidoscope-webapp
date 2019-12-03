<template>
    <v-container fill-height fluid grid-list-md text-xs-center>
        <v-layout class="pt-6" row wrap align-center>
            <v-flex md4 xs12 shrink class="mx-auto">
                <v-layout column>
                    <v-flex class="d-flex justify-center">
                        <v-color-picker
                                canvas-height="300"
                                v-model="color"
                        ></v-color-picker>
                    </v-flex>
                    <v-flex class="justify-center">
                        <v-card flat color="transparent">
                            <v-card-text class="text-center">
                                <span class="display-3">{{ showColor }}</span>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md7 xs12>
                <v-card>
                    <v-card-text>
                        <v-card
                                flat
                                tile
                                class="mx-auto my-2"
                                v-for="p in paletteSwatches"
                                v-bind:key="p.key"
                                :height="p.height"
                                :color="p.color"
                                @click="changeIndex($event, p.key)">
                        </v-card>
                    </v-card-text>
                </v-card>

            </v-flex>
            <v-flex xs12>
                <v-card flat>
                    <v-card-text>
                        <v-btn color="primary" block large @click="savePalette"> Continue </v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "colorPicker",
        data (){
            return {
                types: ['hex'],
                type: 'hex',
                hex: '#FF00FF',
                currIndex: 0,
                paletteSwatches: [
                    {
                        key: 0,
                        color: "#FF00FF",
                        height: "30vh"
                    },
                    {
                        key: 1,
                        color: "#A8A8A8",
                        height: "15vh"
                    },
                    {
                        key: 2,
                        color: "#575757",
                        height: "10vh"
                    },
                    {
                        key: 3,
                        color: "#141414",
                        height: "10vh"
                    }
                ]
            }
        },
        mounted () {
            this.paletteSwatches = this.$store.state.createdPalette.swatches
        },
        computed: {
            color: {
                get () {
                    // returns t
                    //alert(this[this.type]);
                    return this[this.type]
                },
                set(v){
                    // set the value of color in the paletteSwatch
                    this.paletteSwatches[this.currIndex].color = v

                    // sets using the info from the colorpicker
                    this[this.type] = v
                },
            },
            showColor () {
                if(typeof this.color === 'string'){
                    return this.color
                }

                return this.color
            },

        },
        methods: {
            changeIndex: function (event, index) {
                //alert("fired " + index)
                this.currIndex = index
            },
            savePalette: function() {
                // save the palette to the state
                this.$store.commit('changeSwatches', this.paletteSwatches)

                // emit an event to tell the parent it is time to continue
                this.$emit('clicked');
            }
        }
    }
</script>

<style scoped>

</style>