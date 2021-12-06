import React from 'react'
import IndivCart from '../components/IndivCart'

const CartProducts = ({cartProducts, productIncrease, productDecrease}) => {
    return cartProducts.map((cartProduct) => (
        <IndivCart key={cartProduct.ID} cartProduct={cartProduct}  
        productIncrease={productIncrease}
        productDecrease={productDecrease}
        />
    ))
}

export default CartProducts
