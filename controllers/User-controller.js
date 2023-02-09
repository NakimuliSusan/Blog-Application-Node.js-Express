import User from "../models/User";
import bcrypt from 'bcryptjs';


export const getAllusers = async (req, res ,next) =>{
    let users;
    try {
       users = await User.find();  
    } catch (error) {
        console.log(err);
    }
    if(!users){
        return res.status(404).json({ message:"No user found"});
    }
    return res.status(200).json({users:users})
}


export const addUser = async ( req ,res , next) => {

    const { name , email , password }  = req.body;
    let userExists;
    try {
      userExists = await User.findOne({ email })
        
    } catch (error) {
       return  console.log(err)
    }
    if ( userExists) {
        return  res.status(400) .json({ message:" user already exists login instead"})
    }
    const hashedPassword = bcrypt.hashSync(password)

    const  user = new User ({
        name, email,password:hashedPassword
    })

    try {
        await user.save();
        
    } catch (error) {
       return  console.log(error);
    }
    return res.status(201) .json({user})
}


export const loginUser  = async (req, res , next ) =>{

   const { email , password} = req.body;
   let userExists;
   try {
     userExists = await User.findOne({ email })
       
   } catch (error) {
      return  console.log(err)
   }
   if ( !userExists) {
       return  res.
       status(400) 
       .json({ message:" couldn't find user with this email"})
   }

   const isPasswordcorrect = bcrypt.compareSync(password,userExists.password)

   if(!isPasswordcorrect){
    return res.status(400).json({ message: "Invalid password"})

   }
   return res.status(200).json({ message:"login successful"})

}