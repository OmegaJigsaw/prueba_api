import prisma from '../utils/prisma.js';

export async function getAllCategorias() {
    const data = await prisma.categoria.findMany({
        include: {
            productos: false,
        }
    })
    return data;
}

export async function verifyName(name) {
    const categoria = await prisma.categoria.findUnique({
        where: {
            nombre: name
        }
    })
    return categoria;
}

export async function postCategoria(data){
    const categoria = await prisma.categoria.create({
        data: data
    })
    return categoria;
}

export async function verifyCategoria(id) {
    const categoria = await prisma.categoria.findUnique({
        where:{
            id: id
        }
    })
    return categoria;
}

export async function updateCategoria(id, data){
    const categoria = await prisma.categoria.update({
        where: {
            id: id
        },
        data: data
    })
    return categoria;
}