<template>
    <v-card>
        <v-img v-bind:src="p_info.firebaseImageURL">

        </v-img>
    </v-card>
</template>

<script>
    export default {
        name: "imageResults",
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