import {useEffect ,useState} from 'react'
import {Form, Button } from 'react-bootstrap'

import {Link, withRouter, useHistory} from 'react-router-dom'
import {auth, db} from '../config/firebase'
import { FaUserAlt, FaFacebookF } from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri'
import {AiOutlineMail} from 'react-icons/ai'
import {BsGoogle} from 'react-icons/bs'
import {BsTwitter, BsInstagram} from 'react-icons/bs'
import tom from '../img/tom.png'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errormsg, setErrorMsg] = useState('');
    const [succesmsg, setSuccessMsg] = useState('')
    const history = useHistory();

    const resertForm = () => {
        setEmail('');
        setPassword('')
    }
    
    const loggin = (e) => {
        e.preventDefault();
         auth.signInWithEmailAndPassword(email,password).then(()=>{
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setSuccessMsg('Login Successfull.');
            setTimeout(()=>{
                history.push('/');
                setSuccessMsg('');
            },3000)
        }).catch(err=>setErrorMsg(err.message))
            auth.signInWithEmailAndPassword(email,password).then(()=>{
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setSuccessMsg('Login Successfull. ');
                setTimeout(()=>{
                    history.push('/');
                    setSuccessMsg('');
                },3000)
            }).catch(err=>setErrorMsg(err.message))
     
            // switch(err.code) {
            //     case "auth/email-already-in-use":
            //     case "auth/invalid-email":
            //         setemail(err.message)
            //         break;
            //     case "auth/weak-password":
            //         setpassError(err.message)
            //         break;

            // }
        
    }
    const goo = () => {
        // auth.signInWithPopup (provider)
        // .then(user => {
        //     console.log(user)            
        //   }).catch((error) => {
        //     console.log(error)
        //   });
    }   
    return (
        <div className=" con ">
           <div className="containerr">
           <div className="row  login1 ">            
                <Form className=" col-md-6  d-flex flex-column justify-content-center align-items-center  " >
                    <div>
                        <div className="d-flex flex-column align-items-center justify-content-center mb-3">
                                <FaUserAlt />
                                <h1 className=' font-weight-bolder judul '>Sign In</h1>
                        </div>
                        {succesmsg&&<>
                        <p className=' alert-success ale  mb-1'>{succesmsg}</p>
                        <br />
                            </> }
                        <Form.Group className="mb-1 " controlId="formBasicEmail">
                            <div className="row spacer loginform">
                                <div className=" col-2 d-flex align-items-center justify-content-end">
                                <AiOutlineMail />
                                </div>
                                <input
                                    className="  form h-100   "
                                    value={email}
                                    onChange= { e => setEmail(e.target.value)}
                                    type="email" placeholder="Enter email" 
                                    required
                                    />  
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                                <Link className='btn btn-sm d-flex justify-content-end lii' to='/resetpass'>Forgot Password</Link>
                                <div className="row spacer loginform">
                                    <div className=" col-2 d-flex align-items-center justify-content-end">
                                    <RiLockPasswordFill />
                                    </div>
                                <input 
                                className=" form h-100"
                                value={password}
                                onChange= { e => setPassword(e.target.value)}
                                type="password" placeholder="Password.." 
                                required/>
                                </div>
                        </Form.Group>
                
                        {errormsg&&<>
                        <p className=' alert-danger ale mb-1'>{errormsg}</p>
                        <br />
                        </> }
                        <div className=" d-flex flex-column align-items-center justify-content-center">
                            <div className="d-md-none text-start text-decoration-none mb-4 lupa" to="/">Belum punya akun?
                                <Link className="text-decoration-none ml-1" to="/register">Sign up</Link>
                            
                            </div>
                            <button className="bts rounded-pill " onClick={loggin}  type="submit">
                                Sign In
                            </button>
                        </div>
                        <div className="mt-4">
                            <p className="text-center font-weight-bold">Or sign with</p>
                            <div className="d-flex justify-content-center">
                                <Link to="" className="  d-flex justify-content-center align-items-center text-text-decoration-none social">
                                    <BsGoogle className=" "  />
                                </Link>
                                <Link to="/" className="d-flex justify-content-center align-items-center text-text-decoration-none social">
                                    <FaFacebookF />
                                </Link>
                                <Link to="/" className=" d-flex justify-content-center align-items-center text-text-decoration-none social">
                                    <BsInstagram />
                                </Link>
                                <Link to="/" className=" d-flex justify-content-center align-items-center text-text-decoration-none social">
                                    <BsTwitter />
                                </Link>
                            </div>
                        </div>
                    </div>
                </Form>
                <div className="d-none d-md-flex col-md-6  flex-column align-items-center justify-content-start   sing mt-3 ">
                    <h1 className=" font-weight-bold ">Belum Punya Akun?</h1>
                    <p className="text-center">Daftarkan diri anda untuk menggunakan <br/> layanan kami segera</p>
                    <Link to="/register" className=" mt-4 w-25 btn btn-outline-light rounded-pill">Sign Up</Link>
                        <img src={tom} className="w-75 mt-3 mr-5" />                 
                    
                </div>
            </div>
           </div>
        </div>
    )
}

export default Login
