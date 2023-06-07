import Admin from "../models/adminModel.js";
import { uploadImage, sendEmail } from "../utils/helpers.js";

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
    const categories = await Admin.find();
    res.json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};

export const adImageRequest = async (req, res) => {
  const { name, email, link } = req.body;
  try {
    if (!req.files)
      return res.status(400).json({ msg: "Please upload ad banner image" });

    let imageLink = await uploadImage(req.files.adImage.tempFilePath);

    if (!imageLink)
      return res
        .status(500)
        .json({ msg: "Image upload error, try again later." });

    const data = `Name - ${name} \n Email - ${email} \n Ad Image - ${imageLink} \n Link - ${link}`;

    const mail = await sendEmail({
      name,
      email: "exteam.epcorn@gmail.com",
      link: data,
      template: "d-fc75cd16e4eb40ff8ee09b416abea226",
    });
    if (!mail)
      return res.status(500).json({ msg: "Server error, try again later." });

    return res.json({
      msg: "Request has been submitted. Our team will be get back to you",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later." });
  }
};
