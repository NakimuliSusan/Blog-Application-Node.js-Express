import mongoose from "mongoose";
import Blog from "../models/Blog";
import User from "../models/User";

export const getAllBlogs = async (req, res ,next) =>{
    let blogs;
    try {
       blogs = await Blog.find();  
    } catch (error) {
        console.log(err);
    }
    if(!blogs){
        return res.status(404).json({ message:"No blogs found"});
    }
    return res.status(200).json({blogs:blogs})
}


export const addBlog = async ( req ,res , next) => {

    const { title , description , image, user }  = req.body;
    let blogExists;
    try {
      blogExists = await Blog.findOne({ title, description })
        
    } catch (error) {
       return  console.log(err)
    }
    if ( blogExists) {
        return  res.status(400) .json({ message:" blog already exists create a blog"})
    }

    let existingUser;
    try {
     existingUser = await User.findById(user)   
    } catch (error) {
      return console.log(error)  
    }

    if(!existingUser){
       return res.status(400).json({message:"unable to find user"})
    }
    
    const  blog = new Blog ({
        title, description,image,user
    })

    try {
        const session = await mongoose.startSession()
        session.startTransaction(); // defining a transcation
        await blog.save({session}); // saving the blog from this session
        existingUser.blogs.push(blog) // sending the blog to the exisiting users array
        await existingUser.save({session}) // saving the blog in this session
        await session.commitTransaction() // commiting this session

        
    } catch (error) {
       console.log(error);
       return res.status(500).json({message: error})

    }
    return res.status(201) .json({blog})
}

export const updateBlog = async(req, res , next) =>{
    
    const {title, description} = req.body;
    const blogId = req.params.id
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId , {
            title , description
        })  
    } catch (error) {
      return  console.log(error);
    }
    if(!blog){
        return res.status(500).json({message: "Unable to update blog "})
    }

    return res.status(200).json({blog})
 

}

export const getBlogId = async(req,res,next) =>{
 
    const Id =  req.params.id

    let blog;

    try {
       blog = await Blog.findById(Id);
    
    } catch (error) {
        return console.log(error)
    }

    if(!blog){
        return res.status(400).json({message:"No Blog found"})
    }
    return res.status(200).json({blog})
    
}

export const deleteBlog = async(req,res,next) =>{

    const id = req.params.id;
    // console.log(id);

    let blog;
    try {
      blog = await Blog.findByIdAndRemove(id).populate('user');

      console.log(blog)
    //   console.log(User.blog)
      await blog.user.blogs.pull(blog)
        
    } catch (error) {
       console.log(error) 
    }
    if(!blog){
        return res.status(500).json({message:"Unable to delete this blog"})
    }
    return res.status(200).json({ message:"Successfully deleted blog"})

}