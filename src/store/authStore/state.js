import AppHelper from 'src/third-party/helper/app-helper.min'

export default function () {
  return {
    thisBiodata: {
      name: 'Unnamed',
      profile_img: AppHelper.defaultProfileImg(),
      status: '-',
      email: '-'
    }
  }
}
