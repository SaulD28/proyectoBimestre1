import Cart from "../shopcart/cart.model.js";
import Product from "../products/products.model.js";
import User from "../users/user.model.js";

export const addItemToCart = async (req, res) => {
    try {
        const { username, productName, quantity } = req.body;

        const userExists = await User.findOne({ username });
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const productExists = await Product.findOne({ name: productName });
        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        let userCart = await Cart.findOne({ user: userExists._id });
        if (!userCart) {
            userCart = new Cart({
                user: userExists._id,
                items: [],
                totalPrice: 0
            });
        }

        const itemInCart = userCart.items.find(item => item.product.toString() === productExists._id.toString());
        if (itemInCart) {
            itemInCart.quantity += quantity;
        } else {
            userCart.items.push({
                product: productExists._id,
                quantity
            });
        }
        
        userCart.totalPrice += productExists.price * quantity;

        await userCart.save();

        const populatedCart = await Cart.findById(userCart._id)
            .populate('user', 'username')
            .populate('items.product', 'name');
        res.status(201).json({
            success: true,
            message: 'Producto añadido al carrito',
            cart: populatedCart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al añadir producto al carrito',
            error: err.message
        });
    }
};

export const getUserCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const userCart = await Cart.findOne({ user: userId })
            .populate('user', 'username')
            .populate('items.product', 'name price');

        if (!userCart) {
            return res.status(404).json({
                success: false,
                message: 'Carrito no encontrado'
            });
        }
        res.status(200).json({
            success: true,
            cart: userCart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el carrito',
            error: err.message
        });
    }
};

export const removeItemFromCart = async (req, res) => {
    try {
        const { username, productName, quantity } = req.body;

        const userExists = await User.findOne({ username });
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const productExists = await Product.findOne({ name: productName });
        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        let userCart = await Cart.findOne({ user: userExists._id });
        if (!userCart) {
            return res.status(404).json({
                success: false,
                message: 'Carrito no encontrado'
            });
        }

        const itemInCart = userCart.items.find(item => item.product.toString() === productExists._id.toString());
        if (!itemInCart) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado en el carrito'
            });
        }

        if (itemInCart.quantity <= quantity) {
            userCart.items = userCart.items.filter(item => item.product.toString() !== productExists._id.toString());
        } else {
            itemInCart.quantity -= quantity;
        }

        userCart.totalPrice -= productExists.price * quantity;
        if (userCart.totalPrice < 0) userCart.totalPrice = 0;

        await userCart.save();

        const populatedCart = await Cart.findById(userCart._id)
            .populate('user', 'username')
            .populate('items.product', 'name');
        res.status(200).json({
            success: true,
            message: 'Producto eliminado del carrito',
            cart: populatedCart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar producto del carrito',
            error: err.message
        });
    }
};
