<template>
  <div>Home
    <div class="card px-2 py-2">{{encryptRSA()}}</div>
  </div>
</template>

<script>
import forge from 'node-forge'
export default {
  name: 'Home',
  created () {
    // this.encryptRSA()
  },
  methods: {
    encryptRSA () {
      var kalimat = [
        { name: 'My Name is Bachtiar', profile_img: '/files/image/profile/users/USR-Q3yszDnYjIkXq7G.jpg', username: 'bachtiar@mail.com', password: 'bachtiar' },
        { name: 'My Name is Bachtiar', profile_img: '/files/image/profile/users/USR-Q3yszDnYjIkXq7G.jpg', username: 'bachtiar@mail.com', password: 'bachtiar' },
        { name: 'My Name is Bachtiar', profile_img: '/files/image/profile/users/USR-Q3yszDnYjIkXq7G.jpg', username: 'bachtiar@mail.com', password: 'bachtiar' }
      ]

      // var myPrivateKey = forge.pki.privateKeyFromPem(this.environment.privateKey)
      // var getPublicKey = forge.pki.setRsaPublicKey(myPrivateKey.n, myPrivateKey.e)
      var theKey = forge.pki.ed25519.generateKeyPair()
      var getPublicKey = theKey.publicKey
      var encryptText = getPublicKey.encrypt(forge.util.encodeUtf8(JSON.stringify(kalimat)))

      localStorage.setItem('_encrypt', encryptText)

      // var pk = forge.pki.privateKeyFromPem(this.environment.privateKey)
      var pk = forge.pki.privateKeyFromPem(theKey.privateKey)
      var plain = forge.util.decodeUtf8(pk.decrypt(localStorage.getItem('_encrypt')))

      return {
        native: kalimat,
        encrypted: encryptText,
        localStorage: localStorage.getItem('_encrypt'),
        decrypted: JSON.parse(plain)
      }
    },
    encryptCBC () {
      var origin = 'hello bastard'
      var key = forge.random.getBytesSync(16)
      var iv = forge.random.getBytesSync(16)
      // encrypt
      var cipher = forge.cipher.createCipher('AES-CBC', key)
      cipher.start({ iv: iv })
      cipher.update(forge.util.createBuffer(origin))
      cipher.finish()
      var resEncrypt = cipher.output.toHex()
      // decrypt
      // var decipher = forge.cipher.createDecipher('AES-CBC', key)
      // decipher.start({ iv: iv })
      // decipher.update(cipher.output)
      // decipher.finish()
      // var resDecrypt = decipher.output.toHex()
      var encryptedBytes = cipher.output.bytes()
      var decipher = forge.cipher.createDecipher('AES-CBC', key)
      decipher.start({ iv: iv })
      var length = encryptedBytes.length
      var chunkSize = 1024 * 64
      var index = 0
      var decrypted = ''
      do {
        decrypted += decipher.output.getBytes()
        var buf = forge.util.createBuffer(encryptedBytes.substr(index, chunkSize))
        decipher.update(buf)
        index += chunkSize
      } while (index < length)
      decipher.finish()
      decrypted += decipher.output.getBytes()
      var resDecrypt = forge.util.bytesToHex(decrypted)
      // result
      return {
        origin,
        encrypt: resEncrypt,
        decrypt: resDecrypt
      }
    },
    createKey () {
      // return forge.pki.privateKeyToPem(forge.pki.rsa.generateKeyPair({ bits: 2048, workers: 2 }).privateKey)
    }
  },
  data () {
    return {
      environment1: { privateKey: '-----BEGIN RSA PRIVATE KEY----- MIIEowIBAAKCAQEAq090gW+5Ic5v8LwMOCnQY34D1D6YQwAWXVzqQ9pMFsaAziNX YLwdTEeJ9a161/cgCnxmNKZNGnc/WCdAwMzjC8rtu8QLrnwnCxGvSLXMuVwAgbP8 Phi+ojDZRhNNMdPdpg7r3L7updnDSHFkZLPkeu2Sw3J7bnAs/qjRvR+V4M50OSA6 hUe8TYEkbaCwOjnGbHCMcztvTtQtn8t9ImG+pTfToU8xHcdet37KSOeywxvpcp9p ziW1Pgqe4NJBDoOWC8kHzL00feRz766nkyMDXyhQZbpAmbyDuTC/Zwl6czvf6z6H 4bvrcdvFJOMPSO3Ldsd5TB9IDZyoEiBpZyS3DQIDAQABAoIBAAtEy74j8kKmCLkG NauQHJQe2vOgNnXZ0J7NmN9jwbOR1TE6I+pKFYdKAWo2wijoqaPm8PYvpkzCYVlU I69LCvhgnejHCZmtswfIXwZiZxgeVC4z/7i5+fhDTFeOt3o6nI7q1lsL+DjSrUTb qKXzK2lmrUvMARCPsnYB9uIA7OP/tRo81Odn6iv+uSt5BoMWKdbZcPatOOZDsEu/ X80MCC6YmVtUPey4MOctAcrN3Y0n84+xCTCyOvrWfcfk5zOlrqEQQJh5sZFfXPMR ulXpljJxK0oqCT9LV08x+fFPkwISS7azJyJAPo0QQ1zPXgNwttmL4mv5L3toRIVG WcxprUUCgYEA0rqB2vkD6TCVDy/s8jSXdMd7EJV2y8T983e49mpI9PsJ0vBj76Lh xvpHPE7NMVenWa+8pxv/sSXn6G16m3PRN0YtAcCvL0IukLEfdAhHXlIsDKADrh9s pYymbvFpdNn+useWTULQOmp6ybLQqDR1YqawxWWnMEn9zk95JUK5BG8CgYEA0B0O a6XeqUDa6VhpsU6xw014nNEbx2B4qmyASvRwmgCYTQ/WOBmPsB+t6CGsRQanDcsL kEuwGcPX2nkfDJnfToQd+UvBafFd+1QECwFU5fRhDbbJ6Bah5jfdj6A7OuLbDqIm mxgZTzTvxeC36dpKjG1Zv30HPPZJ/yOxW2ADUkMCgYEAywFPncKsqNXbk1DpI//U NHUDsls6oV06BHU+o2yKsi6xLRvWOoIgnU54l7mWZUV6+6SXyijn7yGEQt5M8jrl vykErJ6SZaWNNGjd0ysyjcP9mYABa5nsUaOoplI89IwZoJgrzGxkKxJvDaYM6y32 M74/pzqhkJyHPFxFacbYdFMCgYAyWDUa2X9p1mSeumKnH/Bk3KLm3Lcpni7Sm3jV qRhsSOSPD9u0qopWAvPhCfRQpnFXJt1fRNAPC492LILUW4znw5I0spzRcjBYElUA DIxrLJkl5igl2wPDW5RfoFVzw1lWyucn8cZ9oMK4Tcpv6fzKx9FEP4y2tKXl8M6A 2lMzXQKBgHGs+JHS9KDkGvXtdnpIjxDuqhbjVGLelWwYE/+/YNmb+QN9zQXv2GAW oGBSJ+4QbFsrQhpZjx7NDYpMkYh043FuNhDvDikh4ib6cMn0AsuzhTJGRvRHwBt9 tHWAYI1Xj1tQC1ef1lDiid7gec+U92CBppp8SNkqyxK1qAASsC1o -----END RSA PRIVATE KEY-----' },
      environment: { privateKey: '-----BEGIN RSA PRIVATE KEY----- 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 -----END RSA PRIVATE KEY-----' }
    }
  }
}
</script>
