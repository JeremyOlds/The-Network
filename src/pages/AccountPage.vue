<template>
  <div class="about text-center">
    <div>
      <img class="img-fluid cover-image" :src="account.coverImg" alt="">
    </div>
    <h1>Welcome {{ account.name }} <span v-if="account.graduated == true"><i class="mdi mdi-school"></i></span></h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10 m-auto elevation-5 my-3 shadow rounded bg-light">
        <div class="d-flex flex-column">
          <span>{{ account.class }}</span>
          <span>{{ account.github }}</span>
          <span>{{ account.linkedin }}</span>
          <span>{{ account.resume }}</span>
          <span>{{ account.bio }}</span>
        </div>
      </div>
      <div class="col-10 m-auto elevation-5 my-3 shadow rounded bg-info">
        <form @submit.prevent="editAccount()">
          <div>
            <label for="name">Username</label>
            <input v-model="editable.name" type="text" class="form-control" name="name" id="name">
          </div>
          <div>
            <label for="email">Email</label>
            <input v-model="editable.email" type="text" class="form-control" name="email" id="email">
          </div>
          <div>
            <label for="picture">Picture</label>
            <input v-model="editable.picture" type="url" class="form-control" name="picture" id="picture">
          </div>
          <div>
            <label for="bio">Bio</label>
            <textarea v-model="editable.bio" class="form-control" name="bio" id="bio" cols="30" rows="10"></textarea>
          </div>
          <div>
            <label for="coverImg">Cover Image</label>
            <input v-model="editable.coverImg" type="url" class="form-control" name="coverImg" id="coverImg">
          </div>
          <div>
            <label for="github">Github link</label>
            <input v-model="editable.github" type="url" class="form-control" name="github" id="github">
          </div>
          <div>
            <label for="linkedin">Linkedin link</label>
            <input v-model="editable.linkedin" type="url" class="form-control" name="linkedin" id="linkedin">
          </div>
          <div>
            <label for="resume">Resume link</label>
            <input v-model="editable.resume" type="url" class="form-control" name="resume" id="resume">
          </div>
          <div>
            <label for="class">Class of</label>
            <input v-model="editable.class" type="text" class="form-control" name="class" id="class">
          </div>
          <div>
            <label for="graduated">Graduated?</label>
            <input v-model="editable.graduated" type="checkbox" name="graduated" id="graduated">
          </div>
          <input type="submit">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { accountService } from "../services/AccountService.js";
export default {
  setup() {

    const editable = ref({})

    watchEffect(() => {
      if (AppState.account) {
        const brokenRefAccount = { ...AppState.account }
        editable.value = brokenRefAccount
      }
    })

    onMounted(() => {
      logger.log(AppState.account)
    })

    return {
      editable,
      account: computed(() => AppState.account),

      async editAccount() {
        try {
          const formData = editable.value
          await accountService.editAccount(formData)
        } catch (error) {
          Pop.error(error.message)
        }
      }

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.cover-image {
  height: 20vh;
  width: 100%;
}

.input {
  margin-bottom: .5em;
}
</style>
