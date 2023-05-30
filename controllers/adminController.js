import Admin from "../models/adminModel.js";

export const addCategory = async (req, res) => {
  try {
    const category = await Admin.create(req.body);

    res.status(201).json({ msg: `${category.category} added successfully` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const allCategories = async (req, res) => {
  try {
    let categories = await Admin.find();

    res.json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};
