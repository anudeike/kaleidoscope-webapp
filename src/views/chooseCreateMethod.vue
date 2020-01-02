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
                                        <router-link to="/create" style="text-decoration: none;">
                                            <v-btn color="primary" outlined block>
                                                from scratch
                                            </v-btn>
                                        </router-link>

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