<template>
    <v-card
            @click.stop = "showDialog">
        <v-card-text >
            <v-card
                    max-height="300px"
                    flat
                    tile
                    v-for="p in p_info.swatches"
                    v-bind:key="p.key"
                    :color="p.color"
                    :height="p.height"
            >
                <v-card-text>
                    {{ p.color }}
                </v-card-text>
            </v-card>
        </v-card-text>

        <v-card-actions>
            <v-rating v-model="calcCurrentRating">

            </v-rating>
        </v-card-actions>

        <!-- dialog box -->
        <v-dialog
                v-model="open_dialog"
                hide-overlay
                transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="showDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                    <v-toolbar-title>Judge Palette</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- probs will delete this not sure yet-->
                    <v-toolbar-items>
                        <v-btn dark text @click="showDialog">Rate</v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <!-- show the -->
                <!-- card to display the palette-->
                <v-container fluid>
                    <v-layout row >
                        <v-flex class="px-3">
                            <v-card
                                    flat
                                    tile
                                    v-for="k in p_info.swatches"
                                    v-bind:key="k.key"
                                    :color="k.color"
                                    :height="k.height"
                            >
                                <v-card-text> </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card
                                    flat
                                    title
                                    height="65vh">
                                <v-card-title>
                                    {{ palette_info.title }}
                                </v-card-title>

                                <v-card-text>
                                    {{ palette_info.description }}

                                    <div class="mt-3">
                                        <v-chip
                                                v-for="tag in palette_info.tags"
                                                :key="tag.key"
                                                pill
                                                class="mx-2 mt-2"
                                        >
                                            <v-avatar left color="purple lighten-3">
                                                {{ tag.charAt(0) }}
                                            </v-avatar>

                                            {{ tag }}
                                        </v-chip>
                                    </div>

                                    <div class="text-center mt-5">
                                        <span class="display-3"> Rate Me</span>
                                    </div>
                                    <div class="text-center mt-5">
                                        <v-rating v-model="rating" x-large></v-rating>
                                    </div>
                                </v-card-text>

                                <v-card-actions>
                                    <v-btn block @click="reCalcRating">
                                        Submit Rating!
                                    </v-btn>
                                </v-card-actions>

                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
    export default {
        name: "result",
        props: {
            palette_info: Object
        },
        data () {
            return {
                p_info: this.palette_info,
                open_dialog: false,
                currentOpenPalette: null,
                rating: 3,
                rates: 0
            }
        },
        methods: {
            showDialog: function () {
                // set the open dialog to be opposite of itself
                this.open_dialog = !this.open_dialog;
            },
            postRating: function () {
                //this.$emit('rated', this.rating, 1) // emits event parent - add one to rated and add rating to score
            },
            reCalcRating: function () {
                // reCalculate the rating
                this.rating
            }
        },
        computed: {
            calcCurrentRating: function () {
                var totalScore = this.palette_info.score + this.rating;

                if(this.palette_info.num_ratings + this.rates === 0){
                    return 0
                }

                return Math.round(totalScore/(this.palette_info.num_ratings + this.rates));
            }
        }
    }
</script>

<style scoped>

</style>