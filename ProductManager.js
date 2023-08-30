import {promises as fs} from "fs"


class ProductManager {
    constructor() {
        this.patch = './productos.txt'
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock,
            id: ProductManager.id
        }
        //console.log(newProduct)
        this.products.push(newProduct)
        
        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async() => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta1 = await fs.readFile(this.patch, 'utf8')
        console.log(JSON.parse(respuesta1));
    }

    getProductById = async (id) => {
        let respuesta3 = await this.readProducts()
        let buscar = respuesta3.find(product => product.id === id)
        if(!buscar){
            console.log("Producto no encontrado")
        }else{
            console.log(buscar)
        }
    }

    deleteProductsById = async(id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("el elemento fue eliminado");
    
    }

    updateProduct = async({id, ...producto}) => {
        await this.deleteProductsById(id);
        let prodOld = await this.readProducts()
        let prodModificado = [{...producto, id}, ...prodOld];
        await fs.writeFile(this.patch, JSON.stringify(prodModificado))
        console.log("Producto modificado")
    }


}



const productos = new ProductManager();

// 1- crear archivo txt y los elementos del array con los datos siguientes descomentar crear y comentar para que no interfiera 

// productos.addProduct("Rojo1", "description1", 1000, "thumbnail1", "npm1", 42);
// productos.addProduct("Azul2", "description2", 2000, "thumbnail2", "npm2", 32);
// productos.addProduct("Verde3", "description3", 3000, "thumbnail3", "npm3", 22);
// productos.addProduct("Negro4", "description4", 4000, "thumbnail4", "npm4", 12);


//2- Lee los archivos que contiene productos.txt en formato de array y los muestra 
//productos.getProducts()

//3- Conseguir - traer un objeto mediante id
//productos.getProductById(3)


//4- Eliminar un objeto mediante el id
//productos.deleteProductsById(4)

//5- Para modificar un objeto mediante el id 

// productos.updateProduct({
//     title: 'title1',
//     description: 'description1',
//     price: 10000,
//     thumbnail: 'thumbnail1',
//     code: 'hbo159',
//     stock: 32,
//     id: 1
// })
