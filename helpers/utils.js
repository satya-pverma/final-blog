function generatePosts(data) {
	return data && data.documents
		? data.documents.map((post) => {
				return {
					pid: post.name.split("/").pop(),
					title: post.fields.title.stringValue,
					blurb: post.fields.blurb.stringValue,
				};
		  })
		: [];
}

function generateBlog(data) {
	//console.log(data)
	return data?
		data.map((post) => {
				return {
					title: post.title,
					body: post.body,
					pic: post.pic,
					//id:post._id.ObjectId,
					slug:post.slug,
					public:post.public,
					snippet:post.snippet
				};
		  })
		: [];
}

export { generatePosts, generateBlog };
