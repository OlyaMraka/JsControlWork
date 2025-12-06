fetch("https://jsonplaceholder.typicode.com/users")
.then(result => result.json())
.then(data => {
    let userContainer = document.createElement("div");
    userContainer.className = "user-container";

    for (let {id, name} of data) {
        let userCard = document.createElement("div");
        userCard.className = "user-card";

        let idValue = document.createElement("h2");
        idValue.innerText = id;

        let nameValue = document.createElement("h3");
        nameValue.innerText = name;

        let link = document.createElement("a");
        link.href = `./UserDetails/user-details.html?id=${id}`;
        link.innerText = "Details";

        userCard.append(idValue, nameValue, link);
        userContainer.appendChild(userCard);
    }

    document.body.appendChild(userContainer);
})
