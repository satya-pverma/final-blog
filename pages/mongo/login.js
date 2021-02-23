import React, { useState } from 'react'
import Router, { withRouter } from 'next/router'
import M from '../../helpers/material'
import Navbar from './Navbar'
import firebase from '../../helpers/firebase'


const login = () => {

  
    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    const[show,setShow]=useState(false)
    const[mob,setMob]=useState()
    const[logb,setLogb]=useState(true)



    const setUpRecaptha=()=>{
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptha-container', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              handleLogin();
            }
          });
    }


    const handleLogin=(event)=>{
        event.preventDefault()
        setUpRecaptha()
        const phoneNumber = mob;
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              const code = window.prompt("Enter OTP");
                confirmationResult.confirm(code).then((result) => {
               
                const user = result.user;
                console.log("User is Signed In")
                if(user){
                localStorage.setItem("mob",user.phoneNumber)
                localStorage.setItem("useractive",true)
                Router.push({pathname:"/mongo"})
            }
                Router.push({pathname:"/mongo"})
               console.log(user)
               console.log(user.phoneNumber)
                }).catch((error) => {
               console.log("bad verication code"+error)
                });
                            // ...
            }).catch((error) => {
             console.log(error)
            });

    }



    // const loginuser=()=>{
    //     fetch('/api/login',{
    //         method:"post",
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify({
    //             email,
    //             password
    //         })
    //     })
    //     .then((res)=>res.json())
    //     .then(result=>{
    //         console.log(result)
    //         localStorage.clear()
    //         localStorage.setItem("user",JSON.stringify( result))
    //         localStorage.setItem("useractive",true)
   
    //         M.toast({
    //             html: "Login successfull",
    //             classes: "#43a047 green darken-1",
    //           });
    //           Router.push({pathname:"/"})
    
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
   
     
      
    // }

    return (
        <>
        <Navbar/>

       
        <div className="mycard" >
            <div className="card auth-card">
            <h4>Login</h4>
            <hr/>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="email" />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password" />
            <br/><br/>
 
                <button className="btn" onClick={()=>loginuser()} >Login</button>
             
            
            <br/>
            <div>
            <h6 style={{cursor:"pointer"}} onClick={(e)=>setShow(!show)}>Want to login with Mobile Number??</h6>
            {
                show?
                <>
                <input value={mob} onChange={(e)=>setMob(e.target.value)} type="text" placeholder="Enter mobile no eg +919877744175"/>
                <div id="recaptha-container"></div>
                <button onClick={(e)=>handleLogin(e)} className="btn">Login</button>
                </>
                :
                <>
                </>
            }
       </div>
            <a  href="/signup">create account?</a>
            </div>
        </div>
        
			<style jsx>{`
				

			

		


		

                
  .mycard{
    margin-top: 30px;
    
  }
  .auth-card{
    padding: 20px;
    text-align: center;
    max-width: 400px;
    margin:10px auto ;
  }

				.card {
				
					flex-basis: 45%;
					padding: 1.5rem;
					
					color: inherit;
					text-decoration: none;
					border: 1px solid #eaeaea;
					border-radius: 10px;
					transition: color 0.15s ease, border-color 0.15s ease;
				}

				.card:hover,
				.card:focus,
				.card:active {
					color: #0070f3;
					border-color: #0070f3;
				}

			

			`}</style>

			<style jsx global>{`
            @import url("https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css");
				main {
					max-width: 800px;
					margin: 20px auto 0px auto;
				}
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
						Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
						sans-serif;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
        
        </>
    )
}

export default login
