import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { useAdImageRequestMutation } from "../../redux/adminSlice";

const AdModal = ({ onClose, open }) => {
  const [adImage, { isLoading }] = useAdImageRequestMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      photo: "",
      link: "",
    },
    mode: "onChange",
  });

  const submitHandler = async (data) => {
    const form = new FormData();

    form.set("name", data.name);
    form.set("email", data.email);
    form.set("link", data.link);
    form.append("adImage", data.photo[0]);

    try {
      const res = await adImage(form).unwrap();
      toast.success(res.msg);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const body = (
    <section className="container mx-auto px-5 py-2">
      <form action="submit">
        <div className="flex flex-col mb-4 w-full">
          <label
            htmlFor="email"
            className="text-[#5a7184] font-semibold block pl-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              minLength: {
                value: 1,
                message: "Name length must be at least 1 character",
              },
              required: {
                value: true,
                message: "Name is required",
              },
            })}
            placeholder="Enter Your Full Name"
            className={`placeholder:text-[#959ead] text-dark-hard mt-1 rounded-lg px-3 py-2 font-semibold block outline-none border ${
              errors.name ? "border-red-500" : "border-[#c3cad9]"
            }`}
          />
          {errors.name?.message && (
            <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-4 w-full">
          <label
            htmlFor="email"
            className="text-[#5a7184] font-semibold block pl-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Enter a valid email",
              },
              required: {
                value: true,
                message: "Email is required",
              },
            })}
            placeholder="Enter Your Email Id"
            className={`placeholder:text-[#959ead] text-dark-hard mt-1 rounded-lg px-3 py-2 font-semibold block outline-none border ${
              errors.email ? "border-red-500" : "border-[#c3cad9]"
            }`}
          />
          {errors.email?.message && (
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-4 w-full">
          <label
            htmlFor="email"
            className="text-[#5a7184] font-semibold block pl-1"
          >
            Ad Banner Image
          </label>
          <input
            type="file"
            accept="image/*"
            id="photo"
            {...register("photo", {
              required: {
                value: true,
                message: "Ad banner image is required",
              },
            })}
            className={`placeholder:text-[#959ead] text-dark-hard mt-1 rounded-lg px-3 py-2 font-semibold block outline-none border ${
              errors.photo ? "border-red-500" : "border-[#c3cad9]"
            }`}
          />
          {errors.photo?.message && (
            <p className="text-red-500 text-xs mt-1">{errors.photo?.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-4 w-full">
          <label
            htmlFor="email"
            className="text-[#5a7184] font-semibold block pl-1"
          >
            Link
          </label>
          <input
            type="text"
            id="link"
            {...register("link")}
            placeholder="Enter External Link"
            className={`placeholder:text-[#959ead] text-dark-hard mt-1 rounded-lg px-3 py-2 font-semibold block outline-none border ${
              errors.link ? "border-red-500" : "border-[#c3cad9]"
            }`}
          />
          {errors.link?.message && (
            <p className="text-red-500 text-xs mt-1">{errors.link?.message}</p>
          )}
        </div>
      </form>
    </section>
  );

  return (
    <div>
      <Modal
        disabled={isLoading || !isValid}
        title="Advertisement Form "
        actionLabel="Submit"
        onSubmit={handleSubmit(submitHandler)}
        body={body}
        isOpen={open}
        onClose={onClose}
        width="relative w-full mt-20 md:mt-2 md:w-4/6 lg:w-2/6 my-6 mx-auto h-full lg:h-auto md:h-auto"
        itemCenter="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
      />
    </div>
  );
};
export default AdModal;
