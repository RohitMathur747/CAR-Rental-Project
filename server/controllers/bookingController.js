import Booking from "../models/Booking.js";
import Car from "../models/car.js";

//Function to get all the bookings for a specific owner

const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car: car._id,
    pickupDate: { $lt: returnDate },
    returnDate: { $gt: pickupDate },
  });
  return bookings.length === 0;
};

//Api to check availability of a car for a specific date range
export const checkCarAvailability = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;
    //fetch all cars in the specified location
    const cars = await Car.find({ location: location, isAvailable: true });
    //check availability of each car for the specified date range
    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(
        car._id,
        pickupDate,
        returnDate,
      );
      return { ...car._doc, isAvailable: isAvailable };
    });

    let availableCars = await Promise.all(availableCarsPromises);
    availableCars = availableCars.filter((car) => car.isAvailable === true);
    res.json({ success: true, availableCars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//API to create a booking for a specific car
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;
    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Car is not available for the selected date range",
      });
    }

    const carData = await Car.findById(car);
    //calculate the total price for the booking
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noofDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = noofDays * carData.price_per_day;

    await Booking.create({
      car,
      user: _id,
      owner: carData.owner,
      pickupDate,
      returnDate,
      price,
    });
    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//list of bookings user
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = (await Booking.find({ user: _id }).populate("car")).sort({
      createdAt: -1,
    });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Api to get owner Bookings
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }
    const bookings = await Booking.find({ owner: req.user._id })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });
    re.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
