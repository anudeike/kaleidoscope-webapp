<template>
  <v-app>
    <v-app-bar app>

      <!--This the toolbar that will be present on each page-->
      <v-toolbar-title class="headline text-uppercase">
        <v-avatar color="indigo" size="36" class="mr-4">
          <img
            src="https://res.cloudinary.com/cheezitromansh/image/upload/v1572915189/kaleidoscope/Untitled-Artwork_2_aqamnh.jpg"
            alt="logo"
          />
        </v-avatar>

        <span>Kaleido</span>
        <span class="font-weight-light">scope</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
              color="#6200EE"
              class="white--text mr-2"
              outline
              to="/about"
      >
        <span class="">Login</span>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>


    </v-app-bar>

    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import Home from "./views/Home";

export default {
  name: "App",
  components: {
    Home
  },
  data: () => ({
    //
  })
};
</script>
