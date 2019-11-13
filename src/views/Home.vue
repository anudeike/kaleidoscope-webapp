<template>
  <div id="home" class="fill-height">
    <HelloWorld/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>

<style>
  @keyframes bgcolor {
    0% {
      background-color: #45a3e5
    }

    30% {
      background-color: #66bf39
    }

    60% {
      background-color: #eb670f
    }

    90% {
      background-color: #f35
    }

    100% {
      background-color: #864cbf
    }
  }

  #home {
    -webkit-animation: bgcolor 20s infinite;
    animation: bgcolor 10s infinite;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
  }
</style>