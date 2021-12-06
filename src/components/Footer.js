import React from 'react'
import {FaCcPaypal} from 'react-icons/fa'
import {RiVisaFill} from 'react-icons/ri'
import {FaCcDiscover, FaCcMastercard} from 'react-icons/fa'

const Footer = props => {
    return (
        <footer className="bg-dark  mt-md-0" style={{marginTop:"90px"}}>
            <div className=" container d-flex justify-content-between ">
                <div className=" d-flex align-items-center text-light">
                    <div className="mt-1">&copy; 2021 <span className=" font-weight-bold">ZASHOP</span>  | by Zulfikar Aji S</div>
                </div>
                <div className=" d-flex align-items-center text-light">
                        <FaCcPaypal style={{fontSize:"30px", marginRight:"6px"}} />
                        <RiVisaFill style={{fontSize:"30px", marginRight:"6px"}} />
                        <FaCcDiscover style={{fontSize:"30px", marginRight:"6px"}} />
                        <FaCcMastercard style={{fontSize:"30px", marginRight:"6px"}} />               
                </div>
            </div>
        </footer>
    )
}

export default Footer
