import { verifyCategoria, verifyName, updateCategoria } from '../../data/categoria-data.js';

export async function updateCategoriaService(id, data){
    try {
        const parsedId = parseInt(id);
        if (isNaN(id)){
            return {
                success:false,
                error:{
                    status: 400,
                    message: 'Identificador no valido'
                }
            }
        }
        
        const categoriaActual = await verifyCategoria(parsedId);

        if (!categoriaActual){
            return {
                success: false,
                error:{
                    status: 404,
                    message: 'No existe categoria con este id'
                }
            }
        }

        // Data a actualizar
        const newData = {}
        if (data.nombre.trim() !== ""){
            if (data.nombre.length < 3){
                return {
                    success: false,
                    error:{
                        status: 400,
                        error: 'El nombre debe tener al menos 3 caracteres'
                    }
                }
            }
            const nombreExistente = await verifyName(data.nombre);
            if (nombreExistente){
                if(nombreExistente.id != id){
                    return {
                        success: false,
                        error:{
                            status: 400,
                            message: 'Ya existe una categoria con ese nombre'
                        }
                    }
                }
            }
            if (data.nombre !== categoriaActual.nombre){
                newData.nombre = data.nombre;
            }
        }

        if (data.descripcion.trim() !== ""){
            if (data.descripcion.length < 3){
                return {
                    success: false,
                    error:{
                        status: 400,
                        message: 'La descripcion debe tener al menos 3 caracteres'
                    }
                }
            }
            if (data.descripcion !== categoriaActual.descripcion){
                newData.descripcion = data.descripcion;
            }
        }
        
        if (Object.keys(newData).length === 0){
            return {
                success: false,
                error:{
                    status: 400,
                    message: 'No hay datos para actualizar'
                }
            }
        }
        
        // Actualizacion de categoria
        const categoriaActualizada = await updateCategoria(parsedId, newData);
        if (!categoriaActualizada){
            return {
                success: false,
                error:{
                    status: 400,
                    message: 'Error al actualizar la categoria'
                }
            }
        }

        return {
            success:true,
            categoria: categoriaActualizada
        }
    }catch(error){
        return {
            success: false,
            error: {
                status: 500,
                message: 'Hubo un error en el servicio al actualizar la categoria',
                error: error.message
            }
        }
    }
}