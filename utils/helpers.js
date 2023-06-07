import { v2 as cloudinary } from "cloudinary";
import sgMail from "@sendgrid/mail";
import fs from "fs";

export const capitalLetter = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      use_filename: true,
      folder: "pestbytes",
      quality: 50,
    });
    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const sendEmail = async ({ name, email, link, template }) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: { email: "noreply.pestbytes@gmail.com", name: "PestBytes" },
      dynamic_template_data: {
        name: name,
        link: link,
      },
      template_id: template,
    };

    return sgMail.send(msg);
  } catch (error) {
    console.log(error);
    return false;
  }
};
