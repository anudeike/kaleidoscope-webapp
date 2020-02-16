<template>
  <v-app>
    <v-app-bar app>

      <!--This the toolbar that will be present on each page-->
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/home">
          <v-avatar color="indigo" size="36" class="mr-4">
            <img
                    src="https://res.cloudinary.com/cheezitromansh/image/upload/v1572915189/kaleidoscope/Untitled-Artwork_2_aqamnh.jpg"
                    alt="logo"
            />
          </v-avatar>
        </router-link>


        <span>Kaleido</span>
        <span class="font-weight-light">scope</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link v-if="$vuetify.breakpoint.xsOnly" to="/chooseMethod" style="text-decoration: none;">
        <v-btn
                color="purple"
                class="white--text mr-2"
                outlined
                to="/chooseMethod"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </router-link>

      <!--should send to choose method -->
      <router-link v-else to="/chooseMethod" style="text-decoration: none;">
        <v-btn
                color="purple"
                class="white--text mr-2"
                outlined
                to="/chooseMethod"
        >
          <span class="">Create Palette</span>
        </v-btn>
      </router-link>


      <router-link to="/auth" style="text-decoration: none;">
        <v-btn>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </router-link>

      <!-- should send the person to their account -->
      <!--<router-link to="/">-->
        <!--<v-btn icon>-->
          <!--<v-icon>mdi-menu</v-icon>-->
        <!--</v-btn>-->
      <!--</router-link>-->



    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
//import Home from "./views/Home";
//import firebase from 'firebase';

export default {

  name: "App",
  components: {

  },
  data () {
    return {
      loggedIn: false,
    }
  },
  mounted () {
    if(this.$store.state.user !== "New User"){
      this.loggedIn = true
    }

  }

};
</script>
