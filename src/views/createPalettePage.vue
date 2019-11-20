<template>
    <color-picker></color-picker>
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

            }
        }
    }
</script>

<style scoped>

</style>