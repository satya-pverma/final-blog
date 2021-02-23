
import next from 'next';
import Realm from 'realm'
import { generateBlog} from "../../helpers/utils";
import Navbar from './Navbar';
import Link from 'next/link'





export async function getServerSideProps(context) {


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
// const result = await posts.insertOne({
// 	title: "hey people",
// 	pic: "pic4",
// 	body: "This is satya",
// 	postedby: "satya",
// 	realm_id:uid
		

//   });
// console.log(result)


const data=await posts.find()
.then(res=>{
	//console.log(res)
	return res
})
var post=generateBlog(data)
return {props:{post} }
}





function Blog(props) {
return(
	<>
	<Navbar/>
	<div>
		
		{ //	console.log(props.post),
			props.post.map(item=>{
			if(item.public=="true"){
				return(
                    <div className="card home-card" style={{marginTop:"30px"}}>
            
                        
                    <div className="card-img">
                   <h6> {item.title} </h6>
                <img
                  style={{
                    width: "100%",
                    height: "100%px",
                    maxHeight: "600px",
                  }}
                  src={item.pic}
                />{" "}
                <div className="card-content">
       </div>
    <div className="body">
        
    <div dangerouslySetInnerHTML={{ __html: item.body }} />

     
        
    </div>
                <br/>
                <br/>
                <div style={{marginLeft:"250px", color:"green"}}>
              
                <Link   href='posts/[titles]/[category]' as={`posts/${item.slug}/${item._id}`}>View Post</Link>
                </div>
              </div>
                
        
                </div>
			
			)}
			})
		
			
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

export default Blog;
