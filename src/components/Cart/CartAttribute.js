import React from 'react'

const CartAttribute = ({ attribute, selectedValue, onAttributeChange, pdp }) => {
    return (
        <div className="attribute mt-1 font-bold">
            <small style={pdp ? {fontSize: '14px'} : {fontSize: '10px'}} className='raleway'>{attribute.name}:</small>
            <div className={`attribute-options flex`}>
            {attribute.items.map((item) => (
                <button
                key={item.id}
                onClick={() => onAttributeChange(attribute.id, item.id)}
                style={{
                    backgroundColor: attribute.type === 'swatch' 
                        ? item.value 
                        : (selectedValue === item.id ? '#1D1F22' : 'white'),
                    border: '1px solid gray',
                    color: attribute.type === 'text' && selectedValue === item.id 
                        ? '#FFFFFF' 
                        : 'black',
                    padding: '4px',
                    margin: '2px',
                    cursor: 'pointer',
                    width: pdp 
                        ? (attribute.type === 'swatch' ? '30px' : '45px') 
                        : (attribute.type === 'swatch' ? '25px' : '25px'),
                    height: pdp ? '30px' : '25px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: pdp ? '12px' : '8px',
                    outline: attribute.type === 'swatch' && selectedValue === item.id 
                        ? '2px solid #22ec55' 
                        : 'none',
                    outlineOffset: attribute.type === 'swatch' && selectedValue === item.id 
                        ? '1px' 
                        : 'none',
                }}
                className='raleway'
                >
                {attribute.type === 'text' && item.value}
                </button>
            ))}
            </div>
        </div>
    );
}

export default CartAttribute