import express from 'express';
import { addBlog, deleteBlog, getAllBlogs, getBlogId, updateBlog } from '../controllers/Blog-controller';


const routers = express.Router();

routers.get("/getblog/:id", getBlogId) 

routers.get("/blogs", getAllBlogs)

routers.post("/createblog", addBlog)

routers.put("/updateblog/:id", updateBlog)

routers.delete("/deleteblog/:id", deleteBlog)





export default routers;
