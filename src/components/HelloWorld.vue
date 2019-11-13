<template>
    <v-container fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center>
            <v-flex class="text-center placeholder">

            </v-flex>
            <v-flex class="text-center">
                {{ myData }}
            </v-flex>
            <v-flex class="text-center placeholder">

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data() {
      return {
          myData: "home page",
      }
  }
};
</script>

<style scoped>

</style>
