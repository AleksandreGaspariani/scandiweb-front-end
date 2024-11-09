import React from 'react'

const CartAttribute = ({ attribute, selectedValue, onAttributeChange }) => {
    return (
        <div className="attribute">
            <small>{attribute.name}:</small>
            <div className="attribute-options flex">
            {attribute.items.map((item) => (
                <button
                key={item.id}
                onClick={() => onAttributeChange(attribute.id, item.id)}
                style={{
                    backgroundColor: attribute.type === 'swatch' ? item.value : 'white',
                    border: selectedValue === item.id ? '2px solid black' : '1px solid gray',
                    color: attribute.type === 'text' ? 'black' : 'transparent',
                    padding: '4px',
                    margin: '2px',
                    cursor: 'pointer',
                    width: attribute.type === 'swatch' ? '25px' : '25px',
                    height: '25px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: '10px',
                }}
                >
                {attribute.type === 'text' && item.value}
                </button>
            ))}
            </div>
        </div>
    );
}

export default CartAttribute