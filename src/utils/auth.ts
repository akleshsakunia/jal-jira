import { parseJwt } from "./common";

class Auth {
  authenticated: boolean = false;

  login(res: any, cb: () => void) {
    this.authenticated = true;
    localStorage.setItem("userInfo", JSON.stringify(parseJwt(res.data.token)));
    localStorage.setItem("token", res?.data?.token);
    localStorage.setItem(
      "loggedInAt",
      Math.floor(Date.now() / 1000).toString()
    );
    console.log(res, "received in login");
    cb();
  }

  logout(cb: () => void) {
    this.authenticated = false;
    localStorage.clear();
    cb();
  }

  isAuthenticated() {
    const token = localStorage.getItem("token");
    const loggedInAt = localStorage.getItem("loggedInAt") || 0;
    const currTime = Math.floor(Date.now() / 1000);
    const expirationTime = 3600 + Number(loggedInAt)
    if (token &&  currTime < expirationTime )
      this.authenticated = true;
    else this.authenticated = false;
    return this.authenticated;
  }
}

export default new Auth();
