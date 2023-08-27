const host = "http://localhost:5000";
const mongoUrl =
  "mongodb+srv://admin:brhYuuMwXGvjrcIB@cluster0.pbam8b1.mongodb.net/?retryWrites=true&w=majority";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;
