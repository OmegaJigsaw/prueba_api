import { postCategoria, verifyName } from '../../data/categoria-data.js';

export async function postCategoriaService(data){
    try {
        if (data.nombre.trim() === "" || data.descripcion.trim() === "") {
            return {
                success:false,
                error:{
                    status:400, 
                    message: 'Los campos nombre y descripcion son obligatorios'
                }
            }
        }
        if (data.nombre.length < 3 || data.descripcion.length < 3){
            return {
                success: false,
                error: {
                    status: 400,
                    message: 'Los campos nombre y descripcion deben tener al menos 3 caracteres'
                }
            }
        }
        const categoriaExistente = await verifyName(data.nombre);

        if (categoriaExistente){
            return {
                success: false,
                error: {
                    status: 400,
                    message: 'Ya existe una categoria con ese nombre'
                }
            }
        }
        const categoriaCreada = await postCategoria(data);
        if (!categoriaCreada){
            return {
                success: false,
                error: {
                    status: 400,
                    message: 'Error al crear la categoria'
                }
            }
        }
        return {
            success: true,
            categoria: categoriaCreada
        }
    }catch(error){
        return {
            success: false,
            error: {
                status: 500,
                message: 'Hubo un error en el servicio al crear la categoria',
                error: error.message
            }
        }
    }
}