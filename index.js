const app = document.getElementById("container");
console.log("works");
// const container = document.getElementById("container");

var request = new XMLHttpRequest();

request.open("GET", "https://jsonplaceholder.typicode.com/users", true);
request.onload = function () {
  // Accessing of data
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach((user) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = user.name;

      const p = document.createElement("p");
      p.textContent = `${user.email}`;

      const btn = document.createElement("button");
      btn.setAttribute("type", "button");
      btn.setAttribute("class", "btn btn-primary");
      btn.setAttribute("data-toggle", "modal");
      btn.setAttribute("data-target", "#exampleModalLong");
      btn.innerHTML = "Get User’s Posts";
      btn.onclick = function () {
        // location.href = `posts.html`;
        posts = new XMLHttpRequest();
        posts.open(
          "GET",
          `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`,
          true
        );
        posts.onload = function () {
          // Begin accessing JSON data here
          var data = JSON.parse(this.response);

          if (posts.status >= 200 && posts.status < 400) {
            
              const modalFade = document.createElement("div");
              modalFade.setAttribute("class", "modal fade");
              modalFade.setAttribute("id", "exampleModalLong");
              modalFade.setAttribute("tabindex", "-1");
              modalFade.setAttribute("role", "dialog");
              modalFade.setAttribute(
                "aria-labelledby",
                "exampleModalLongTitle"
              );
              modalFade.setAttribute("aria-hidden", "true");

              container.appendChild(modalFade);

              const modalDialog = document.createElement("div");

              modalDialog.setAttribute("role", "document");
              modalDialog.setAttribute("class", "modal-dialog");

              const modalContent = document.createElement("div");
              modalContent.setAttribute("class", "modal-content");

              modalDialog.appendChild(modalContent);

              const modalHeader = document.createElement("div");
              modalHeader.setAttribute("class", "modal-header");

              modalContent.appendChild(modalHeader);

              const h4 = document.createElement("h4");
              h4.textContent = `${user.name} 's posts`;
              modalHeader.appendChild(h4);
              data.forEach((post) => {

              const modalBody = document.createElement("div");
              modalBody.setAttribute("class", "modal-body");
              modalBody.setAttribute("id", "modal-card");

              modalContent.appendChild(modalBody);

              const h6 = document.createElement("h6");
              h6.textContent = post.body;
              modalBody.appendChild(h6);
            });
              const modalFooter = document.createElement("div");
              modalFooter.setAttribute("class", "modal-footer");

              const btne = document.createElement("button");
              btne.setAttribute("type", "button");
              btne.setAttribute("class", "btn btn-secondary");
              btne.setAttribute("data-dismiss", "modal");
              btne.innerHTML = "Close";

              modalFooter.appendChild(btne);
              modalContent.appendChild(modalFooter);

              modalFade.appendChild(modalDialog);
        
          } else {
            const errorMessage = document.createElement("marquee");
            errorMessage.textContent = `Gah, it's not working!`;
            postPage.appendChild(errorMessage);
          }
        };

        posts.send();
      };

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(btn);
    });
  } else {
    const errorMessage = document.createElement("error");
    errorMessage.textContent = `Oops something went wrong`;
    app.appendChild(errorMessage);
  }
};
request.send();
