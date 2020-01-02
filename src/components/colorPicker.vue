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
                                height="50px"
                                :color="p.color"
                                @click="changeIndex($event, p.key)">
                        </v-card>
                    </v-card-text>
                </v-card>

            </v-flex>

            <!-- Suggested Colors-->
            <!--<v-flex xs12>-->

                <!--<v-card>-->
                    <!--<v-card-text>-->
                        <!--<v-layout wrap class="text-center">-->
                            <!--<v-flex v-for="s in suggestions" v-bind:key="s.index">-->
                                <!--<v-card v-bind:color="s">-->
                                    <!--<v-card-text>-->
                                        <!--{{ s }}-->
                                    <!--</v-card-text>-->
                                <!--</v-card>-->
                            <!--</v-flex>-->
                        <!--</v-layout>-->
                    <!--</v-card-text>-->

                <!--</v-card>-->
            <!--</v-flex>-->
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
                    },
                    {
                        key: 1,
                        color: "#A8A8A8",
                    },
                    {
                        key: 2,
                        color: "#575757",
                    },
                    {
                        key: 3,
                        color: "#0076dc",
                    },
                    {
                        key: 4,
                        color: "#834731",
                    },
                    {
                        key: 5,
                        color: "#4d9a7f",
                    },
                    {
                        key: 6,
                        color: "#f8ec4f",
                    }
                ],

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
            suggestions () {
                // this is going to calculate the suggestions for each color choose

                /* Going to do
                * Complementary
                * Split Complementary
                * Triadic
                * Tetradic
                * */
                var result = []
                // complementary
                this.paletteSwatches.forEach((swatch) => {
                    let r = 0, g = 0, b = 0;
                    let hex = swatch.color;

                    if(hex.length === 4){
                        r = "0x" + hex[1] + hex[1];
                        g = "0x" + hex[2] + hex[2];
                        b = "0x" + hex[3] + hex[3];
                    } else if (hex.length === 7) {
                        r = "0x" + hex[1] + hex[2];
                        g = "0x" + hex[3] + hex[4];
                        b = "0x" + hex[5] + hex[6];
                    }

                    // then to HSL
                    r /= 255;
                    g /= 255;
                    b /= 255;

                    let cmin = Math.min(r, g, b),
                        cmax = Math.max(r, g, b),
                        delta = cmax - cmin,
                        h = 0,
                        s = 0,
                        l = 0;

                    if (delta === 0)
                        h = 0;
                    else if (cmax === r)
                        h = ((g - b) / delta) % 6;
                    else if (cmax === g)
                        h = (b - r) / delta + 2;
                    else
                        h = (r - g) / delta + 4;

                    h = Math.round(h * 60); // hue

                    if (h < 0)
                        h += 360;

                    // create complementary colors
                    h = Math.abs((h + 180) - 360);

                    l = (cmax + cmin) / 2;
                    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
                    s = +(s * 100).toFixed(0);
                    l = +(l * 100).toFixed(0);

                    result.push("hsl(" + h + "," + s + "%," + l + "%)");

                    // split complementary (change hues)
                    let h1 = Math.abs((h + 150) - 360);
                    let h2 = Math.abs((h + 210) - 360);

                    result.push("hsl(" + h1 + "," + s + "%," + l + "%)");
                    result.push("hsl(" + h2 + "," + s + "%," + l + "%)");


                });

                return result
            }

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
            },

        }
    }
</script>

<style scoped>

</style>