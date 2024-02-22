import { useState } from "react"
import { register } from "../services/api"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Header from "./partials/Header.jsx";

export default function Register(){
const navigation=useNavigate();


    const [form,setForm]=useState({
        name:"",
        username:"",
        email:"",
        password:""

    })
    const handleInputChnage=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})

    }



    const handleSubmit = async () => {
        const result = await register(form);
        console.log(result);
      
        if (result.status === 200) {
          navigation("/login");
          toast.success("Registration successful!");
        } else if (result.status === 201) {
          const errors = result.data.data;
          if (errors && typeof errors === "object") {
            if (errors.name && errors.name.msg) {
              toast.error(errors.name.msg);
            }
            if (errors.email && errors.email.msg) {
              toast.error(errors.email.msg);
            }
            if (errors.username && errors.username.msg) {
              toast.error(errors.username.msg);
            }
            if (errors.password && errors.password.msg) {
              toast.error(errors.password.msg);
            }
      
            // Add more fields if needed
      
            // Check if any specific error messages were shown
            const anyErrorsShown = Object.values(errors).some(error => error.msg);
            if (!anyErrorsShown) {
              // If no specific error messages were shown, show a general error message
              toast.error("Validation error. Please check your inputs.");
            }
          } else if (typeof errors === "string") {
            // Handle the case where backend sends a string error message
            toast.error(errors);
          } else {
            toast.error("Validation error. Please check your inputs.");
          }
        } else {
          toast.error(result.message || "Something went wrong, please try again.");
        }
      };
      
return <>
    <Header />
    <div className="container">
        <ToastContainer/>
        <div className="row justify-content-md-center mt-4">
            <div className="col-lg-5 card border-primary mb-3">
                <div className="card-holder h4 text-center">
                    Register an Account
                </div>
                <div className="card-body">

                <div className="form-group">
                        <label className="col-form-label mt4">
                            Name
                        </label>
                        <input type="text" name="name" onChange={handleInputChnage} className="form-control" 
                        placeholder="Enter Name" />



                     </div>






                     <div className="form-group">
                        <label className="col-form-label mt4">
                            Username
                        </label>
                        <input type="text" name="username" onChange={handleInputChnage} className="form-control" 
                        placeholder="Enter Username" />



                     </div>


                     <div className="form-group">
                        <label className="col-form-label mt4">
                            Email
                        </label>
                        <input type="text" name="email" onChange={handleInputChnage} className="form-control" 
                        placeholder="Enter Email" />



                     </div>



                     <div className="form-group">
                        <label className="col-form-label mt4">
                            Password
                        </label>
                        <input type="text" name="password" onChange={handleInputChnage} className="form-control" 
                        placeholder="Enter Password" />



                     </div>




                     <div className="row justify-content-md-center form-group mt-4 ">
                        <button type="button" onClick={handleSubmit} className="col-sm-6 btn btn-outline-secondary center">Register now</button>
                     </div>




                </div>
            </div>
        </div>
    </div>


</>
}