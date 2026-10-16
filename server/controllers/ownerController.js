import User from "../models/user.js";
import fs from "fs";
import imagekit from "../config/imagekit.js";
import Car from "../models/car.js";

//change the role of user to owner
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" }, { new: true });
    res.json({ success: true, message: "Now you can List Cars" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api to list car
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.files;

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.filename,
      folder: "/cars",
    });

    //optimize the image using imagekit
    var optimizeImageUrl = imagekit.url({
      path: response.filePath,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      transformation: [
        { width: "1280" },
        { format: "webp" }, //convert to webp format
        { quality: "auto" }, // auto compression
      ],
    });

    const image = optimizeImageUrl;
    await Car.create({ ...car, owner: _id, image });
    res.json({ success: true, message: "Car added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Api to list owners car
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api toggle car availability

export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.params;
    const car = await Car.findById(carId);

    //checking if the car belongs to the owner
    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this car",
      });
    }

    car.isAvailable = !car.isAvailable;
    await car.save();
    res.json({
      success: true,
      message: "Car availability updated successfully",
      car,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api to delete car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.params;
    const car = await Car.findById(carId);

    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this car",
      });
    }

    car.owner = null; // Remove the owner reference
    car.isAvailable = false; // Mark the car as unavailable
    await car.save();
    res.json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
