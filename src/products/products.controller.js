import Product from "../products/products.model.js";

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const newProduct = new Product({ name, description, price, stock });
        await newProduct.save();
        res.status(201).json({
            success: true,
            message: "Producto añadido con éxito",
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al añadir el producto",
            error: error.message
        });
    }
};

export const fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'No se pudieron obtener los productos',
            error: error.message
        });
    }
};


export const fetchProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el producto',
            error: error.message
        });
    }
};


export const modifyProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Producto actualizado correctamente',
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el producto',
            error: error.message
        });
    }
};


export const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Producto eliminado con éxito',
            product: deletedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el producto',
            error: error.message
        });
    }
};


export const getOutOfStockProducts = async (req, res) => {
    try {
        const outOfStock = await Product.find({ stock: 0 });
        res.status(200).json({
            success: true,
            products: outOfStock
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener productos agotados',
            error: error.message
        });
    }
};


export const getSoldProducts = async (req, res) => {
    try {
        const soldProducts = await Product.find({ sold: { $gt: 0 } });
        res.status(200).json({
            success: true,
            products: soldProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener productos vendidos',
            error: error.message
        });
    }
};
