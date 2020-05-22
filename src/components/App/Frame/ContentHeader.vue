<template>
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-8 mb-2">
          <h1 class="m-0 text-dark text-lg">{{ title }}</h1>
        </div>
        <div class="col-4 text-right">
          <button
            class="btn btn-sm btn-link text-bold"
            @click="backToPreviousPage"
          ><i class="fas fa-arrow-circle-left"></i>&ensp;return</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentHeader',
  props: {
    title: String
  },
  methods: {
    backToPreviousPage () {
      window.history.go(-1); return false
    }
  }
}
</script>
