import React from 'react'
import {AiFillInstagram} from 'react-icons/ai'
import {BsTwitter} from 'react-icons/bs'
import {FaFacebookF} from 'react-icons/fa'
import {MdEmail} from 'react-icons/md'
import {BsPinterest} from 'react-icons/bs'

const Afoote = () => {
    return (
       <div className="container  d-flex flex-column justify-content-center mt-lg-3 " style={{height:"25rem" , marginTop:"90px"}}>
         <div className="row ">
            <div className="col-md-6 col-12">
                <h1 className="font-weight-bold"> <span className="">ZA</span>SHOP </h1>
                <p className=""> Jl.Tritura No.421 Makale, Tana Toraja, Sulawesi Selatan, <span className="font-weight-bold"> <br/>Indonesia</span> </p>
                <p>(+62)82342859603</p>  
                <div className=" d-flex">
                    <a className=" text-decoration-none text-dark">
                        <AiFillInstagram />
                    </a>
                    <a className="ml-3 text-decoration-none text-dark">
                        <FaFacebookF />
                    </a>
                    <a className="ml-3 text-decoration-none text-dark">
                        <BsTwitter />
                    </a>
                    <a className="ml-3 text-decoration-none text-dark">
                        <MdEmail />
                    </a>
                    <a className="ml-3 text-decoration-none text-dark">
                     <BsPinterest />
                    </a>           
                </div>                           
            </div>
          
            <div className="col-md-3 col-12">
                <h2 className="font-weight-bold">Account</h2>
                    <a className=" text-decoration-none text-dark">
                        <h6 className="mt-4">Wishlist</h6>
                    </a>
                    <a className=" text-decoration-none text-dark">
                        <h6 className="mt-3">MyAccount</h6>
                    </a>
                    <a className=" text-decoration-none text-dark">
                        <h6 className="mt-3">Checkout</h6>
                    </a>
                    <a className=" text-decoration-none text-dark">
                        <h6 className="mt-3">Cart</h6>
                    </a>              
            </div>
            <div className="col-md-3 col-12">
                <h2 className="font-weight-bold">Services</h2>
                    <a className=" text-decoration-none text-dark">
                        <h6 className="mt-4">Shipping & Return</h6>
                    </a>
                    <a className=" text-decoration-none text-dark">
                        <h6 className="mt-3">Secure Shipping</h6>
                    </a>
                    <a className=" text-decoration-none text-dark">
                        <h6 className="mt-3">International Shipping</h6>
                    </a>
                    <a className=" text-decoration-none text-dark">
                        <h6 className="mt-3">Affiliates</h6>
                    </a>              
                              
            </div>
           
        </div>
       </div>
    )
}

export default Afoote
