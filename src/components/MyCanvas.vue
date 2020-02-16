<template>
    <!-- this is the canvas component
    creates a canvas element and injects the canvas's rendering context
    into the child compon via a reative provider-->
    <div class="my-canvas-wrapper">
        <canvas ref="my-canvas"></canvas>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "MyCanvas",
        data() {
            return {
                provider : {

                    // Ths is the canvasRenderingContext that the childrent will be drawing to
                    context: null
                }
            }
        },

        // allows a child to inject a provider and hav access
        provide() {
            return {
                provider: this.provider
            }
        },

        mounted () {
            this.provider.context = this.$refs['my-canvas'].getContext('2d');

            this.$refs['my-canvas'].width = this.$refs['my-canvas'].parentElement.clientWidth;
            this.$refs['my-canvas'].height = this.$refs['my-canvas'].parentElement.clientHeight;
        }
    }
</script>

<style scoped>

</style>