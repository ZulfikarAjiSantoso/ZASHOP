import React from 'react'
import { Card, Button, CardGroup} from 'react-bootstrap';


const IndivProd = ({prod, addToCart }) => {

    const cart = () => {
        addToCart(prod)
    }

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mt-5 ">
            <CardGroup>   
                   <div className=" w-100  " style={{ height:"26rem", }}>
                   <div className="text-center ">
                       <h5 className=" font-weight-bolder">{prod.title}</h5>
                        <p className="" style={{fontSize:"10px"}}>{prod.description}</p>
                        <p className=" font-weight-bolder " style={{fontSize:"13px"}}>Rp{prod.price}</p>
                    </div>
                    <div className="d-flex justify-content-end">
                        <p className="bg-dark text-light text-center " style={{width:"50px", fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}>NEW</p>
                    </div>

                    <div className="" style={{marginTop:"-55px",height:"19rem" , backgroundColor:"rgb(46, 44, 44, 0.1)"}}>
                        <Card.Img variant="top" src={prod.URL} className=" w-100" style={{ height:"17rem"}} />
                    </div>
                    
                    <div className="mt-2 d-flex justify-content-center  ">
                        <button className="addbtn"   onClick={cart}>Shop</button>
                    </div>
                   </div>
        </CardGroup>
        </div>
    )
}

export default IndivProd
