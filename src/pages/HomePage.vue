<template>
  <div class="container-fluid">
    <div class="row">
      <!-- SECTION Potential Profile snippet -->
      <div class="col-2">

      </div>
      <!-- SECTION post form and posts -->
      <div class="col-8 m-auto">
        <div class="row">
          <!-- STUB post form -->
          <div v-if="account.id" class="col-12 py-3 my-3 elevation-4 shadow rounded bg-light d-flex ">
            <FormComponent />
          </div>

          <!-- STUB Looped posts -->
          <div v-for="post in posts" :key="post.id" class="my-3 elevation-4 shadow rounded bg-light col-12">
            <PostComponent :post="post" />
          </div>
        </div>
        <!-- SECTION previous/next page buttons -->
        <div class="d-flex justify-content-around my-3">
          <!-- STUB moved these to a separate component -->
          <PageChangeComponent />

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
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js"
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import PostComponent from "../components/PostComponent.vue";
import FormComponent from "../components/FormComponent.vue";
import AdComponent from "../components/AdComponent.vue";
import PageChangeComponent from "../components/PageChangeComponent.vue";





export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getPosts();
    });
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      ads: computed(() => AppState.ads),



    };
  },
  components: { PostComponent, FormComponent, AdComponent, PageChangeComponent }
}
</script>

<style scoped lang="scss">
label {
  display: block;
}

input {
  flex-grow: 1;
}

.ads {
  margin-top: 30vh;
}
</style>
