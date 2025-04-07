import { getAllCategoriasService } from '../service/categoria/get-service.js';
import { postCategoriaService } from '../service/categoria/post-service.js';
import { updateCategoriaService } from '../service/categoria/put-service.js';

export async function getAllCategoriasController(req, res) {
    try {
        const categorias = await getAllCategoriasService();
        res.status(200).json(categorias)
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error al obtener las categorias Controller',
            error: error.message
        })
    }
}

export async function postCategoriaController(req, res) {
    try{
        const data = req.body;
        if (!data.nombre || !data.descripcion){
            return res.status(400).json({
                message:'Los campos nombre y descripcion son obligatorios'
            })
        }
        const categoria = await postCategoriaService(data);
        if (!categoria.success){
            return res.status(categoria.error.status).json({
                success: categoria.success,
                error: categoria.error
            })
        }
        res.status(201).json({
            message: 'Creado exitosamente',
            success: categoria.success,
            categoria_creada: categoria.categoria 
        })
    }catch(error){
        res.status(500).json({
            message: 'Hubo un error al crear la categoria',
            error: error.message
        })
    }
}

export async function putCategoriaController(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!id){
            return res.status(404).json({
                message:'El identificador es obligatorio'
            })
        }
        
        if (!data.nombre && !data.descripcion){
            return res.status(400).json({
                message:'Debe enviar al menos un campo a actualizar'
            })
        }
        const categoria = await updateCategoriaService(id, data);
        if (!categoria.success){
            return res.status(categoria.error.status).json({
                success: categoria.success,
                error: categoria.error
            })
        }
        res.status(200).json({message: 'Actualizado Exitosamente', categoria: categoria});
    } catch (error){
        res.status(500).json({
            message: 'Hubo un error al actualizar la categoria',
            error: error.message
        })
    }
}