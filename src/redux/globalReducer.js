import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name: 'global',
    initialState: { 
        cart: Number(localStorage.getItem('cart')),
        activeCart: false,
        activeNav: 0,
        labelNav: ['All', 'Clothes', 'Tech'],
        items: JSON.parse(localStorage.getItem('cartItems')) || [],
    },
    reducers: { 
        increment: (state, action) => {
            state.cart += 1;
            localStorage.setItem('cart', Number(state.cart));

            localStorage.setItem('cartItems', JSON.stringify(action.payload));
        },
        decrement: (state) => {
            if (state.cart > 0) {
                state.cart -= 1;
                localStorage.setItem('cart',  Number(state.cart));
                if (state.cart === 0) {
                    localStorage.removeItem('cart');
                }
            }
        },
        isCartActive: (state) => {
            state.activeCart = !state.activeCart;
        },
        addItem: (state, action) => {
            const { id: productId, selectedAttributes } = action.payload;

            // Generate a unique cartItemId based on productId and timestamp
            const uniqueCartItemId = `${productId}-${Date.now()}`;

            // Add the item with the new unique cartItemId
            state.items.push({ 
                ...action.payload, 
                cartItemId: uniqueCartItemId, 
                quantity: 1 
            });

            // Save the updated cart to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        updateCartItemAttributes: (state, action) => {

            const { productId, attributeId, newValueId, cartItemId } = action.payload;

            // Find the item in the Redux state
            const item = state.items.find((i) => i.id === productId);
            if (item) {
                // Update the specific attribute of the item
                const attribute = item.selectedAttributes.find((attr) => attr.id === attributeId);
                if (attribute) {
                    attribute.selectedValue = newValueId;
                } else {
                    item.selectedAttributes.push({ id: attributeId, selectedValue: newValueId });
                }
            }
        
            // Retrieve the entire cart from localStorage
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
            // Find and replace the updated item in the cartItems array
            const updatedCartItems = cartItems.map((cartItem) =>
                cartItem.id === productId ? item : cartItem
            );
        
            // Save the updated cart back to localStorage
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        
            // Also update the Redux state (if needed)
            state.items = updatedCartItems;
        },
        setActiveNav: (state, action) => {
            state.activeNav = action.payload;
        },
    }
})

export const { increment, decrement, isCartActive, addItem ,setActiveNav,updateCartItemAttributes } = globalSlice.actions;


export default globalSlice.reducer;