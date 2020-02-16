<template>
    <v-container fill-height grid-list-md text-center>
        <v-layout row wrap align-center>
            <v-flex>
                <v-layout column>
                    <v-flex>
                        <span class="display-1 font-weight-thin">
                            Choose how to create palette
                        </span>
                    </v-flex>
                    <v-flex>
                        <v-layout>
                            <v-flex>
                                <v-card color="transparent" flat>
                                    <v-card-text>
                                        <router-link to="/createFromImage" style="text-decoration: none;">
                                            <v-btn color="purple" outlined block>
                                                from image
                                            </v-btn>
                                        </router-link>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex>
                                <v-card color="transparent" flat>
                                    <v-card-text>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="primary" outlined block v-on="on">
                                                    from scratch
                                                </v-btn>
                                            </template>

                                            <span>
                                                Coming Soon!
                                            </span>
                                        </v-tooltip>


                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "chooseCreateMethod.vue"
    }
</script>

<style scoped>

</style>