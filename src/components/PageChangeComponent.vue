<template>
  <button class="btn btn-info" @click="changePage(newer)" :disabled="!newer">Newer</button>
  <button class="btn btn-info" @click="changePage(older)" :disabled="!older">Older</button>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";



export default {

  setup() {
    return {
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),



      async changePage(url) {
        try {
          await postsService.changePage(url)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>