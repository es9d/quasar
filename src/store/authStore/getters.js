import AppLink from 'src/third-party/helper/app-link.min'

export default {
  thisBiodata: state => state.thisBiodata,
  sidebarLink: state => AppLink.getAddrLink(state.thisBiodata.status).sort((a, b) => a.index.localeCompare(b.index))
}
