import router from 'src/router'
import CredMng from 'src/third-party/auth/credential-manager.min'
import Toastr from 'src/third-party/library/toastrjs.min'
import RestServices from 'src/services/axios-api-endpoint'
const AuthMid = {
    async boolCheck () {
        let res = await RestServices.getCredential().catch(() => this.doLogout());
        return this.boolCheckRes(res);
    },
    boolCheckRes: (res) => (res && (res.data.status == "success") ? true : false),
    doLogout: () => {
        Toastr.toastError("Please login first!");
        CredMng.credentialKeyRemove();
        router.push({ name: "Login" });
    },
    getRouteAuthProtected: () => {
        return ["Home", "Profile"];
    },
    getRouteUnprotected: () => {
        return ["Login", "Register", "ForgetPassword", "RecoverPassword", "RegisterVerify", "About", "PageNotFound"];
    }
};
export default AuthMid;