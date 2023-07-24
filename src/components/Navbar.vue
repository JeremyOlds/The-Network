<template>
  <nav class="navbar navbar-expand-lg navbar-dark nav-color px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div @click="resetActiveProfile()" class="d-flex align-items-center d-flex">
        <img class="rounded" alt="logo" src="https://bcw.blob.core.windows.net/public/images/7538647622428924"
          height="45" />
        <h1 class="text-white ms-2">Network</h1>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import Login from './Login.vue';
export default {
  setup() {
    return {

      resetActiveProfile() {
        AppState.activeProfile = {}
        logger.log('active profile reset')
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

.nav-color {
  background-color: #2caabe;
}
</style>
