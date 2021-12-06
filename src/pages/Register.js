import React, { useState } from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import {auth, db} from '../config/firebase'
import { Link} from 'react-router-dom'

import { FaUserAlt, FaFacebookF } from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri'
import {AiOutlineMail} from 'react-icons/ai'
import {BsGoogle} from 'react-icons/bs'
import {BsTwitter, BsInstagram} from 'react-icons/bs'
import regis from '../img/rregis.png'


const Register = ({history}) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ conpassword, setconPassword ] = useState("");
    const [errormsg, seterrormsg] = useState("");
    const [succesmsg, setsuccesmsg] = useState("")

    const reset = () => {
        setEmail('');
        setPassword('')
        setconPassword('')
   
    }
    const signup = (e) => {
        e.preventDefault(); 
        if (password !== conpassword){
            const err =  ["Password Tidak Sama"]
            seterrormsg(err)
            return;
        }
     
        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            db.collection('users').doc(credentials.user.uid).set({
             
                Email: email,
                Password: password
            }).then(()=>{
                setsuccesmsg('Sign Up Successfull. You will now automatically get redirected to Login');
               
                setEmail('');
                setPassword('');
                seterrormsg('');
                setTimeout(()=>{
                    history.push('/login');
                    setsuccesmsg('');
                },3000)
            }).catch(err=>seterrormsg(err.message))
        }).catch(err=>seterrormsg(err.message))

            // switch(err){
            //     case "auth/invalid-email":
            //     case "auth/user-disabled":
            //     case "auth/user-not-found":  
            //     seterrormsg(err.message);
            //     break;
            //     case "auth/wrong-password":
            //         setsuccesmsg(err.message);
            //         break;

            // }
       
    }   
    return (
        <div className="  containerrr" >
             <div className="row login1">
                <div className="d-none d-md-flex col-md-6  flex-column align-items-center justify-content-start   sing mt-2 ">
                                <h1 className=" font-weight-bold ">Sudah Punya Akun?</h1>
                                <p className="text-center">Daftarkan diri anda untuk menggunakan <br/> layanan kami segera</p>
                                <Link to="/login" className=" mt-4 w-25 btn btn-outline-light rounded-pill">Sign In</Link>
                                    <img src={regis} className="w-75 mt-3 mr-5" />                 
                                
                            </div>
                    <Form className=" col-md-6  d-flex flex-column justify-content-center align-items-center" >
                        <div>
                            <div className="d-flex flex-column align-items-center justify-content-center mb-3">
                                <FaUserAlt />
                                <h2 className='font-weight-bold mb-3 '>Create Account</h2>
                            </div>
                            {succesmsg&&<>
                            <div className='ale alert-success'>{succesmsg}</div>
                            <br />
                            </> }
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <div className="row spacer loginform">
                                    <div className="col-2 d-flex align-items-center justify-content-end">
                                    <AiOutlineMail />
                                    </div>
                                    <input
                                    className="form h-100"
                                    value={email}
                                    onChange= { e => setEmail(e.target.value)}
                                    type="email" placeholder="Email" 
                                    required
                                    />
                                </div>
                              

                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <div className="row spacer loginform">
                                    <div className="col-2 d-flex align-items-center justify-content-end">
                                    <RiLockPasswordFill />
                                    </div>
                                    <input
                                   className="form h-100"
                                   value={password}
                                   onChange= { e => setPassword(e.target.value)}
                                   type="password" placeholder="Password"
                                   required
                                    />
                                </div>

                            
                            </Form.Group>
                            <Form.Group className="" >
                            <div className="row spacer loginform">
                                    <div className="col-2 d-flex align-items-center justify-content-end">
                                    <RiLockPasswordFill />
                                    </div>
                                    <input
                                    className="form h-100"
                                    value={conpassword}
                                    onChange= { e => setconPassword(e.target.value)}
                                    type="password" placeholder="Confirm Password" 
                                    required
                                    />
                                </div>
                                
                            </Form.Group>
                            {errormsg&&<>
                            <p className='ale alert-danger '>{errormsg}</p>
                            <br />
                            </> }
                                <div  className=" mt-3 d-flex flex-column align-items-center justify-content-center" >
                                        <div className="d-md-none text-start text-decoration-none mb-4 lupa" to="/">Sudah punya akun?
                                            <Link className="text-decoration-none ml-1 " to="/login">Sign In</Link>
                            
                                            </div>
                                    <button onClick={signup} className="bts rounded-pill" type="submit">
                                        Sign Up
                                    </button>
                                </div>
                                                    
                           </div>                    
                        </Form>
                        

                </div>   
            </div>
        
    
    )
}

export default Register
