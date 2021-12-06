import React from 'react'
import { Card, Button, CardGroup} from 'react-bootstrap';
import IndivProd from './IndivProd';
const Products = ({products, addToCart}) => {
    
  
    return products.map((prod) => (
         
             
                    <IndivProd className="" key={prod.ID}  prod={prod} addToCart={addToCart}  />

        
        )) 

       
    
}

export default Products
