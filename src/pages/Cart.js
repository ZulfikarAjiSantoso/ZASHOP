import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import Navcom from '../components/Navcom'
import { auth, db } from '../config/firebase';
import CartProducts from './CartProducts';
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modall from './Modall';
import {FaOpencart} from "react-icons/fa"


toast.configure()
const Cart = () => {

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
      const user = GetCurrentUser();

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


      // GLOBAL VAR
      let Product;

       const productIncrease = (cartProduct) => {
        Product = cartProduct;
        Product.qty = Product.qty + 1;
        Product.TotalProductPrice = Product.qty * Product.price; 
        
        auth.onAuthStateChanged((user) => {
          if (user) {
            db.collection('cart ' + user.uid)
              .doc(cartProduct.ID)
              .update(Product)
              .then(() => {
                console.log('increment added');
              });
          } else {
            console.log('user is not logged in to increment');
          }
        });
      }
      
      const productDecrease = (cartProduct) => {
        Product = cartProduct;
        if (Product.qty > 1) {
          Product.qty = Product.qty - 1;
          Product.TotalProductPrice = Product.qty * Product.price;
        }   
        //updating in database
        auth.onAuthStateChanged((user) => {
          if (user) {
            db.collection('cart ' + user.uid)
              .doc(cartProduct.ID)
              .update(Product)
              .then(() => {
                console.log('decrement');
              });
          } else {
            console.log('user is not logged in to increment');
          }
        });
      };


       // getting the qty from cartProducts in a separate array
  const qty = cartProducts.map((cartProduct) => {
    return cartProduct.qty;

  });
  // console.log(qty)


   // reducing the qty in a single value : Qty
   const reducerOfQty = (accumulator, currentValue) =>
   accumulator + currentValue;
 const totalQty = qty.reduce(reducerOfQty, 0);
//  console.log( totalQty);



   // getting the prices from cartProducts in a separate array
   const totalPrice = cartProducts.map((cartProduct) => {
    return cartProduct.TotalProductPrice;
  });

  // reducing the price in a single value : TotalPrice
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const TotalPrice = totalPrice.reduce(reducer, 0);
  // console.log('TotalPrice:' + TotalPrice); 



   // mengambil total Product untuk notifikasi
  const [totalProducts, setTotalProducts] = useState(0);
  useEffect(() => {
    auth.onAuthStateChanged(user=>{ 
      if(user){
        db.collection('cart' + user.uid).onSnapshot(snapshot=>{
          const qty = snapshot.docs.length;
          setTotalProducts(qty)
        })
      }  
    }) 
   }, [])
  

  //  payment bayar 
  const history = useHistory()
  const handleToken = async (token) => {
    console.log(token);
    const cart = { name: 'All products', TotalPrice };
    const response = await axios.post('http://localhost:8080/checkout', {
      cart,
      token,
    });   

    let { status } = response.data;

    if (status === 'success') {
      history.push('/');
      toast.success('Your order has been placed successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      const uid = auth.currentUser.uid;
      const carts = await db.collection('cart ' + uid).get();

      for (var snap of carts.docs) {
      db.collection('cart ' + uid)
          .doc(snap.id)
          .delete();
      }
    } else {
      alert('something went wrong in checkout. Please try again');
    }
  };

  
  // Mengambil keranjang untuk di navbar
  const [cartProduct, setCartProduct] = useState([]);
 
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
  const qq = cartProducts.map((cartProduct) => {
    return cartProduct.qty;
  });

  // reducing the qty in a single value : Qty
  const educerOfQty = (accumulator, currentValue) =>
    accumulator + currentValue;
  const otalQty = qq.reduce(educerOfQty, 0);


  // COD show modal
  const [showModal, setShowModal]=useState(false);

  const triggerModal = () => {
    setShowModal(true)
  }
  const hideModal=()=>{
    setShowModal(false);
  }


    return ( 
        <>
            <Navcom user={user} totalQty={otalQty} />
                {cartProducts.length > 0 && (
                    <div className="container  ">
                        <div className=" d-flex align-items-center my-3"> 
                          <FaOpencart style={{fontSize:"30px"}} />
                          <h1 className="  font-weight-bolder ml-3">Cart</h1>                          
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className='row '>
                            <CartProducts
                            cartProducts={cartProducts}
                            productIncrease={productIncrease}
                            productDecrease={productDecrease}
                            />
                        </div>
                        <div className='mt-5' style={{ width:"20rem"}}>
                          <div className=" text-center">
                            <h5 className="font-weight-bold ">Total Harga</h5>
                            <hr />
                          </div>                       
                          <div className="d-flex justify-content-between">
                              <h6>Produk :</h6>
                               <p className="">{totalQty}</p>
                          </div>
                          <div className="d-flex justify-content-between">                        
                              <h6>Total Bayar :</h6>
                               <p className="">Rp{TotalPrice}.000</p>                         
                          </div>
                          <br/>
                          <div className="d-flex justify-content-center">
                            <StripeCheckout
                            stripeKey='pk_test_51JxnZ7IUgXLU4As3EbgcxydveBrKRed3vUboDr4LlV2lCHR2QEVDHwyidNZFPzhjsgWk9kOCI2RozaabHYHIg9hi00ILp7I4mO'
                            token={handleToken}
                            billingAddress
                            shippingAddress
                            amount={TotalPrice}
                            name='All Products'
                            >
                              </StripeCheckout> 
                          </div>
                          <p className="text-center mt-2" style={{marginBottom:"4px", fontFamily:"'Shippori Antique', sans-serif", fontSize:'13px'}}>OR</p>
                          <div className="d-flex justify-content-center pb-1">
                            <button className=' btn btn-secondary font-weight-bold btn-sm' onClick={()=>triggerModal()}>Cash on Delivery</button>
                          </div>
                       
                          </div>
                          </div>
                    </div>

                )}
                {cartProducts.length < 1 && (
                    <div>No Products to Show</div>
                    )
                }
                {showModal===true&&(
                <Modall TotalPrice={TotalPrice} totalQty={totalQty}
                  hideModal={hideModal}
                />
              )}

        </>
    )
}

export default Cart
