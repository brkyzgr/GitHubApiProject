// Elements Select
const githubForm = document.getElementById("github-form")
const nameInput = document.getElementById("githubname")
const clearLastUsers = document.getElementById("clear-last-users")
const lastUsers = document.getElementById("last-users")

// Objects
const github = new Github()
const ui = new UI()

// Events 
eventListeners()

function eventListeners(){
    githubForm.addEventListener("submit",getData)
    clearLastUsers.addEventListener("click",clearAllSearched)
    document.addEventListener("DOMContentLoaded",getAllSearched)
}

// getData Function
function getData(e){
    
    let username = nameInput.value.trim()

    if(username === ""){
        alert("Please enter a valid username.")
    }
    else {
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("User Not Found")
                
            }
            else {
                ui.addSearchedUserToUI(username)


                Storage.addSearchedUserToStorage(username)
                ui.showUserInfo(response.user)
                ui.showRepoInfo(response.repo)
            }
        })
        .catch(err => ui.showError(err))
    }




    ui.clearInput() // Clear Input
    e.preventDefault()
}

// clearAllSearched Function
function clearAllSearched(){
    // Clear all searched
    
    if(confirm("Are you sure?")){
        Storage.clearAllSearchedUsersFromStorage() // Clear From Storage
        ui.clearAllSearchedFromUI()

    }
}

// getAllSearched Function
function getAllSearched(){
    // I took the search items from Storage and added them to the UI.(if Page Refresh)

    let users = Storage.getSearchedUsersFromStorage()

    let result = ""
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`
    })

    lastUsers.innerHTML = result

}