import React, { useEffect, useState } from 'react'

import M from '../../helpers/material'
import Navbar from './Navbar'
import Router, { withRouter } from 'next/router'
import { Editor } from '@tinymce/tinymce-react';
//import Realm from 'realm'


const createpost = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
const[upload,setUpload]=useState(false)
const [userid,setUserid]=useState()
const[view,setView]=useState("")

// useEffect(()=>{
//   const getid=async()=>{
//     var id=JSON.parse(localStorage.getItem("user"))|| localStorage.getItem("mob")
//     //var {_id}=id
//     id.map(item=>{
//       //console.log(item._id)
//       setUserid(item._id)
//     })
   
//   }
//   getid()
  
// })
// //console.log(userid)



const savetodb= async() => {
 
const app = new Realm.App({ id: "realm1-ieolp" });
const credentials = Realm.Credentials.anonymous();
var uid;
try {
  const user = await app.logIn(credentials);
  console.log(user.id)
  uid=user.id
} catch(err) {
  console.error("Failed to log in", err);
}
const mongodb = app.currentUser.mongoClient("mongodb-atlas")
 const posts = mongodb.db("<dbname>").collection("posts");
const result = await posts.insertOne({
	title: title,
	pic: url,
	body: body,
	public:view,
	realm_id:uid
		

  });
console.log(result)
   
  
}


const postDetails = () => {

  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "insta-clone");
  data.append("cloud_name", "spv0075");
  fetch("	https://api.cloudinary.com/v1_1/spv0075/image/upload", {
    method: "post",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      setUrl(data.url);
      setUpload(true)
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleEditorChange = (content, editor) => {
  console.log('Content was updated:', content);
 
  setBody(content)
}
const setpublic=()=>{
  setView("true")
}
const setprivate=()=>{
  setView("false")
} 



    return (


        <>
        <Navbar/>
        <div 
        className="card input-filed"
      style={{
        margin: "70px auto",
        maxWidth: "600px",
        padding: "20px",
        textAlign: "center",
        marginTop: "200px"}}
        >

            

<input

        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br/>
      <label>Upload Post as</label>
      <button onClick={()=>setpublic()} style={{marginLeft:"10px"}} className="btn">Public</button>
      <button onClick={()=>setprivate()} style={{marginLeft:"10px"}} className="btn">Private</button>
         <br/>
         <br/>
     
      <Editor
         initialValue="<p>Description</p>"
   
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
         onEditorChange={handleEditorChange}
       />
      
      <div className="file-field input-field" placeholder="Upload Image">
        <div className="btn">
          <span>Select Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
         

      <button
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={() => 
          postDetails()
        }
      >
        
        Click to save image
      </button>
      {
        upload?
        <button className="btn" onClick={()=>savetodb()}>Upload Post</button>
        :
        <></>
      }
            
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
                              .gallary{
                                display: flex;
                                flex-wrap: wrap;
                                justify-content: space-around;
                              }
                              .item{
                                width: 30%;
                              }
                              
                              .home-card{
                                max-width: 600px;
                                height: max-content;
                                margin: 26px auto;
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

export default createpost
