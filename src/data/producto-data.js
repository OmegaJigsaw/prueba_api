import prisma from '../utils/prisma.js';

export async function getAllProductos(offset, limit) {
    const maximo = 25;
    let salto = offset;
    let restante = limit;
    let data = [];

    while (data.length < limit) {
        // objetos a tomar
        const cantidad = maximo > restante ? restante : maximo;
        const productos = await prisma.producto.findMany({
            skip: salto,
            take: cantidad
        })

        if (productos.length === 0){
            break;
        }
        // calculo de productos restantes
        restante -= productos.length
        data = [...data, ...productos]
        salto += productos.length;
    }
    return data;
}

export async function getProductoById(id) {
    const producto = await prisma.producto.findUnique({
        where: {
            id: id
        }
    })
    return producto;
}

export async function getProductosByCategoria(id) {
    const productos = await prisma.producto.findMany({
        where:{
            categoriaId: id
        }
    })
    return productos;
}

export async function verifyProductoByCod(codigo) {
    const producto = await prisma.producto.findUnique({
        where: {
            codigo: codigo
        }
    })
    return producto;
}

export async function postProducto(data) {
    const producto = await prisma.producto.create({
        data: data
    })
    return producto;
}

export async function updateProducto(id, data) {
    const producto = await prisma.producto.update({
        where: {
            id: id
        },
        data: data
    })
    return producto;
}