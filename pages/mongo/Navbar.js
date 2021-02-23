import React, { useEffect, useState } from 'react'
import Router from 'next/router'

const Navbar= () => {
    const[user,setUser]=useState(false)
    useEffect(()=>{
          const show=async()=>{    
          var d=JSON.parse(localStorage.getItem("useractive"))
          console.log(d)
          if(d){
          setUser(true)
         
          }
         
          }
          show()
        },[])
      

        const logout=()=>{
            localStorage.clear()
          localStorage.setItem("useractive",false)
          
            Router.push({pathname:"/mongo/home"})
            window.location.reload(true)
          }

    return (
        <div>
               <div  style={{backgroundColor:"#ffff99", color:"white !important",width:"100%", height:"40px"}}>
      {
        user?
        <>
     <a   href="/mongo">Home</a>
     <a style={{marginLeft:"20px"}} href="/mongo/createpost">Create Post</a>
     <button className="right btn red" onClick={()=>logout()} style={{marginLeft:"20px"}}>Logout</button>
        </>
        :
        <>
        <a href="/mongo/home">Home</a>
         <a style={{marginLeft:"20px"}}  href="/mongo/login">Login</a>
           <a  style={{marginLeft:"20px", }} href="/mongo/signup">Signup</a> 
          
          
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
      }
            
           
         
           </div> 
        </div>
    )
}

export default Navbar
