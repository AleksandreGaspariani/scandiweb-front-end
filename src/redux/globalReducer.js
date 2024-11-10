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
        isCartActive: (state) => {
            state.activeCart = !state.activeCart;
        },
        addItem: (state, action) => {
            const { id: productId, selectedAttributes } = action.payload;

            // Generate a unique cartItemId based on productId and timestamp
            const uniqueCartItemId = `${productId}-${new Date().getTime()}`;

            // Add the item with the new unique cartItemId
            state.items.push({ 
                ...action.payload, 
                cartItemId: uniqueCartItemId, 
                quantity: 1 
            });

            // Save the updated cart to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.items));

            state.cart += 1;
            localStorage.setItem('cart', Number(state.cart));
        },
        removeItem: (state, action) => {
            // Filter out the item to be removed by its unique cartItemId

            console.log(action.payload);
            
            const updatedItems = state.items.filter(
              (item) => item.cartItemId !== action.payload
            );
      
            // Update state and localStorage
            state.items = updatedItems;
            localStorage.setItem('cartItems', JSON.stringify(state.items));

            if (state.cart > 0) {
                state.cart -= 1;
                localStorage.setItem('cart',  Number(state.cart));
                if (state.cart === 0) {
                    localStorage.removeItem('cart');
                }
            }
        },
        updateCartItemAttributes: (state, action) => {

            const { productId, attributeId, newValueId, cartItemId } = action.payload;

            // Find the item in the Redux state
            const item = state.items.find((i) => i.cartItemId === cartItemId);
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
                cartItem.cartItemId === cartItemId ? item : cartItem
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

export const { isCartActive, addItem, removeItem ,setActiveNav,updateCartItemAttributes } = globalSlice.actions;


export default globalSlice.reducer;