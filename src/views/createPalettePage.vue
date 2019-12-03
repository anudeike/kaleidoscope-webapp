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
                    <v-btn color="primary" @click="e6 = 2">
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
                    <v-textarea label="describe away!" hint="here's a hint: be creative">

                    </v-textarea>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="primary" @click="e6 = 3">
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
            <color-picker @clicked="e6 = 4"></color-picker>
        </v-stepper-content>
    </v-stepper>


</template>

<script>
    import colorPicker from '../components/colorPicker.vue';

    export default {
        name: "createPalettePage",
        components: {
          colorPicker: colorPicker
        },
        data () {
            return {
                e6: "",
                paletteInfo: {
                    title: "",
                    description: ""
                }
            }
        }
    }
</script>

<style scoped>

</style>