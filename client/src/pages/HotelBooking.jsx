import React, { useState } from 'react';
import './styles/HotelBooking.scss';
import hotelImg1 from "../assets/images/hotel_img1.jpg";
import hotelImg2 from "../assets/images/hotel_img2.jpg";
import room3 from "../assets/images/room (3).jpg";
import room2 from "../assets/images/room (2).jpg";
import room1 from "../assets/images/room (1).jpg";

const HotelBooking = () => {
  const [guestDetails, setGuestDetails] = useState({
    roomType: 'deluxe',
    adults: '1',
    children: '0',
    checkin: '',
    checkout: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuestDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  return (
    <>
      <div className="booking_main">
        <div className="upper">
          <div className="img1">
            <img src={hotelImg1} alt="" />
          </div>
          <div className="img2">
            <img src={hotelImg2} alt="" />
          </div>
        </div>
        <div className="lower">
          <div className="images">
            <div className="img3"></div>
            <div className="img3">
              <img src={room1} alt="" />
            </div>
            <div className="img3">
              <img src={room2} alt="" />
            </div>
            <div className="img3">
              <img src={room3} alt="" />
            </div>
          </div>
        </div>
        <div className="booking_form">
          <div className="header">
            <h2>Experience the Luxury </h2>
            <h2>Book your stay today!</h2>
          </div>
          <div className="inputForm">
            <form>
              <label>
                Room Type:
                <select name="roomType" value={guestDetails.roomType} onChange={handleChange}>
                  <option value="deluxe">Deluxe</option>
                  <option value="family">Family Suite</option>
                </select>
              </label>
              <label>
                Adults:
                <select name="adults" value={guestDetails.adults} onChange={handleChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </label>
              <label>
                Children (below 8):
                <select name="children" value={guestDetails.children} onChange={handleChange}>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </label>
              <label>
                Check-in Date:
                <input type="date" name="checkin" value={guestDetails.checkin} onChange={handleChange} />
              </label>
              <label>
                Check-out Date:
                <input type="date" name="checkout" value={guestDetails.checkout} onChange={handleChange} />
              </label>
            </form>
          </div>
          <div className="btn">
            <button type='submit'>Proceed</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HotelBooking;
