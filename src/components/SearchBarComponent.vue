<template>
  <div>

    <form @submit.prevent="getPostsByQuery()">
      <textarea v-model="editable.query" name="search" id="search" cols="50" rows="2" placeholder="Search..."></textarea>
      <div>
        <button class="btn btn-primary">Search</button>
      </div>
    </form>
    <div>
      <button v-if="activeProfile.id" @click="getPostsByUser()" class="btn btn-danger">Reset Search</button>
      <button v-else @click="getPosts()" class="btn btn-danger">Reset Search</button>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "vue";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";

export default {
  setup() {

    const editable = ref({})
    const route = useRoute()

    return {
      editable,
      activeProfile: computed(() => AppState.activeProfile),

      async getPostsByQuery() {
        try {
          const queryObject = editable.value
          await postsService.getPostsByQuery(queryObject)
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async getPostsByUser() {
        try {
          const creatorId = route.params.profileId
          await postsService.getPostsByUser(creatorId)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async getPosts() {
        try {
          await postsService.getPosts();
          editable.value = {}
        }
        catch (error) {
          Pop.error(error.message);
        }
      }

    }
  }
}
</script>


<style lang="scss" scoped></style>