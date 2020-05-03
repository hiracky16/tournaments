<template>
  <div class="container">
    <template>
      <h1 class="finmessage">
        トーナメントの編集が完了しました。
      </h1>
      <div class="tournaments">
        <h2>
          artistname
        </h2>
        <h2>
          artistnameのトーナメント
        </h2>
      </div>
      <nuxt-link to="/home" class="button is-primary is-medium">To Top</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: block;
}

.finmessage {
  font-size: 60px;
  line-height: 100px;
  float: center;
}

.tournaments {
  font-size: 30px;
  line-height: 100px;
  float: center;
}

</style>