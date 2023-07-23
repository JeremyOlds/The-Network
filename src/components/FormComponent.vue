<template>
  <div>
    <img class="avatar" :src="user.picture" alt="abcde">
  </div>
  <form @submit.prevent="handleSubmit()">
    <div>
      <textarea v-model="editable.body" name="body" id="body" class="form-control flex-grow" required
        placeholder="Write a Post!" maxlength="300"></textarea>
    </div>
    <div class="d-flex pb-2">
      <input v-model="editable.imgUrl" class="form-control" type="url" id="imgUrl" name="imgUrl" maxlength="300"
        placeholder="Post an image url!">
    </div>
    <input type="submit">
  </form>
</template>


<script>
import { computed, onMounted, ref, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";

export default {
  setup() {
    const editable = ref({})


    watchEffect(() => {
      if (AppState.activePost) {
        const brokenRefPost = { ...AppState.activePost }
        editable.value = brokenRefPost
      }
    })

    return {


      editable,
      user: computed(() => AppState.account),

      handleSubmit() {
        if (editable.value.id) {
          this.editPost()
        } else {
          this.createPost()
        }
      },
      async createPost() {
        try {
          const postData = editable.value
          await postsService.createPost(postData)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      },
      // FIXME edit post is not required. do later as an optional
      async editPost() {
        try {
          const postData = editable.value
          await postsService.editPost(postData)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      },


    }
  }
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
</style>