import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc     Auth admin/set token
//route     POST /api/admin/auth
//@access   Public
const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
        generateToken(res, admin._id, true);
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    res.status(200).json({ message: "Auth User" });
});

//@desc     Register a new user
//route     POST /api/users
//@access   Public
const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const adminExist = await Admin.findOne({ email });
    if (adminExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    const admin = await Admin.create({
        name,
        email,
        password,
    });

    if (admin) {
        generateToken(res, admin._id, true);
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//@desc     Logout user
//route     POST /api/users/logout
//@access   Public
const logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie("admin", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "User logged out" });
});

//@desc      Get all users
//route      GET /api/users/profile
//access     Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// @desc     Get user details
// route     GET /api/getUser/:userId
// @access   Private
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (user) {
        const UserDetails = {
            name: user.name,
            email: user.email,
            image: user.image,
        };
        res.status(200).json(UserDetails);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc     Update user details
// route     PUT /api/update
// @access   Private
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.image = req.file?.filename || user.image;
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            image: updatedUser.image,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc     Add user 
// route     POST /api/add-user
// @access   Private
const addUser = asyncHandler(async (req,res)=>{
    const { name, email, password } = req.body;
    const image = req.file.filename;
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        image,
        password,
    });

    if (user) {
        res.status(200).send();
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
})

// @desc     Delete user 
// route     DELETE /api/update
// @access   Private
const deleteUser = asyncHandler(async(req,res)=>{
    const userId = req.params.userId
    const userInfo = await User.findByIdAndDelete(userId)
    if(userInfo){
        res.status(201).json({_id:userInfo._id})
    }else{
        res.status(400);
        throw new Error("User not found");
    }
})


export {
     
    authAdmin,
    registerAdmin,
    logoutAdmin,
    getAllUsers,
    getUser,
    updateUser,
    addUser,
    deleteUser
};
