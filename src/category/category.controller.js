import Category from './category.model.js';
import Product from '../products/products.model.js';


export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json({
            success: true,
            message: 'Categoría creada exitosamente',
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear la categoría',
            error: error.message
        });
    }
};


export const removeCategory = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Eliminando la categoría con ID: ${id}`);

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada"
            });
        }

        let defaultCategory = await Category.findOne({ name: "Sin Categoría" });
        if (!defaultCategory) {
            defaultCategory = new Category({ name: "Sin Categoría", description: "Productos sin una categoría específica" });
            await defaultCategory.save();
        }

        await Product.updateMany({ category: id }, { category: defaultCategory._id });
        await Category.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Categoría eliminada y productos reasignados a 'Sin Categoría'"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar la categoría",
            error: error.message
        });
    }
};


export const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "No se encontró la categoría"
            });
        }

        category.name = name;
        category.description = description;
        await category.save();

        res.status(200).json({
            success: true,
            message: "Categoría actualizada correctamente",
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar la categoría",
            error: error.message
        });
    }
};


export const fetchCategories = async (req, res) => {
    try {
        const categories = await Category.find().select("name description createdAt");
        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "No se pudieron obtener las categorías",
            error: error.message
        });
    }
};
