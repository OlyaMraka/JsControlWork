const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(res => res.json())
    .then(data => {
        let userContainer = document.createElement("div");
        userContainer.className = "user-container";

        let {id, name, username, email, address, phone, website, company} = data;

        let mainInfoBlock = document.createElement("div");
        mainInfoBlock.className = "main-info-block";

        // ---------------------- Main User Info ------------------------------
        let mainBlockTitle = document.createElement("h2")
        mainBlockTitle.innerText = "Main User Information";

        let idValue = document.createElement("p");
        idValue.innerText = "User Id: " + id;

        let nameValue = document.createElement("p");
        nameValue.innerText = "Name: " + name;

        let usernameValue = document.createElement("p");
        usernameValue.innerText = "Username: " + username;

        let emailValue = document.createElement("p");
        emailValue.innerText = "Email: " + email;

        let phoneValue = document.createElement("p");
        phoneValue.innerText = "Phone: " + phone;

        mainInfoBlock.append(mainBlockTitle, idValue, nameValue, usernameValue, emailValue, phoneValue);

        // ------------------------ Address Block -------------------------------
        let { street, suite, city, zipcode, geo } = address

        let addressContainer = document.createElement("div");
        addressContainer.className = "address-container";

        let addressBlockTitle = document.createElement("h2")
        addressBlockTitle.innerText = "User Address";

        let streetValue = document.createElement("p");
        streetValue.innerText = "Street: " + street;

        let suiteValue = document.createElement("p");
        suiteValue.innerText = "Suite: " + suite;

        let cityValue = document.createElement("p");
        cityValue.innerText = "City: " + city;

        let zipcodeValue = document.createElement("p");
        zipcodeValue.innerText = "Zipcode: " + zipcode;

        let { lat, lng } = geo
        let geoBlock = document.createElement("div");
        geoBlock.innerHTML = `\t&#9788; Lat: ${lat}<br>\t&#9788; lng: ${lng}`;

        addressContainer.append(addressBlockTitle, streetValue, suiteValue, cityValue, zipcodeValue, geoBlock);

        // ------------------------ Additional Information ----------------------------
        let additionalInfoBlock = document.createElement("div");
        additionalInfoBlock.className = "additional-info-block";

        let additionalInfoBlockTitle = document.createElement("h2")
        additionalInfoBlockTitle.innerText = "Additional Info";

        let websiteValue = document.createElement("p");
        websiteValue.innerText = "Website: " + website;

        let { name : companyName, catchPhrase, bs } = company
        let companyInfoBlock = document.createElement("div");
        companyInfoBlock.innerHTML = `Company name: ${ companyName }<br>Catch Phrase: ${catchPhrase}<br>BS: ${bs}`;

        additionalInfoBlock.append(additionalInfoBlockTitle, websiteValue, companyInfoBlock)

        userContainer.append(mainInfoBlock, addressContainer, additionalInfoBlock);
        document.body.appendChild(userContainer);

        let postsButton = document.createElement('button');
        postsButton.className = "posts-button";
        postsButton.innerText = "Posts of current user";
        postsButton.onclick = (() => displayPosts())
        document.body.appendChild(postsButton);
    })

function displayPosts() {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
            .then(res => res.json())
            .then(data => {

                    // -------------------------- Main container for posts -----------------------------
                    let postsContainer = document.createElement("div");
                    postsContainer.className = "posts-container";

                    for(let item of data) {
                        let {id, title} = item;

                        // ------------------------ Post card ----------------------------
                        let postCard = document.createElement("div");
                        postCard.className = "post-card";

                        let titleValue = document.createElement("p");
                        titleValue.innerText = title;

                        let postDetailsLink = document.createElement("a");
                        postDetailsLink.className = "post-details-link";
                        postDetailsLink.innerText = "Details";
                        postDetailsLink.href = `../PostDetails/post-details.html?id=${id}`;

                        postCard.append(titleValue, postDetailsLink);
                        postsContainer.append(postCard);
                    }
                    document.body.appendChild(postsContainer);
            })
}
