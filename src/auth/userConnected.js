const userConnected = () => {
    const storageData = JSON.parse(localStorage.getItem("user"))
    return storageData.userId;
}

export default userConnected
