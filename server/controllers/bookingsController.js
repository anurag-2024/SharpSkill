/**
 * @module	bookingController
 */

import Booking from '../models/Booking.model.js';
import { validationResult } from 'express-validator';

/**
 * Method that allows users to create booking.
 * 
 * @name	createBooking
 * @param 	{Request} req - Express request object
 * @param 	{Response} res - Express response object
 * @return	{Object} - JSON object of the new booking
 */
export const createBooking = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const User_id = req.payload.user.id;
	let { Room_id, Check_in_date, Check_out_date } = req.body;
	
	Check_in_date = new Date(Check_in_date);
	Check_out_date = new Date(Check_out_date);

	if (Check_in_date.getTime() > Check_out_date.getTime()) {
		return res.status(400).json({ message: 'Check-out date must be after check-in date'} );
	}

	try {
		const newBooking = await Booking.create({ User_id, Room_id, Check_in_date, Check_out_date });
		res.status(201).json(newBooking);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}

/**
 * Get all booking created by authentified user
 * 
 * @name 	getBookings
 * @param 	{Request} req - Express request object
 * @param 	{Response} res - Express response object
 * @return 	{Object} - JSON object of all bookings created by authentified user
 */
export const getBookings = async (req, res) => {
	const { user } = req.payload;
	try {
		const User_id = user.id;
		const bookings = await Booking.find({ User_id });
		res.status(200).json(bookings);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

/**
 * Cancel booking of the authentified user
 * 
 * @name 	cancelBooking
 * @param 	{Request} req - Express request object
 * @param 	{Response} res - Express response object
 * @return 	{Object} - JSON object of updated booking
 */
export const cancelBooking = async (req, res) => {
	const { user } = req.payload;
	const bookingId = req.params.id;

	try {
		const booking = await Booking.findById(bookingId);

		if (!booking) 
			return res.status(400).json({ message: 'Booking not found' });

		if (booking.User_id != user.id) 
			return res.status(400).json({ message: 'Cannot cancel other\'s booking' });

		booking.Booking_status = 'Cancelled';

		const updatedBooking = await booking.save();

		res.status(201).json(updatedBooking);
		
		console.log('Booking cancelled:', updatedBooking);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}
