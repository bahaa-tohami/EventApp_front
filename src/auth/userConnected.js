export const UserConnected = () => {

    const user = JSON.parse(localStorage.getItem("user"))

    if (user && user.token) {
        return user.userId;
    } else {
        return {}
    }

}