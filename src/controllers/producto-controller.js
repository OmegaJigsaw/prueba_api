import { getAllProductosService, getProductoByIdService, getProductosByCategoriaService } from '../service/producto/get-service.js';
import { postProductoService } from '../service/producto/post-service.js'
import { putProductoService } from '../service/producto/put-service.js'

export async function getAllProductosController(req, res){
    try {
        const { offset, limit } = req.query;
        const productos = await getAllProductosService(offset, limit);
        if (!productos.success){
            return res.status(productos.error.status).json({
                success: productos.success,
                error: productos.error
            })
        }
        res.status(200).json(productos);
    }catch (error){
        res.status(500).json({
            message: 'Error al obtener los productos',
            error: error.message
        })
    }
}

export async function getProductoByIdController(req, res) {
    try {
        const { id } = req.params;
        if (!id){
            return res.status(400).json({
                message: 'Identificador no Encontrado'
            })
        }
        const producto = await getProductoByIdService(id);
        if (!producto.success){
            return res.status(producto.error.status).json({
                success: producto.success,
                error: producto.error
            })
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el producto',
            error: error.message
        })
    }
}

export async function getProductosByCategoriaController(req, res) {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(400).json({
                message: 'Identificador no Encontrado'
            })
        }
        const productos = await getProductosByCategoriaService(id);
        if (!productos.success){
            return res.status(productos.error.status).json({
                success: productos.success,
                error: productos.error
            })
        }
        res.status(200).json(productos);
    }catch(error){
        res.status(500).json({
            message: 'Error al obtener los productos por categoria',
            error: error.message
        })
    }
}

export async function postProductoController(req, res){
    try {
        const { nombre, codigo, descripcion, categoriaId, precio, stock } = req.body;
        // Validacion de campos Vacios
        let emptyField = [];
        if(!codigo || codigo.trim() === ''){
            emptyField.push('codigo');
        }
        if(!nombre || nombre.trim() === ''){
            emptyField.push('nombre');
        }
        if(!descripcion || descripcion.trim() === ''){
            emptyField.push('descripcion');
        }
        if(!precio || precio === ''){
            emptyField.push('precio');
        }
        if(!stock || stock === ''){
            emptyField.push('stock');
        }
        if(!categoriaId || categoriaId === ''){
            emptyField.push('categoriaId');
        }

        if (emptyField.length > 0){
            return res.status(400).json({
                message: `Los siguientes campos estan vacios: ${emptyField.join(', ')}`
            })
        }

        const data = {
            nombre: nombre.trim(),
            codigo: codigo.trim(),
            descripcion: descripcion.trim(),
            categoriaId: categoriaId,
            precio: precio,
            stock: stock
        }

        const producto = await postProductoService(data);
        if (!producto.success){
            return res.status(producto.error.status).json({
                success: producto.success,
                error: producto.error
            })
        }
        res.status(201).json(producto);
    }catch (error){
        return res.status(500).json({
            message: 'Error al crear el producto',
            error: error.message
        })
    }
}

export async function putProductoController(req, res) {
    const { id } = req.params;
    const data = req.body;

    if (!id){
        return res.status(404).json({
            message: 'Identificador no encontrado'
        })
    }
    if (!data.nombre && !data.codigo && !data.descripcion && !data.categoriaId && data.stock && data.precio){
        return res.status(400).json({
            message: 'Debe enviar al menos un campo a actualizar'
        })
    }

    const productoActualizado = await putProductoService(id, data);
    if (!productoActualizado.success){
        return res.status(productoActualizado.error.status).json({
            success: productoActualizado.success,
            error: productoActualizado.error
        })
    }
    res.status(200).json({
        message: 'Actualizado correctamente', producto: productoActualizado
    })

}