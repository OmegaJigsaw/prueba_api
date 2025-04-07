import { postProducto, verifyProductoByCod } from '../../data/producto-data.js';
import { verifyCategoria } from '../../data/categoria-data.js';

export async function postProductoService(data) {
    try {
        if (!data || Object.keys(data).length === 0) {
            return {
                success: false,
                error: {
                    status: 400,
                    message: 'No se recibieron datos para la creacion del producto'
                }
            }
        }

        // Validaciones especificas
        if (data.nombre.length < 5 || data.descripcion.length < 5){
            return {
                success: false,
                error:{
                    status: 400,
                    message: 'El nombre y la descripcion deben tener al menos 5 caracteres'
                }
            }
        }

        if (data.codigo.length < 3){
            return {
                success: false,
                error:{
                    status: 400,
                    message: 'El codigo debe tener al menos 3 caracteres'
                }
            }
        }

        const codigoRegistrado = await verifyProductoByCod(data.codigo);
        if (codigoRegistrado){
            return {
                success: false,
                error: {
                    status: 400,
                    message: 'Ya existe un producto con este codigo'
                }
            }
        }

        const parsedId = parseInt(data.categoriaId);
        if (isNaN(parsedId)){
            return {
                success: false,
                error: {
                    status: 400,
                    message: 'Identificador no valido'
                }
            }
        }

        const parsedPrecio = parseFloat(data.precio);
        if (isNaN(parsedPrecio)){
            return {
                success: false,
                error: {
                    status: 400,
                    message: 'El precio debe ser un numero'
                }
            }
        }
        const parsedStock = parseInt(data.stock);
        if (isNaN(parsedStock)){
            return {
                success: false,
                error: {
                    status:400,
                    message: 'El stock debe ser un numero entero'
                }
            }
        }

        // Validacion de existencia
        const categoria = await verifyCategoria(parsedId);
        if (!categoria){
            return {
                success: false,
                error: {
                    status: 404,
                    message: 'Categoria no encontrada'
                }
            }
        }

        const newData = {
            codigo: data.codigo,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: parsedPrecio,
            stock: parsedStock,
            categoriaId: parsedId
        }    
        
        const producto = await postProducto(newData);
        if (!producto){
            return {
                success: false,
                error: {
                    status: 400,
                    message: 'No se pudo crear el producto'
                }
            }
        }

        return {
            success: true,
            producto: producto
        }
    }catch(error){
        return{
            success: false,
            error:{
                status: 500,
                message: 'Hubo un error en el servicio de creacion de producto',
                error: error.message
            }
        }
    }
}