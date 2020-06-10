<template>
  <div>Home
    <div class="card px-1 py-1">{{this.encryptCBC().native}}</div>
    <div class="card px-1 py-1">{{this.encryptCBC().encrypted}}</div>
    <div class="card px-1 py-1">{{this.encryptCBC().localStorage}}</div>
    <div class="card px-1 py-1">{{this.encryptCBC().decrypted}}</div>
  </div>
</template>

<script>
import forge from 'node-forge'
export default {
  name: 'Home',
  created () {
    this.encryptCBC()
  },
  methods: {
    encryptCBC () {
      var kalimat = [{ name: 'My Name is Bachtiar', profile_img: '/files/image/profile/users/USR-Q3yszDnYjIkXq7G.jpg', username: 'bachtiar@mail.com', password: 'bachtiar' }]

      var myPrivateKey = forge.pki.privateKeyFromPem(this.environment.privateKey)
      var getPublicKey = forge.pki.setRsaPublicKey(myPrivateKey.n, myPrivateKey.e)

      var encryptText = getPublicKey.encrypt(forge.util.encodeUtf8(JSON.stringify(kalimat)))

      localStorage.setItem('_encrypt', encryptText)

      var pk = forge.pki.privateKeyFromPem(this.environment.privateKey)
      var plain = forge.util.decodeUtf8(pk.decrypt(localStorage.getItem('_encrypt')))

      return {
        native: kalimat,
        encrypted: encryptText,
        localStorage: localStorage.getItem('_encrypt'),
        decrypted: JSON.parse(plain)
      }
    }
  },
  data () {
    return {
      environment: { privateKey: '-----BEGIN RSA PRIVATE KEY----- MIIEowIBAAKCAQEAq090gW+5Ic5v8LwMOCnQY34D1D6YQwAWXVzqQ9pMFsaAziNX YLwdTEeJ9a161/cgCnxmNKZNGnc/WCdAwMzjC8rtu8QLrnwnCxGvSLXMuVwAgbP8 Phi+ojDZRhNNMdPdpg7r3L7updnDSHFkZLPkeu2Sw3J7bnAs/qjRvR+V4M50OSA6 hUe8TYEkbaCwOjnGbHCMcztvTtQtn8t9ImG+pTfToU8xHcdet37KSOeywxvpcp9p ziW1Pgqe4NJBDoOWC8kHzL00feRz766nkyMDXyhQZbpAmbyDuTC/Zwl6czvf6z6H 4bvrcdvFJOMPSO3Ldsd5TB9IDZyoEiBpZyS3DQIDAQABAoIBAAtEy74j8kKmCLkG NauQHJQe2vOgNnXZ0J7NmN9jwbOR1TE6I+pKFYdKAWo2wijoqaPm8PYvpkzCYVlU I69LCvhgnejHCZmtswfIXwZiZxgeVC4z/7i5+fhDTFeOt3o6nI7q1lsL+DjSrUTb qKXzK2lmrUvMARCPsnYB9uIA7OP/tRo81Odn6iv+uSt5BoMWKdbZcPatOOZDsEu/ X80MCC6YmVtUPey4MOctAcrN3Y0n84+xCTCyOvrWfcfk5zOlrqEQQJh5sZFfXPMR ulXpljJxK0oqCT9LV08x+fFPkwISS7azJyJAPo0QQ1zPXgNwttmL4mv5L3toRIVG WcxprUUCgYEA0rqB2vkD6TCVDy/s8jSXdMd7EJV2y8T983e49mpI9PsJ0vBj76Lh xvpHPE7NMVenWa+8pxv/sSXn6G16m3PRN0YtAcCvL0IukLEfdAhHXlIsDKADrh9s pYymbvFpdNn+useWTULQOmp6ybLQqDR1YqawxWWnMEn9zk95JUK5BG8CgYEA0B0O a6XeqUDa6VhpsU6xw014nNEbx2B4qmyASvRwmgCYTQ/WOBmPsB+t6CGsRQanDcsL kEuwGcPX2nkfDJnfToQd+UvBafFd+1QECwFU5fRhDbbJ6Bah5jfdj6A7OuLbDqIm mxgZTzTvxeC36dpKjG1Zv30HPPZJ/yOxW2ADUkMCgYEAywFPncKsqNXbk1DpI//U NHUDsls6oV06BHU+o2yKsi6xLRvWOoIgnU54l7mWZUV6+6SXyijn7yGEQt5M8jrl vykErJ6SZaWNNGjd0ysyjcP9mYABa5nsUaOoplI89IwZoJgrzGxkKxJvDaYM6y32 M74/pzqhkJyHPFxFacbYdFMCgYAyWDUa2X9p1mSeumKnH/Bk3KLm3Lcpni7Sm3jV qRhsSOSPD9u0qopWAvPhCfRQpnFXJt1fRNAPC492LILUW4znw5I0spzRcjBYElUA DIxrLJkl5igl2wPDW5RfoFVzw1lWyucn8cZ9oMK4Tcpv6fzKx9FEP4y2tKXl8M6A 2lMzXQKBgHGs+JHS9KDkGvXtdnpIjxDuqhbjVGLelWwYE/+/YNmb+QN9zQXv2GAW oGBSJ+4QbFsrQhpZjx7NDYpMkYh043FuNhDvDikh4ib6cMn0AsuzhTJGRvRHwBt9 tHWAYI1Xj1tQC1ef1lDiid7gec+U92CBppp8SNkqyxK1qAASsC1o -----END RSA PRIVATE KEY-----' }
    }
  }
}
</script>
