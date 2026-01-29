import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //basic validation
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are important"
            });
        }

        //check if user already exists already

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({
                message: "Username or email already in use"
            });
        }   

        // create new user

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });

            res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    };
    
    export { registerUser };