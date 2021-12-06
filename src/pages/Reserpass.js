// import React, {useState} from 'react'
// import {Form, Button, Alert} from 'react-bootstrap'
// import {auth} from '../config/firebase'
// import {sendPasswordResetEmail} from 'firebase/auth'
// import { useHistory } from "react-router-dom";

// const Reserpass = props => {

//     const [email, setemail] = useState('');
//     const [errors, setErrors] = useState('');
//     const history = useHistory();

//     const handlesubmit = (e) => {
//         e.preventDefault();
//             const config = {
//                 url:'http://localhost:3000/login'
//             }
//             sendPasswordResetEmail(auth, email, config)
//             .then(() => {
//                 history.push('/login')
//             })
//             .catch(() => {
//                 console.log('Email Tidak Ditemukan')
//             })

       
//     }
    
//     return (
//         <div className="  w-100 bava justify-content-center d-flex align-items-center" >
//             <Form  className="shadow  rounded-left col-md-5 h-75 py-5  log"  >
//             <h1>Email</h1>
//             <Form.Group className="" >
//                         <Form.Control 
//                          className="b"
//                          value={email}
//                          onChange= { e => setemail(e.target.value)}
//                          type="email" placeholder="Email" />
//                     </Form.Group>
//                     <button className=" d-flex flex-column align-items-center justify-content-center font-weight-bold btn-md rounded-pill btn-dark  bts " onClick={handlesubmit}  type="submit">
//                       Reset
//                     </button>
//             </Form>
//         </div>
//     )
// }

// export default Reserpass
