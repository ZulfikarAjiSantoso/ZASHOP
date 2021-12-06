import React, { useEffect, useState} from 'react'
import {FormControl, Nav, Navbar,  Form, Button, Container} from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom'
import {auth, db} from '../config/firebase'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import Icon from 'react-icons-kit'

const Navcom = ({user, totalQty}) => {

  const history = useHistory();

 
  const handleLogout=()=>{
    auth.signOut().then(()=>{
        history.push('/login');
    })
}
  return (
    <div className=''>
    <Navbar collapseOnSelect expand="lg" className="nav " variant="dark">
    <Container>
    <Navbar.Collapse   id="responsive-navbar-nav">
    <Nav className="me-auto btn btn-sm">
    <Nav.Link >
    <Link className="text-decoration-none text-dark font-weight-bold navho navv" to="/" >Home</Link>
    </Nav.Link>
    <Nav.Link  >
      <Link className=" text-decoration-none text-dark font-weight-bold navho" href='blog'>Blog</Link>
    </Nav.Link>
   
    </Nav>

        </Navbar.Collapse>
        <Navbar.Brand className='judul col-2 text-dark  ' href="#home">ZASHOP.</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className=' col-5' className=" justify-content-end" id="responsive-navbar-nav">
      <Nav className="me-auto">
   
        {user ? 
          <Nav.Link className="d-flex ">
          <Link className="btn btn-sm text-dark" to="/cart">
            <Icon icon={shoppingCart} size={20}  />
          </Link>
            <div className='d-flex justify-content-center align-items-center '   >
              <span className='cart-indicator text-center d-flex justify-content-center align-items-center rounded-pill text-dark font-weight-md' style={{width: "20px", height: "20px", backgroundColor:"rgb(255, 160, 160)"}}>{totalQty}</span>
            </div>
          <button onClick={handleLogout} className="btn btn-sm white btn-outline-dark border-darken-2 ml-2 ">Logout</button>
      </Nav.Link>
      :
            <Nav.Link >
            <Link className="btn btn-sm text-white" to="/login">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
                    </Link>
            </Nav.Link> 
        
          
         
          }
  
   
      </Nav>

      </Navbar.Collapse>
      </Container>
      </Navbar>

</div>
  )
}


export default Navcom;
