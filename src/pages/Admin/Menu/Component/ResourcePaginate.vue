<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <p
        v-if="dataCount != 0"
        class="mt-lg-2 text-muted text-sm"
      >Showing {{query.data_from}} to {{query.data_to}} of {{dataCount}} entries</p>
    </div>
    <div
      v-if="dataCount !=0"
      class="col-12 col-md-6 btn-group text-center text-md-right pagination mt-1"
    >
      <button
        type="button"
        class="btn btn-sm btn-outline-primary"
        @click="gotoPage('first')"
      ><i class="fas fa-angle-double-left"></i></button>
      <button
        type="button"
        class="btn btn-sm btn-outline-primary"
        @click="gotoPage('prev')"
      ><i class="fas fa-chevron-left"></i></button>
      <span
        v-for="(page, idx) in getPaginate()"
        :key="idx"
        :class="`btn btn-sm ${page == mainPage ? `btn-primary` : `btn-outline-primary`}`"
        @click="gotoPage(page)"
      >{{page}}</span>
      <button
        type="button"
        class="btn btn-sm btn-outline-primary"
        @click="gotoPage('next')"
      ><i class="fas fa-chevron-right"></i></button>
      <button
        type="button"
        class="btn btn-sm btn-outline-primary"
        @click="gotoPage('last')"
      ><i class="fas fa-angle-double-right"></i></button>
    </div>
  </div>
</template>

<script>
import UrlHelper from 'src/third-party/helper/url-helper.min'
import PagHelper from 'src/third-party/helper/paginate-helper.min'
export default {
  name: 'ResourcePaginate',
  props: {
    paramName: String,
    dataCount: null,
    query: null,
    mainPage: null
  },
  methods: {
    getPaginate () {
      return PagHelper.getPaginate(UrlHelper.getUrlParamValue(this.query.last_page, 'page'), this.mainPage)
    },
    getAnotherDataPaginates (url) {
      this.$axios.getCookies().then(() => {
        this.$parent.updateTableDataInfo('reboot')
        this.$axios.getResAdminMenuDynamicUrl(url).then((res) => {
          if (res.data.status === 'success') {
            const data = res.data.response_data
            this.$parent.listOfUsers = data[`${this.paramName}`].list || []
            this.$parent.pageQuery = data[`${this.paramName}`].query || []
            this.$parent.currentPage = UrlHelper.getUrlParamValue(url, 'page')
            this.$parent.updateTableDataInfo()
          } else {
            this.$Notify.notifyInfo(res.data.message)
          }
        })
      })
    },
    gotoPage (goto) {
      if (typeof goto === 'string') {
        if ((goto === 'next') && this.query.next_page) this.getAnotherDataPaginates(this.query.next_page)
        if ((goto === 'prev') && this.query.prev_page) this.getAnotherDataPaginates(this.query.prev_page)
        if ((goto === 'first') && this.query.first_page) this.getAnotherDataPaginates(this.query.first_page)
        if ((goto === 'last') && this.query.last_page) this.getAnotherDataPaginates(this.query.last_page)
      } else this.getAnotherDataPaginates(UrlHelper.updateUrlParamValue(this.query.first_page, 'page', goto))
    }
  }
}
</script>

<style lang="stylus" scoped>
div.btn-group {
  margin: 0 auto;
  text-align: right;
  width: inherit;
  display: inline-block;
}
</style>
