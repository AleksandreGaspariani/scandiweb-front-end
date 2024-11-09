import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItemAttributes } from '../../redux/globalReducer';
import CartAttribute from './CartAttribute';

const CartItem = (data) => {

  const item = data['data'];
  
  const { cart } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  
  const handleAttributeChange = (attributeId, newValueId) => {
    dispatch(updateCartItemAttributes({productId: item.id, attributeId, newValueId, cartItemId: item.cartItemId}));
  }
  
  return (
    <div className='flex w-full mt-4 justify-evenly raleway'>
        <div className='flex flex-col' style={{width: '45%'}}>
          <p className='p-0 m-0'>{item.name}</p>
          <small>{item.prices[0]?.currency.symbol}{item.prices[0]?.amount}</small>
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
        <div className='flex flex-col justify-evenly' style={{width: '10%'}}>
          <button className='border rounded'>
            +
          </button>
          <p className='raleway text-center'>
            {item.quantity}
          </p>
          <button className='border rounded'>
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