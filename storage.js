class Storage{
    // All Users Get From Storage
    static getSearchedUsersFromStorage(){
        let users

        if(localStorage.getItem("searched") === null){
            users = []
        }
        else {
            users = JSON.parse(localStorage.getItem("searched"))
        }
        return users
    }

    // Add User to Storage
    static addSearchedUserToStorage(username){
        let users = this.getSearchedUsersFromStorage()

        if(users.indexOf(username) === -1){
            users.push(username)
        }
        localStorage.setItem("searched",JSON.stringify(users))
    }

    // All Users Delete From Storage
    static clearAllSearchedUsersFromStorage(){
        localStorage.removeItem("searched")
    }
}