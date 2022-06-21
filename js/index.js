// The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.
    // find the input value and define it in a variable. 
    // use variable with an event listener for submit event. 
    // create function that sends fetch GET request to github for user name

document.addEventListener('DOMContentLoaded', (event) => console.log('DOM loaded'));

document.addEventListener('submit', submitHandler);

function showUsers(data) {
    console.log(user)
}

function submitHandler(event) {
    event.preventDefault();
    // console.log('hi');
    const formInput = document.querySelector('#search').value
    const form = document.getElementById('github-form')
    form.reset()
    fetch(`https://api.github.com/search/users?q=${formInput}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        },
    })
        .then(response => response.json())
        .then(response => {
            const ul = document.getElementById('user-list')
            const reposList = document.getElementById('repos-list')
            reposList.innerHTML = ""
            ul.innerHTML = ""
            // console.log('response', response)
            // login, avatar_url, html_url
            response.items.map(item => {
                const li = document.createElement("li")

                const h2 = document.createElement("h2")
                h2.textContent = item.login
                h2.addEventListener('click', event => showUserRepos(item.login, event))
                // ul.appendChild(h2)

                const img = document.createElement('img')
                img.src = item.avatar_url
                // ul.appendChild(img)

                const p = document.createElement("p")
                p.textContent = item.html_url
                // p.setAttribute('style', 'white-space: pre;');
                // p.textContent = `${item.avatar_url} \r\n`
                // p.textContent += `${item.html_url}`
                // h2.appendChild(p)
                li.append(h2, img)
                // append everything to the li tags to contain it together before appending to the ul
                ul.append(li)
            })

            // data.forEach(showUsers)
        })
        .catch((error) => {
            console.error('Error', error);
        });
        // function showUsers(data) {
        //     console.log(user)
        // }

function showUserRepos(username, event) {
    const reposList = document.getElementById('repos-list')
    reposList.innerHTML = ""
    event.preventDefault()
    // console.log('username', username)
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(response => response.map(repo => {
            // console.log('repos', response)
            const li = document.createElement('li')
            const h1 = document.createElement('h1')
            h1.textContent = repo.name
            li.append(h1)
            reposList.append(li)
        }))
    }
}

// Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)
    // in the 2nd .then, iterate over the data using .forEach or .map to create a <p> element, append it to the DOM
    // append to div with ID "github-container"?
    // update the <p> innerHTML with the data:username (login:), avatar (avatar_url:) and a link to their profile (html_url:)