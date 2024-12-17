import userModel from "../DB/models/user.model.js"

export const checkEmailExsist=async(email,res)=>{
    let isExist=await userModel.findOne({ where: { email } })
    if(isExist){
        return res.status(400).json({ message: "Email already exist" })
    }

}