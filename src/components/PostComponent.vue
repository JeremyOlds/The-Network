<template>
  <div class="d-flex align-items-center">
    <!-- TODO createathe setActiveProfile function to be able to get info for profile page. -->
    <router-link @click="setActiveProfile()" :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
      <img :title="post.creator.name" class="img-fluid avatar" :src="post.creator.picture" :alt="post.creator.name">
    </router-link>
    <div>
      <div class="d-flex align-items-center justify-content-between">
        <p class="fw-bold">{{ post.creator.name }}</p>
        <div v-if="post.creator.id == account.id">
          <!-- FIXME edit post is not requirement. do as optional later -->
          <!-- <button class="btn btn-info mx-2">
            <i class="mdi mdi-pencil"></i> 
          </button> -->
          <button @click="deletePost()" class="btn btn-danger mx-2">
            <i class="mdi mdi-delete"></i>
          </button>
        </div>
      </div>
      <div class="d-flex align-items-center p-3">
        <p>{{ post.createdAt.toLocaleDateString() }}</p>
        <i v-if="post.creator.graduated == true" class="mdi mdi-school"></i>
      </div>
    </div>
  </div>
  <!-- STUB post body -->
  <div class="pt-3">
    {{ post.body }}
    <div>
      <img class="img-fluid" :src="post.imgUrl" alt="">
    </div>
  </div>
  <div class="d-flex justify-content-end align-items-center">
    <div class="px-2">Likes: {{ post.likeIds.length }}</div>
    <button v-if="account.id" @click="likePost()" class="my-2 btn btn-success"><i class="mdi mdi-heart"></i></button>
  </div>
</template>


<script>
import { computed } from "vue";
import { Post } from "../models/Post.js";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";


export default {
  props: {
    post: { type: Post, required: true }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deletePost() {
        try {
          const wantsToRemovePost = await Pop.confirm("are you sure you want to delete this post?");
          if (!wantsToRemovePost) {
            return;
          }
          const postId = props.post.id;
          await postsService.deletePost(postId);
        }
        catch (error) {
          Pop.error(error.message);
        }
      },
      async likePost() {
        try {
          const accountId = AppState.account.id
          await postsService.likePost(accountId, props.post)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    };
  },
}
</script>


<style lang="scss" scoped>
.avatar {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

p {
  margin: 0;
}
</style>
