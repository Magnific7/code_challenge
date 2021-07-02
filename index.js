const app = document.getElementById("container");
console.log("works")
const container = document.getElementById("container")
// const btn = document.getElementById("seePost")


var request = new XMLHttpRequest();

request.open("GET", "https://jsonplaceholder.typicode.com/users", true);
request.onload = function () {
    // Accessing of data
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach((user) => {
            const card = document.createElement('div');
            card.setAttribute("class", "card");

            const h1 = document.createElement("h1");
            h1.textContent = user.name;

            const p = document.createElement("p")
            p.textContent = `${user.email}` ;


            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(p);
            card.appendChild(btn)
        });
    
    } else {
        const errorMessage = document.createElement("error");
        errorMessage.textContent = `Oops something went wrong`;
        app.appendChild(errorMessage)
    }
};
request.send();
