import router from '@/router'
import CredMng from '@/third-party/auth/credential-manager.min.js'
import Toastr from "@/third-party/library/toastrjs.min.js";
import RestServices from '@/services/axios/rest-api';
const AuthMid = {
    async boolCheck() {
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