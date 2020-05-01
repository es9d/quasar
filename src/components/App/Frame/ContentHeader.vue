<template>
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-8 mb-2">
          <h1 class="m-0 text-dark text-lg">{{ title }}</h1>
        </div>
        <div class="col-sm-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentHeader',
  props: {
    title: String
  }
}
</script>
