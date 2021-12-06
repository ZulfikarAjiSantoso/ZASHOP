import React, { useEffect , useState} from 'react'
import {auth, db} from '../config/firebase'
import Products from '../components/Products';
import { useHistory } from 'react-router-dom'
import Navcom from '../components/Navcom';
import { Swiper, SwiperSlide } from "swiper/react";
import {  Button } from 'react-bootstrap';
import {FaPercentage} from 'react-icons/fa'
import {GiReturnArrow} from 'react-icons/gi'
import {Ri24HoursFill} from 'react-icons/ri'
import {FaToriiGate} from 'react-icons/fa'
import {BsArrowRightShort} from 'react-icons/bs'
import {AiFillShop} from 'react-icons/ai'
import {MdLinearScale} from 'react-icons/md'
import rumah from '../img/rumah.jpg'  
import tenun from '../img/tenun.jpg'




import 'swiper/swiper-bundle.min.css'


import SwiperCore, {
  Pagination
} from 'swiper';
import Footer from '../components/Footer';
import Afoote from '../components/Afoote';

SwiperCore.use([Pagination]);

export const Home = (props) => {
    const [pod, setpod] = useState([])
    const history = useHistory();
     
 // getting current user function
 function GetCurrentUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
      db.collection('users')
          .doc(user.uid)
          .get()
          .then((snapshot) => {
          setUser(snapshot.data());
          });
      } else {
      console.log('user is not logged in to retrive user');
      setUser(null);
      }
  });
  return () => unsubscribe && unsubscribe();
  }, []);
  return user;
}

