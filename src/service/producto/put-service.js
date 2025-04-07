import { verifyCategoria } from '../../data/categoria-data.js'
import { getProductoById, updateProducto, verifyProductoByCod } from '../../data/producto-data.js'


export async function putProductoService(id, data){
    try{
        const parsedId = parseInt(id);
        if (isNaN(parsedId)){
            return {
                success: false,
                error:{
                    status: 400,
                    message: 'Identificador no valido'
                }
            }
        }
        if (!data || Object.keys(data).length === 0){
            return {
                success: false,
                error:{
                    status: 400,
                    message: 'Faltan datos para la actualizacion del producto'
                }
            }
        }
        
        // Update data
        const productoActual = getProductoById(parsedId);
        if (!productoActual){
            return {
                success: false,
                error:{
                    status: 404,
                    message: 'No existe producto con este id'
                }
            }
        }

        const updateData = {}

        // Nombre
        if (data.nombre && typeof data.nombre === 'string' && data.nombre.trim() !== ''){
            if (data.nombre.length < 5 ){
                return {
                    success: false,
                    error: {
                        status: 400,
                        message: 'El nombre debe tener al menos 5 caracteres'
                    }
                }
            }
            if (data.nombre.trim() !== productoActual.nombre){
                updateData.nombre = data.nombre.trim()
            }
        }

        //Descripcion
        if (data.descripcion && typeof data.descripcion === 'string' && data.descripcion.trim() !== ''){
            if (data.descripcion.length < 5){
                return {
                    success: false,
                    error: {
                        status: 400,
                        message: 'El nombre y la descripcion deben tener al menos 5 caracteres'
                    }
                }
            }
            if (data.descripcion.trim() !== productoActual.descripcion){
                updateData.descripcion = data.descripcion.trim()
            }
        }

        // Codigo
        if (data.codigo && typeof data.codigo === 'string' && data.codigo.trim() !== ''){
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
                if(codigoRegistrado.id !== parsedId){
                    return {
                        success: false,
                        error: {
                            status: 400,
                            message: 'Ya existe un producto con este codigo'
                        }
                    }
                }     
            }else{
                updateData.codigo = data.codigo.trim()
            }
        }

        // Precio
        const parsedPrecio = parseFloat(data.precio);
        if (parsedPrecio){
            if (isNaN(parsedPrecio)){
                return {
                    success: false,
                    error: {
                        status: 400,
                        message: 'El precio debe ser un numero'
                    }
                }
            }
            if(parsedPrecio !== productoActual.precio){
                updateData.precio = parsedPrecio
            }
        }

        // Stock
        const parsedStock = parseInt(data.stock);
        if (parsedStock){
            if(isNaN(parsedStock)){
                return{
                    success: false,
                    error: {
                        status: 400,
                        message: 'El stock debe ser un numero entero'
                    }
                }
            }
            if (parsedStock !== productoActual.stock){
                updateData.stock = parsedStock
            }
        }

        // Categoria
        const parsedCategoriaId = parseInt(data.categoriaId)
        if(isNaN(parsedCategoriaId)){
            return {
                success: false,
                error:{
                    status: 400,
                    message: 'Categoria no valida'
                }
            }
        }

        const categoria = await verifyCategoria(parsedCategoriaId);
        if (!categoria){
            return {
                success: false,
                error:{
                    status: 404,
                    message: 'Categoria no encontrada'
                }
            }
        }
        if (categoria.id !== productoActual.categoriaId){
            updateData.categoriaId = categoria.id
        }

        if (Object.keys(updateData).length === 0){
            return {
                success: false,
                error:{
                    status: 400,
                    message: 'No hay datos a actualizar'
                }
            }
        }

        const productoActualizado = await updateProducto(parsedId, updateData);
        if (!productoActualizado){
            return {
                success: false,
                error: {
                    status: 400,
                    message: 'Error al crear al producto'
                }
            }
        }

        return {
            success: true,
            producto: productoActualizado
        }

    }catch(error){
        return {
            success: false,
            error:{
                status: 500,
                message: 'Hubo un error en el servicio de actualizacion de producto',
                error: error.message
            }
        }
    }
}