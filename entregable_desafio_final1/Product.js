class Product {

    #id;
    #title;
    #stock;
    #price;
    #code;
    #thumbnail;
    #description;
    #status
    #category


    constructor( title, description, stock, price, code, thumbnail=[], category ) {
        this.#title = title;
        this.#description = description;
        this.#stock = stock;
        this.#price = price;
        this.#code = code;
        this.#thumbnail = thumbnail;
        this.#status = true
        this.#category = category
    }



    getId() {
        return this.#id;
    }
    setId(id) {
        this.#id = id;
    }
    getTitle() {
        return this.#title;
    }
    setTitle(title) {
        this.#title = title;
    }
    getStock() {
        return this.#stock;
    }
    setStock(stock) {
        this.#stock = stock;
    }
    getPrice() {
        return this.#price;
    }
    setPrice(price) {
        this.#price = price;
    }
    getCode() {
        return this.#code;
    }
    setCode(code) {
        this.#code = code;
    }
    getThumbnail() {
        return this.#thumbnail;
    }
    setThumbnail(thumbnail) {
        this.#thumbnail = thumbnail;
    }
    getDescription() {
        return this.#description;
    }
    setDescription(description) {
        this.#description = description;
    }
    getCategory() {
        return this.#category;
    }
    setCategory() {
        this.#category = this.#category;
    }
    getStatus() {
        return this.#status;
    }
    setStatus() {
        this.#status = this.#status;
    }


    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            stock: this.#stock,
            price: this.#price,
            code: this.#code,
            thumbnail: this.#thumbnail,
            category: this.#category
        }
    }
}


module.exports = Product;