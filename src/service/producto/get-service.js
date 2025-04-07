import { getAllProductos, getProductoById, getProductosByCategoria } from '../../data/producto-data.js';

export async function getAllProductosService(offset, limit) {
    try {
        let newOffset = parseInt(offset);
        let newLimit = parseInt(limit);

        if (isNaN(newOffset)){
            newOffset = 0;
        }
        if (isNaN(newLimit)){
            newLimit = 25;
        }

        const productos = await getAllProductos(newOffset , newLimit);
        return {
            success:true,
            productos: productos
        }
    }catch(error) {
        return {
            success: false,
            error:{
                status: 500,
                message: 'Hubo un error en el servicio de obtencion de productos',
                error: error.message
            }
        }
    }
}

export async function getProductoByIdService(id) {
    try{
        const parsedId = parseInt(id);
        if (isNaN(parsedId)){
            return {
                success: false,
                error: {
                    status: 400,
                    message: 'Identificador no valido'
                }
            }
        }
        const producto = await getProductoById(parsedId);
        if (!producto){
            return {
                success: false,
                error:{
                    status: 404,
                    message: 'Producto no encontrado'
                }
            }
        }
        
        return {
            success: true,
            producto: producto
        }
        
    }catch(error){
        return {
            success: false,
            error:{
                status:500,
                message: 'Hubo un error en el servicio de obtencion de producto por id',
                error: error.message
            }
        }
    }
}

export async function getProductosByCategoriaService(id) {
    try {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)){
            return {
                success: false,
                error: {
                    status: 400,
                    message: 'Identificador no valido'
                }
            }
        }
        const productos = await getProductosByCategoria(parsedId);
        if (!productos){
            return {
                success: false,
                error: {
                    status: 404,
                    message: 'No se encontraron productos para esta categoria'
                }
            }
        }
        return {
            success: true,
            productos: productos
        }
    }catch(error){
        return {
            success:false,
            error:{
                status: 500,
                message: 'Hubo un error en el servicio de obtencion de productos por categoria',
                error: error.message
            }
        }
    }
}