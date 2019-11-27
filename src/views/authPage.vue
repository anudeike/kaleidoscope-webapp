<template>
    <v-container fill-height grid-list-md text-xs-center>
        <v-layout class="pt-6" row wrap align-center>
            <v-flex>

            </v-flex>
            <v-flex>
                <auth></auth>
            </v-flex>
            <v-flex>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import auth from '../components/auth';

    export default {
        name: "authPage",
        components: {
            auth: auth
        }
    }
</script>

<style scoped>

</style>