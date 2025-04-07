import { getAllCategorias } from '../../data/categoria-data.js';

export async function getAllCategoriasService() {
    try {
        const categorias = await getAllCategorias();
        return {
            success: true,
            categorias: categorias
        }
    } catch (error) {
        return {
            success: false,
            error: {
                status: 500,
                message: 'Hubo un error en el servicio al obtener las categorias',
                error: error.message
            }
        }
    }
}