import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.model.js';

/**
 * Sign up
 * 
 * @name 	signup
 * @param 	{Request} req - Express request object
 * @param 	{Response} res - Express response object
 * @return	{Object} -Json object that contains token
 */
export const signup = async (req, res) => {
	
	const { userName, Email, Password, Contact_no, Is_verified } = req.body;

	try {
		let user = await User.findOne({ Email });
		if (user) {
			return res.status(400).json({ msg: 'User with the same email address already exists!' });
		}
		user = await User.findOne({ Contact_no });
		if (user) {
			return res.status(400).json({ msg: 'User with the same phone number already exists!' });
		}

		user = new User({ userName, Email, Password, Contact_no,Is_verified });

		// pwd crypt
		const salt = await bcrypt.genSalt(10);
		user.Password = await bcrypt.hash(Password, salt);

		await user.save();

		// create and send JWT token

		return res.status(201).json({ message: 'User registered successfully' });
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
}

/**
 * Login
 * 
 * @name 	login
 * @param 	{Request} req - Express request object
 * @param 	{Response} res - Express response object
 * @return	{Object} -Json object that contains token
 */
export const login = async (req, res) => {
	
	const { Email, Password } = req.body;

	try {
		let user = await User.findOne({ Email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid Email' });
		}
		
		// verify password
		const isMatch = await bcrypt.compare(Password, user.Password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid Credentials' });
		}

		const payload = { id: user._id } ;
		jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
			if (err) throw err;
			res.json({ token });
		})
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
}

export const getUser=async(req,res)=>{
	try{
		const user=await User.findById(req.user.id).select('-Password');
		if(!user){
			return res.status(404).json({message:'User not found'});
		}
		return res.status(200).json(user);
	}
	catch(err){
		return res.status(500).send({message:'Internal Server error'});
	}
}
