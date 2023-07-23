<template>
  <div class="ads">
    <a :href="'https://' + ad.linkURL">
      <img class="img-fluid" :src="ad.tall" alt="">
    </a>
  </div>
</template>


<script>
import { Ad } from "../models/Ad.js";

export default {
  props: {
    ad: { type: Ad, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>