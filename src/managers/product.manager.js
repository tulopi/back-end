import fs from "fs";

export default class ProductManager{
    constructor(path){
        this.path = path;
    }

    async createProducts(obj){
        try{
            const product = {
                id: await this.#getMaxId() + 1,
                ...obj
            }
            const productsFile = await this.getProducts();
            productsFile.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async #getMaxId(){
        let maxId = 0;
        const products = await this.getProducts();
        products.map((product) => {
            if (product.id > maxId) maxId = product.id
        });
        return maxId;
    }

    async getProducts() {
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, "utf-8");
                const productsJS = JSON.parse(products);
                return productsJS;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const productsFile = await this.getProducts();
            const product = productsFile.find((p) => p.id === id);
            return product ? product : false;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProducts(obj, id) {
        try {
            const productsFile = await this.getProducts();
            const index = productsFile.findIndex(product => product.id === id);
            if(index === -1) {
                throw new Error("Id not found");
            } else {
                productsFile[index] = { ...obj, id };
            }
            await fs.primises.writeFile(this.path, JSON.stringify(productsFile));
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProducts(id) {
        try {
            const productsFile = await this.getProducts();
            if(productsFile.lenght > 0){
                const newArray = productsFile.filter(product => product.id !== id);
                await fs.primises.writeFile(this.path, JSON.stringify(newArray));         
            } else {
                throw new Error("User not found");
            }
        } catch (error) {
            console.log(error);
        }
    }
}