<template>
    <v-container fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center>
            <v-flex class="text-center placeholder">

            </v-flex>
            <v-flex class="text-center">
                <v-layout column>
                    <v-flex v-if="!getUserFromState">
                        <span><p class="display-1 font-weight-light white--text shadow"> Hello, New User! </p></span>
                    </v-flex>

                    <v-flex v-else>
                        <span><p class="display-1 font-weight-light white--text shadow"> Hello, {{ getUserFromState }} </p></span>
                    </v-flex>

                    <v-flex v-if="$vuetify.breakpoint.xsOnly">
                        <span>
                            <p class="display-2 font-weight-light white--text shadow"> Kaleidoscope </p>
                        </span>
                    </v-flex>
                    <v-flex v-else>
                        <span>
                            <p class="display-4 white--text shadow"> Kaleidoscope </p>
                        </span>
                    </v-flex>
                    <v-flex>
                        <v-text-field
                                label="enter a term"
                                color="white"
                                v-model="searchTerm"
                                filled
                                clearable
                                required>

                        </v-text-field>
                    </v-flex>
                    <v-flex>
                        <span class="white--text font-weight-light">
                            Not sure what to do? Try searching 'all'.
                        </span>
                    </v-flex>
                    <v-flex>
                        <v-btn x-large color="purple darken-3" dark @click="submit">Search</v-btn>
                    </v-flex>

                    <v-flex>
                        <!-- use a snackbar to notify when the user has been logged in-->
                        <v-snackbar v-model="getUserFromState" :timeout="2000">
                            <span class="text-left">
                                <v-icon color="white" class="mr-3" medium>
                                    done_all
                                </v-icon>
                                {{ getUserFromState }} is logged in!
                            </span>

                        </v-snackbar>
                    </v-flex>
                </v-layout>
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
          loggedIn: false
      }
  },
  methods: {
       submit: function (){
           // go to the next page
           this.$router.push({
               name: 'search',
               params: {
                   query: this.searchTerm.toLowerCase() // make everything lowercase
               },
           })
       }
  },
  computed: {
      // get the user from the store
      getUserFromState() {
          // if there is no user then return newUser
          if (this.$store.state.user === "") {
              return false
          }

          // // else if there is a user
          // set logged in to true
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
