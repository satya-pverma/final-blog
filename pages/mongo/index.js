
import Realm from 'realm'
import { generateBlog} from "../../helpers/utils";





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
	<div style={{maxWidth:"400px", marginLeft:"auto",marginRight:"auto"}}  >
		
		{ 	console.log(props.post),
			props.post.map(item=>{
			
				return(
					<div >
						
						<h6>{item.title}</h6>
						<p>{item.body}</p>
						<img style={{height:"400px", width:"400px"}} src={item.pic} />
						<br/><br/>
					</div>
				)
			})
			
		}
	</div>


)
	
	
}

export default Blog;
