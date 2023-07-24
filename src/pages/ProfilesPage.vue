<template>
  <div class="container-fluid">
    <div class="row">
      <!-- SECTION spacing -->
      <div class="col-2">
        <div v-for="ad in ads" :key="ad.title">
          <AdComponent :ad="ad" />
        </div>
      </div>
      <!-- SECTION Posts and Profile Details -->
      <div class="col-8">
        <div class="row">
          <!-- STUB profile information -->
          <div class="col-12 py-3 my-3 elevation-4 shadow rounded bg-light">
            <div>
              <img class="img-fluid cover-image" :src="activeProfile.coverImg" alt="Whoops! no image Here!">
            </div>
            <div class="d-flex justify-content-between">
              <img class="avatar" :src="activeProfile.picture" alt="avatar image">
              <div>
                <a v-if='!activeProfile.linkedin == ""' :title="activeProfile.linkedin" :href="activeProfile.linkedin"><i
                    class="mdi mdi-linkedin fs-2"></i></a>
                <a v-if='!activeProfile.resume == ""' :title="activeProfile.resume" :href="activeProfile.resume"><i
                    class="mdi mdi-note-text-outline fs-2"></i></a>
                <a v-if='!activeProfile.github == ""' :title="activeProfile.github" :href="activeProfile.github"><i
                    class="mdi mdi-github fs-2"></i></a>
              </div>
            </div>
            <div>
              <h1>{{ activeProfile.name }}<i v-if="activeProfile.graduated == true" class="mdi mdi-school"></i></h1>
            </div>
            <div>
              <h3>{{ activeProfile.class }}</h3>
            </div>
            <div>
              <p>{{ activeProfile.bio }}</p>
            </div>
            <div v-if="activeProfile.id == account.id" class="d-flex justify-content-end">
              <router-link :to="{ name: 'Account' }">
                <button class="btn btn-outline-info">Edit</button>
              </router-link>
            </div>
          </div>
          <!-- STUB post form -->
          <div v-if="account.id == activeProfile.id" class="col-12 py-3 my-3 elevation-4 shadow rounded bg-light d-flex ">
            <FormComponent />
          </div>
          <!-- STUB search bar -->
          <div class="col-12 py-3 my-3 elevation-4 shadow rounded bg-light d-flex justify-content-center">
            <SearchBarComponent />
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
import { computed, onMounted, ref } from "vue";
import FormComponent from "../components/FormComponent.vue";
import PostComponent from "../components/PostComponent.vue";
import { AppState } from "../AppState.js";
import PageChangeComponent from "../components/PageChangeComponent.vue";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import { profilesService } from "../services/ProfilesService.js";
import { useRoute } from "vue-router";
import SearchBarComponent from "../components/SearchBarComponent.vue";




export default {
  setup() {

    const editable = ref({})
    const route = useRoute()

    async function getPostsByUser() {
      try {
        const creatorId = route.params.profileId
        await postsService.getPostsByUser(creatorId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    async function setActiveProfile() {
      try {
        const profileId = route.params.profileId
        await profilesService.setActiveProfile(profileId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      setActiveProfile()
      getPostsByUser()
    })
    return {
      editable,
      activeProfile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      ads: computed(() => AppState.ads),




    };
  },
  components: { FormComponent, PostComponent, PageChangeComponent, SearchBarComponent }
}
</script>


<style lang="scss" scoped>
.ads {
  margin-top: 30vh;
}

.avatar {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.cover-image {
  height: 20vh;
  width: 100%;
}
</style>