<template>
    <v-card>
        <!-- image at the top -->
        <v-img v-bind:src="p_info.firebaseImageURL">
            <template v-slot:placeholder>
                <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center">
                    <PulseLoader color="#ff00ff"></PulseLoader>
                </v-row>
            </template>
        </v-img>


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
            }
        }
    }
</script>

<style scoped>

</style>