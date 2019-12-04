<template>
    <v-card>
        <v-card-text>
            <v-card
                    max-height="300px"
                    flat
                    tile
                    v-for="p in p_info.swatches"
                    v-bind:key="p.key"
                    :color="p.color"
                    :height="p.height"
            >
                {{ p }}
            </v-card>
        </v-card-text>
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
                p_info: this.palette_info
            }

        }
    }
</script>

<style scoped>

</style>