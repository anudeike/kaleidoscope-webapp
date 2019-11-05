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
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data: () => ({
    //
  })
};
</script>
