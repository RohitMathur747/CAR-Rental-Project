import User from "../models/user.js";

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
