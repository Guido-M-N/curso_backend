class ProductModel {
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = null;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct = (ProductModel) => {
    if (!ProductModel.title) return "Falta el titulo";
    if (!ProductModel.description) return "Falta descripcion";
    if (!ProductModel.price) return "Falta el precio";
    if (!ProductModel.thumbnail) return "Falta el thumbnail";
    if (!ProductModel.code) return "Falta el codigo de identificacion";
    if (!ProductModel.stock) return "Falta el dato de stock";

    if (this.products.find((producto) => producto.code === ProductModel.code)) {
      console.log("No es posible agregar el producto, codigo ya existente");
      return;
    }

    const id = this.products.length
      ? this.products[this.products.length - 1].id + 1
      : 1;

    ProductModel.id = id;
    this.products.push(ProductModel);
  };

  getProducts() {
    return this.products;
  }

  getProductByID(id) {
    const product = this.products.find((product) => product.id == id);

    if (!product) return "Not found";
    return product;
  }
}

// Lineas para probar el codigo
/*
const manager = new ProductManager();

const product1 = new ProductModel(
  "producto de prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
const product2 = new ProductModel(
  "producto de prueba 2",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc1234",
  25
);

manager.addProduct(product1);
manager.addProduct(product2);

const gettingProducts = manager.getProducts();
const products = manager.getProductByID(2);
console.log(products);
console.log(gettingProducts);
*/
