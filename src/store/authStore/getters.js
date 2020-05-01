import AppLink from 'src/third-party/helper/app-link.min'

export default {
  thisBiodata: state => state.thisBiodata,
  sidebarLink: state => AppLink.getAddrLink(state.thisBiodata.status).sort((a, b) => a.index.localeCompare(b.index))
}

// export function thisBiodata(state){
//   return state.thisBiodata
// }
// export function sidebarLink (state) {
//   return AppLink.getAddrLink(state.thisBiodata.status).sort((a, b) => a.index.localeCompare(b.index))
// }