//getting current user
const user = GetCurrentUser();
     function GetUID(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
          auth.onAuthStateChanged(user=>{
            if(user){
              setUid(user.uid);
            }
          })
        },[])
        return uid
      }

      const uid = GetUID();

    const getpod = async () => {
        const pod = await db.collection('Products').get();
        const productArray = [];  
        for (var snap of pod.docs) {
          var data = snap.data();
          data.ID = snap.id;
          productArray.push({
            ...data,
          });
          if(productArray.length === pod.docs.length){     
            setpod(productArray);
            }
          }
    };
    useEffect(() => {    
          getpod();   
    }, [])



  let Product;
  const addToCart = (product) => {   
      if(uid!== null){
        // console.log(product);
        Product = product;
        Product['qty'] = 1;
        Product['TotalProductPrice'] = Product.qty * Product.price;
        db.collection('cart ' + uid).doc(product.ID).set(Product).then(()=>{
          console.log('successfully added to cart');
        })
      }
      else{
        history.push('/login');
      }
    
  };

  // Mengambil keranjang untuk di navbar
  const [cartProducts, setCartProducts] = useState([]);
 
   useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection('cart ' + user.uid).onSnapshot((snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setCartProducts(newCartProduct);
        });
      } else {
        console.log('user is not logged in retrive cart');
      }
    });
  }, []); 

  // getting the qty from cartProducts in a separate array
  const qty = cartProducts.map((cartProduct) => {
    return cartProduct.qty;
  });

  // reducing the qty in a single value : Qty
  const reducerOfQty = (accumulator, currentValue) =>
    accumulator + currentValue;
  const totalQty = qty.reduce(reducerOfQty, 0);

  const cart = () => {
    addToCart(pod)
}
                
    return (
        <div className="">  
        <Navcom className="" user={user} totalQty={totalQty}/>
        <Swiper className="mySwiper " >
           {pod.map((podd) => (                 
            <SwiperSlide>
             <div className="d-flex justify-content-center align-items-center slidee">
                      <div className="col-6 justify-content-start d-flex align-items-center flex-column ">
                          <div>
                            <h1 className=" font-weight-bolder" style={{fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}} >Best Product</h1>
                              <div className="garis"></div>
                            <h3 className="mt-3 font-weight-normal">{podd.title}</h3>
                           <p className="justify-content-start d-flex align-items-start " style={{ fontSize:"13px"}}>Discount 30% untuk pembelian 10 produk</p>
                           <button className=" btn font-weight-bolder arr "  >Belanja Sekarang <span className="arrr"> <BsArrowRightShort /> </span> </button>
                         </div>
                     </div>
                     <div className=" col-6 d-flex  justify-content-center">
                         <img
                           className="d-block object-fit-cover "
                          src={podd.URL}
                           width="400"
                           height="400"
                         />
                   </div>
                  </div>

            </SwiperSlide>
  
              
                  
            ))} 
          </Swiper >
      
         <div className="container " id="about" style={{marginTop:"30px"}}>
            <h4 className=" text-center font-weight-bolder" >ABOUT ZASHOP</h4>
            <div className="text-center">
              <AiFillShop style={{fontSize:"50px"}}  />
            </div>
            <h6 className="text-center mt-2" style={{fontFamily: "'Shippori Antique', sans-serif"}}>HELLO!</h6>
            <div className="d-flex justify-content-center">
             <p className="text-center" style={{width:"30rem "}} >Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. A condimentum vitae sapien pellentesque habitant. Habitasse platea dictumst quisque sagittis purus sit amet. Nisl tincidunt eget nullam non nisi est sit amet facilisis. Id diam vel quam elementum pulvinar etiam non. Congue eu consequat ac felis donec et odio. Aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod. Felis donec et odio pellentesque diam volutpat commodo.</p>
            </div>

         </div>
        
          <div className="d-flex  " style={{marginTop:"2rem"}}>
            <div className="col-4 ">
                <div className=" d-flex justify-content-center">
                  <div className="d-flex align-items-center" >
                  <FaPercentage style={{fontSize:"30px"}}  />
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <h6 className="font-weight-bolder" >Discount</h6>
                    <p className="" style={{fontSize:"10px"}}>30% - 50% diskon perbulan</p>
                    
                  </div>   
              </div> 
              <div className=" d-flex justify-content-center  ">
                  <div  style={{border:"2px solid rgb(46, 44, 44, 0.7)", width:"100px"}}>

                  </div>
              </div>          
            </div>
            <div className="col-4 ">
                <div className=" d-flex justify-content-center">
                  <div className="mr-1 d-flex align-items-center" >
                  <GiReturnArrow style={{fontSize:"30px"}}  />
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                  <h6 className="font-weight-bolder" >Order</h6>
                <p className="" style={{fontSize:"10px"}}>Pengiriman ke seluruh wilayah Indonesia</p>
                    
                  </div>   
              </div> 
              <div className=" d-flex justify-content-center  ">
                  <div  style={{border:"2px solid rgb(46, 44, 44, 0.7)", width:"100px"}}>

                  </div>
              </div>          
            </div>
            <div className="col-4 ">
                <div className=" d-flex justify-content-center">
                  <div className="mr-1 d-flex align-items-center" >
                  <Ri24HoursFill style={{fontSize:"30px"}}  />
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                  <h6 className="font-weight-bolder" >24 Jam</h6>
                <p className="" style={{fontSize:"10px"}}>Kami selalu ada 24 Jam perhari</p>
                    
                  </div>   
              </div> 
              <div className=" d-flex justify-content-center  ">
                  <div  style={{border:"2px solid rgb(46, 44, 44, 0.7)", width:"100px"}}>

                  </div>
              </div>          
            </div>
          </div>        
          
          <div className=" h-100 "  style={{backgroundColor:"white", marginTop:"6rem"}} >
             <div style={{marginTop:"4rem"}} className=" py-2">
              <div className="text-center mb-5" >
                  <h1 className=' font-weight-bold' id="bagian" style={{fontFamily: "'Shippori Antique', sans-serif", marginTop:"4rem"}}>Featured Products</h1>
                    <div className="d-flex">
                        <hr width="20%" />
                          <FaToriiGate />
                        <hr width="20%" />
                    </div>
                  <p>100% Original product dari Tana Toraja</p>
              </div>
                <div className="container "> 
                {pod.length > 0 && (
                  <div className="row">
                      <Products products={pod} addToCart={addToCart} />              
                  </div>
              )}
              {pod.length < 1 && (
                <div>
                  Please Wait..
                  </div>
              )}
                </div>
               
                <div className="container " style={{marginTop: "80px"}}>
                    <h1 className=" text-center font-weight-bold " style={{fontFamily: "'Shippori Antique', sans-serif"}}>LATEST BLOG</h1>
                    <div className=" d-flex justify-content-center">
                        <MdLinearScale />
                      <MdLinearScale style={{color:"rgb(0, 0, 0, 0.3)"}} />
                    </div>
                    <div className="row d-flex justify-content-center mt-5">
                        <div className="col-md-5 col-12">
                            <div className="row d-flex justify-content-center">
                                  <div className="col-6">
                                  <img src={rumah} className="image"  width="200" height="300" />
                                  </div>
                                  <div className="col-6 d-flex flex-column mt-4">
                                    <p>03 December 2021</p>
                                    <h5 className="font-weight-bold">Tongkonan, Rumah Adat Toraja</h5>
                                    <p style={{fontSize:"15px"}}>Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicu. </p>
                                       <p className="font-weight-bold mt-5" style={{}}>Read more</p>
                               
                                  </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-12 mt-3 mt-md-0">
                            <div className="row d-flex justify-content-center">
                                  <div className="col-6">
                                  <img src={tenun} className="image"  width="200" height="300" />
                                  </div>
                                  <div className="col-6 d-flex flex-column mt-4">
                                    <p>03 December 2021</p>
                                    <h5 className="font-weight-bold">Kain Tenun, Motif Toraja</h5>
                                    <p style={{fontSize:"15px"}}>Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicu. </p>                                      
                                    <p className="font-weight-bold mt-5" style={{}}>Read more</p>
                               
                                  </div>
                            </div>
                        </div>
                       
                    </div>

                </div>  
                <div  style={{height:"20rem", backgroundImage:""}} className=" bgi d-flex  flex-column align-items-center justify-content-center mt-4" >
                      <h1 className="font-weight-bold text-center"> <span className=" text-light">SUBSCRIBE</span> TO OUR NEWSLETTER </h1>
                      <p className="text-white font-weight-bold ">Subcribe to our email newsletter update in your inbox </p>
                      <form className=" d-flex mt-3 " style={{paddingRight:"px"}}>
                          <input type="email" className=" text-decoration-none rounded-sm " placeholder="Enter your e-mail " style={{ height:"40px", marginRight:"3px"}} />
                          <button type="submit" className=" btn btn-dark font-weight-bold rounded-0" style={{height:"40px"}}>Subscribe</button>
                      </form>
                  </div>
              </div>
              
           </div>
          <Afoote />
         <Footer className="" />
        </div>
    )
        }
export default Home;

