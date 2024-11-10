import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItemAttributes, addItem, removeItem } from '../../redux/globalReducer';
import CartAttribute from './CartAttribute';

const CartItem = (data) => {

  const item = data['data'];
  
  const { cart } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  
  const handleAttributeChange = (attributeId, newValueId) => {
    dispatch(updateCartItemAttributes({productId: item.id, attributeId, newValueId, cartItemId: item.cartItemId}));
  }
  
  /* TODO cart
    Specific elements inside of cart overlay must have specific attributes

        - Cart item
        - Container of the cart item attribute must have attribute `data-testid='cart-item-attribute-${attribute name in kebab case}'`
        - Cart item attribute option must have attribute `data-testid='cart-item-attribute-${attribute name in kebab case}-${attribute name in kebab case}'`.
        - Selected cart item attribute option must have attribute `data-testid='cart-item-attribute-${attribute name in kebab case}-${attribute name in kebab case}-selected'`
        - Button to decrease quantity must have attribute `data-testid='cart-item-amount-decrease'`
        - Button to increase quantity must have attribute `data-testid='cart-item-amount-increase'`
        - Cart item amount indicator must have attribute `data-testid='cart-item-amount'`
        - Cart total element must have attribute `data-testid='cart-total'`
  */

  const handleAddToCart = () => {
    // Dispatch the entire item object as the payload
    dispatch(addItem(item));
  };
  const handleRemoveFromCart = () => {
    // Dispatch the entire item object as the payload
    dispatch(removeItem(item.cartItemId));
  };

  return (
    <div className='flex w-full py-4 justify-evenly raleway'>
        <div className='flex flex-col' style={{width: '45%'}}>
          <p className='p-0 m-0'>{item.name}</p>
          <small>{item.prices[0]?.currency.symbol}{(item.prices[0]?.amount * item.quantity).toFixed(2)}</small>
          <div className='flex flex-col'> 
            <div className='flex flex-col'>
            {item.attributes.map((attr) => (
              <CartAttribute
                key={attr.id}
                attribute={attr}
                selectedValue={item.selectedAttributes.find((a) => a.id === attr.id)?.selectedValue}
                onAttributeChange={handleAttributeChange}
              />
            ))}
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between' style={{width: '10%'}}>
          <button className='border rounded border-black' onClick={handleAddToCart}>
            + 
          </button>
          <p className='raleway text-center'>
            {item.quantity}
          </p>
          <button className='border rounded border-black' onClick={handleRemoveFromCart}>
            -
          </button>
        </div>
        <div style={{width: '45%'}}>
          <img src={item.gallery[0]} alt={item.name} style={{height: '125px', width: '125px', objectFit: 'cover'}}/>
        </div>
    </div>
  )
}

export default CartItem