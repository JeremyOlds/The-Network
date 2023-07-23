<template>
  <div class="container-fluid">
    <div class="row">
      <!-- SECTION spacing -->
      <div class="col-2"></div>
      <!-- SECTION Posts and Profile Details -->
      <div class="col-8">
        <div class="row">
          <!-- STUB post form -->
          <div v-if="account.id" class="col-12 py-3 my-3 elevation-4 shadow rounded bg-light d-flex ">
            <FormComponent />
          </div>

          <!-- STUB Looped posts -->
          <div v-for="post in posts" :key="post.id" class="my-3 elevation-4 shadow rounded bg-light col-12">
            <PostComponent :post="post" />
          </div>
          <div class="d-flex justify-content-around my-3">
            <PageChangeComponent />
          </div>
        </div>
      </div>
      <!-- SECTION ads -->
      <div class="col-2">
        <div v-for="ad in ads" :key="ad.title">
          <AdComponent :ad="ad" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "vue";
import FormComponent from "../components/FormComponent.vue";
import PostComponent from "../components/PostComponent.vue";
import { AppState } from "../AppState.js";
import PageChangeComponent from "../components/PageChangeComponent.vue";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";


export default {
  setup() {
    async function getPostsByUser() {
      try {

        await postsService.getPostsByUser
      } catch (error) {
        Pop.error(error.message)
      }
    }
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      ads: computed(() => AppState.ads),



    };
  },
  components: { FormComponent, PostComponent, PageChangeComponent }
}
</script>


<style lang="scss" scoped>
.ads {
  margin-top: 30vh;
}
</style>