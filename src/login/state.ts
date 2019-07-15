export const IsLoggedIn = () => {
  return localStorage.getItem("token") !== null;
}
