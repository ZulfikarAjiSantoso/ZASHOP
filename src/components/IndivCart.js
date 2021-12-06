import React from 'react'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import Icon from 'react-icons-kit'
import {Card} from 'react-bootstrap'
import { auth, db } from '../config/firebase';

const IndivCart = ({cartProduct,productIncrease, productDecrease }) => {

    const handleProductIncrease = () => {
        productIncrease(cartProduct)
    }
    const handleProductDecrease=()=>{
        productDecrease(cartProduct);
    }

    const dell = () => {
        auth.onAuthStateChanged(user=>{
            if (user){
                db.collection('cart ' + user.uid).doc(cartProduct.ID).delete().then(()=>{
                    console.log('deleted');
                }) 
            }
        })
    }


    return (
   
    
         <div className=' col-md-4 mt-2 mt-md-0  '>
            <div className ="d-flex flex-column align-items-center justify-content-center pb-3" style={{backgroundColor:"rgba(243, 243, 243, 0.9)"}} >
                <img src={cartProduct.URL} alt="product-img w-100"  style={{ height:"20rem"}} />      
                <h5 className="font-weight-bold mt-2" >{cartProduct.title}</h5>
                <div className='product-text description mt-1'>{cartProduct.description}</div>
                <div className='product-text price mt-1'>Rp{cartProduct.price}</div>
        
                <div className='product-text quantity-box d-flex my-3' >
                    <div className='action-btns minus bg-dark text-light rounded-left' onClick={handleProductDecrease}>
                        <Icon icon={minus} size={20}/>
                    </div>                
                    <div className="   text-center" style={{width:"70px", backgroundColor:"rgb(255, 255, 255)"}}>{cartProduct.qty}</div>               
                    <div className='action-btns plus bg-dark text-light rounded-right' onClick={handleProductIncrease}>
                        <Icon icon={plus} size={20}/>
                    </div>
                </div>
                <div className='product-text cart-price font-weight-bold mb-2'>Rp{cartProduct.TotalProductPrice}.000</div>
                <div className='btn del font-weight-bold' onClick={dell} >DELETE</div>     
            </div>       
        </div>
      
    )
}

export default IndivCart
