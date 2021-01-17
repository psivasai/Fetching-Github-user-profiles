const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("psivasai");

async function getUser(username) {
    const response = await fetch(APIURL + username);
    const responseData = await response.json();

    createUserCard(responseData);

    getRepos(username);
}


function createUserCard(user) {
    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

async function getRepos(username) {
    const response = await fetch(APIURL + username + "/repos");
    const responseData = await response.json();

    addReposToCard(responseData);
}

function addReposToCard(repos) {
    const repository = document.getElementById("repos");

    repos.forEach((repo) => {
            const eachRepo = document.createElement("a");
            eachRepo.classList.add("repo");

            eachRepo.href = repo.html_url;
            eachRepo.target = "_blank";
            eachRepo.innerText = repo.name;

            repository.appendChild(eachRepo);
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
});
