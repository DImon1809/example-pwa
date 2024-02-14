const btn = document.querySelector(".my-button");

btn.addEventListener("click", (event) =>
  requestData()
    .then((res) => res.json())
    .then((data) => console.log(data.names))
    .catch((err) => console.error(err))
    .finally(() => alert("Hello world!"))
);

const requestData = async () => fetch("http://localhost:4000/names");
