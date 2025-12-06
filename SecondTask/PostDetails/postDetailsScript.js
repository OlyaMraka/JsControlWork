const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => res.json())
    .then(data => {
        let postMainTitle = document.createElement("h2");
        postMainTitle.className = "main-title";
        postMainTitle.innerText = "Post";
        document.body.append(postMainTitle);

        // --------------------------- Container for post Information -----------------------------
        let postContainer = document.createElement("div");
        postContainer.className = "post-container";

        let { userId, id, title, body } = data;

        // --------------------------- Post details -------------------------------
        let userIdValue = document.createElement("h2");
        userIdValue.innerText = "User Id: " + userId;

        let postIdValue = document.createElement("p");
        postIdValue.innerText = "Post Id: " + id;

        let postTitleValue = document.createElement("h3");
        postTitleValue.innerText = "Title: " + title;

        let bodyValue = document.createElement("p");
        bodyValue.innerText = "Body: " + body;

        postContainer.append(userIdValue, postIdValue, postTitleValue, bodyValue);

        document.body.append(postContainer);
    })
    .then(() => {
        let commentMainTitle = document.createElement("h2");
        commentMainTitle.className = "main-title";
        commentMainTitle.innerText = "Comments";
        document.body.append(commentMainTitle);

        // ---------------------------- Fetching comments ---------------------------------
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(res => res.json())
            .then(data => {
                // ----------------------------- Main comment container -----------------------------
                let commentsContainer = document.createElement("div");
                commentsContainer.className = "comments-container";

                // ----------------------------- Comment cards -------------------------------
                for(let comment of data) {
                    let { postId, id, name, email, body } = comment;

                    let commentCard = document.createElement("div");
                    commentCard.className = "comment-card";

                    let postIdValue = document.createElement("h2");
                    postIdValue.innerText = "Post Id: " + postId;

                    let idValue = document.createElement("p");
                    idValue.innerText = "Comment Id: " + id;

                    let nameValue = document.createElement("p");
                    nameValue.innerText = "Name: " + name;

                    let emailValue = document.createElement("p");
                    emailValue.innerText = "Email: " + email;

                    let bodyValue = document.createElement("p");
                    bodyValue.innerText = "Body: " + body;

                    commentCard.append(postIdValue, idValue, nameValue, emailValue, bodyValue);
                    commentsContainer.appendChild(commentCard);
                }

                document.body.append(commentsContainer);
            });
    });

