import React, { useState } from 'react'

import Router, { withRouter } from 'next/router'
import M from '../../helpers/material'
import Navbar from './Navbar'


const signup = () => {
    const[email,setEmail]=useState()
    const[name,setName]=useState()
    const[password,setPassword]=useState()
 
    const registeruser=()=>{
        fetch('/api/signup',{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                email,
                name,
                password
            })
        
        })
        .then((res)=>res.json())
        .then(result=>{
            M.toast({
                html: " Account created successfull",
                classes: "#43a047 green darken-1",
              });
           
          Router.push({pathname:"/login"})
        })
    }


    return (
        <>
        <Navbar/>
        <div className="mycard">
           <div className=" card auth-card">
            <h4>Signup</h4>
            <hr/>
            <input placeholder="name" type="text" value={name} onChange={(e)=>setName(e.target.value)} />
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="email" />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password" />
          
            <br/><button className="btn" onClick={()=>registeruser()}>signup</button>
           
            <br/>
            <a href="/login"><p>Already have account?</p></a>
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

export default signup
