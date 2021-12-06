
import {useState} from 'react'
import { Form , Button } from 'react-bootstrap'
import { db, auth, storage} from "../config/firebase"
// import { collection, setDoc, doc } from "firebase/firestore";
import { useHistory } from 'react-router-dom'
// import { ref, uploadString,uploadBytes , getDownloadURL, getStorage , uploadBytesResumable} from "firebase/storage";

const Add = () => {
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [image, setimage] = useState(null)

    const [imgerror, setImgerror] = useState("")
    const [uploaderr, setuploaderr] = useState("");
    const [successmsg, setsuccessmsg] = useState("")
    const history = useHistory();

    const setset =()=>{
        setTitle('')
        setDescription('')
        setPrice('')
        setImgerror('')
        setuploaderr('')
    }


    const add = async (e) => {
   
           e.preventDefault()
           const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
           uploadTask.on('state_changed',snapshot=>{
               const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               console.log(progress);
           },err=>setuploaderr(err.message),
           ()=>{
               storage.ref('product-images').child(image.name).getDownloadURL().then(URL=>{
                   db.collection('Products').add({
                       title,
                       description,
                       price,
                    //    price: Number(price),
                       URL
                   }).then(()=>{                    
                    setsuccessmsg('Product added successfully');
                       setset()                
                       setTimeout(()=>{
                        setsuccessmsg('');
                       },3000)
                   })
                   .catch(err=>setuploaderr(err.message))
               })
           }) 

      };
     

    const type = ['image/jpg', 'image/jpeg','image/png','image/PNG']
    const handleproductimg = (e) => {
        let selectedfile = e.target.files[0]
        if(selectedfile){
            if(selectedfile&&type.includes(selectedfile.type)){
                setimage(selectedfile)
                setImgerror('')
            }else{
                setimage(null);
                setImgerror('Please select a valid image file type (png or jpg)')
            }
        }
                else{
            console.log('select your file');
        }
    }
    
    
    return (
        <div className="container h-100 d-flex flex-column">
            <h1>Tambah data </h1>
            {successmsg &&<>
                    <div className=' alert-success'> {successmsg}</div>
                </>}
            <Form className="w-50 d-flex flex-column justify-content-center  ">
                <Form.Group className="mb-3">
                    <Form.Label>Product Title</Form.Label>
                    <Form.Control value={title} onChange={(e) => {setTitle(e.target.value)}} type="text" placeholder="Masukkan Nama.." />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control value={description} onChange={(e) => {setDescription(e.target.value)}} type="text" placeholder="Masukkan Nama.." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Price</Form.Label>
                    <Form.Control value={price} onChange={(e) => {setPrice(e.target.value)}} type="number" placeholder="Masukkan Email..." />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Image</Form.Label>
                    <Form.Control  id="file" onChange={handleproductimg}  type="file" />
                </Form.Group>
                {imgerror && <>
                    <div className=' alert-danger'> {imgerror}</div>
                </>}
                <Button onClick={add}  variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
                {uploaderr && <>
                    <div className=' alert-success'> {uploaderr}</div>
                </>
                
                }
        </div>
    )
}

export default Add
