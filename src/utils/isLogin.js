export function isLogin() {
  if (localStorage.getItem('token')) {
    return true;
  } else {
    return false;
  }
}
