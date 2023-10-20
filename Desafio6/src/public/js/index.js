const socketClient = io();
const form = document.getElementById("addProductForm");
const inputTitle = document.getElementById("productTitle");
const inputDescription = document.getElementById("productDescription");
const inputPrice = document.getElementById("productPrice");
const inputCode = document.getElementById("productCode");
const inputStock = document.getElementById("productStock");
const table = document.getElementById("productTable");
const tableBody = document.getElementById("productTableBody");

form.onsubmit = (e) => {
  e.preventDefault();
  const product = {
    title: inputTitle.value,
    description: inputDescription.value,
    price: inputPrice.value,
    code: inputCode.value,
    stock: inputStock.value
  };
  socketClient.emit("createProduct", product);
};

socketClient.on("productCreated", (product) => {
  const { id, title, description, price, code, stock } = product;
  const row = `
    <tr>
    <td>${id}</td>
            <td>${title}</td>
            <td>${description}</td>
            <td>${price}</td>
            <td>${code}</td>
            <td>${stock}</td>
        </tr>`;
  table.innerHTML += row;
});

socketClient.on("getProducts", (products) => {
  const rows = products.map((product) => {
    const { id, title, description, price, code, stock } = product;
    return `
            <tr>
                <td>${id}</td>
                <td>${title}</td>
                <td>${description}</td>
                <td>${price}</td>
                <td>${code}</td>
                <td>${stock}</td>
            </tr>`;
  });
  table.innerHTML += rows.join("");
});
