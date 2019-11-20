<template>
    <v-container grid-list-md text-xs-center>
        <v-layout class="pt-6" row wrap align-center>
            <v-flex>
                <v-layout column>
                    <v-flex class="d-flex justify-center">
                        <v-color-picker
                                canvas-height="300"
                                v-model="color"
                        ></v-color-picker>
                    </v-flex>
                    <v-flex class="justify-center">
                        <v-card>
                            <v-card-text>
                                <pre> {{ showColor }}</pre>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex>
                <v-card class="mx-auto">
                    <v-card-text>
                        <div> Word of the Day</div>
                        <p class="display-1 text--primary">
                            be•nev•o•lent
                        </p>
                        <p>adjective</p>
                        <div class="text--primary">
                            well meaning and kindly.<br>
                            "a benevolent smile"
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    export default {
        name: "createPalettePage",
        data (){
            return {
                types: ['hex', 'hexa', 'rgba', 'hsla', 'hsva'],
                type: 'hex',
                hex: '#FF00FF',
                hexa: '#FF00FFFF',
                rgba: { r: 255, g: 0, b: 255, a: 1 },
                hsla: { h: 300, s: 1, l: 0.5, a: 1 },
                hsva: { h: 300, s: 1, v: 1, a: 1 }
            }
        },
        computed: {
            color: {
              get () {
                  return this[this.type]
              },
              set(v){
                  this[this.type] = v
              },
            },
            showColor () {
                if(typeof this.color === 'string'){
                    return this.color
                }

                return JSON.stringify(Object.keys(this.color).reduce((color, key) => {
                    color[key] = Number(this.color[key].toFixed(2))
                    return color
                }, {}), null, 2)
            }
        }
    }
</script>

<style scoped>

</style>