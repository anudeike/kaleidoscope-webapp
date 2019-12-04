<template>
    <v-container fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center>
            <v-flex class="text-center placeholder">

            </v-flex>
            <v-flex class="text-center">
                <span><p class="display-1 font-weight-light white--text shadow"> Hello, {{ getUserFromState }} </p></span>
                <span><p class="display-4 white--text shadow"> Kaleidoscope </p></span>
                <v-text-field
                        label="enter a term"
                        color="white"
                        v-model="searchTerm"
                        filled
                        clearable
                        required>

                </v-text-field>

                <v-btn x-large color="purple darken-3" dark @click="submit">Search</v-btn>
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
          searchTerm: "",
      }
  },
  methods: {
       submit: function (){
           // go to the next page
           this.$router.push({
               name: 'search',
               params: {
                   query: this.searchTerm
               },
           })
       }
  },
  computed: {
      // get the user from the store
      getUserFromState() {
          // if there is no user then return newUser
          if (this.$store.state.user === "") {
              return "New User!"
          }

          // // else if there is a user
          return this.$store.state.user;
      }
  }
};
</script>

<style>
    p.shadow {
        text-shadow: 2px 2px 10px rgba(0,0,0,0.4);
    }

</style>
