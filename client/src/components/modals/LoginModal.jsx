import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  useForgotPasswordMutation,
  useLoginMutation,
} from "../../redux/userSlice";
import { setCredentials, toggleModal } from "../../redux/authSlice";
import { toast } from "react-toastify";
import Modal from "./Modal";

const LoginModal = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store) => store.auth);
  const [openForgot, setOpenForgot] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const [forgotPassword, { isLoading: forgotLoading }] =
    useForgotPasswordMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitHandler = async (data) => {
    let res;
    try {
      if (!openForgot) {
        res = await login(data).unwrap();
        dispatch(setCredentials(res));
      } else {
        res = await forgotPassword(data).unwrap();
      }
      setOpenForgot(false);
      dispatch(toggleModal({ register: false, login: false }));
      toast.success(res.msg);
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  const loginBody = (
    <section className="container mx-auto px-5 py-2">
      <div className="flex flex-col mb-4 w-full">
        <label htmlFor="email" className="text-[#5a7184] font-semibold block">
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
          placeholder="Enter email"
          className={`placeholder:text-[#959ead] text-dark-hard mt-1 rounded-lg px-3 py-2 font-semibold block outline-none border ${
            errors.email ? "border-red-500" : "border-[#c3cad9]"
          }`}
        />
        {errors.email?.message && (
          <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-2 w-full">
        <label
          htmlFor="password"
          className="text-[#5a7184] font-semibold block"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: {
              value: !openForgot && true,
              message: "Password is required",
            },
          })}
          placeholder="Enter password"
          className={`placeholder:text-[#959ead] text-dark-hard mt-1 rounded-lg px-3 py-2 font-semibold block outline-none border ${
            errors.password ? "border-red-500" : "border-[#c3cad9]"
          }`}
        />
        {errors.password?.message && (
          <p className="text-red-500 text-xs mt-1">
            {errors.password?.message}
          </p>
        )}
      </div>
      <button
        type="button"
        className="text-sm font-semibold text-primary"
        onClick={() => setOpenForgot(!openForgot)}
      >
        Forgot password?
      </button>
      <p className="text-sm font-semibold text-[#5a7184]">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() =>
            dispatch(toggleModal({ register: true, login: false }))
          }
          className="text-primary"
        >
          Register Now
        </button>
      </p>
      {/* <div className="inline-flex items-center justify-center w-full">
            <hr className="w-2/3 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
              OR
            </span>
          </div>
          <button
            type="button"
            className=" text-black font-bold py-2 px-5 w-full rounded-lg mb-4 border-black border-[1px]"
          >
            <FcGoogle className="absolute" size={24} /> Login With Google
          </button> */}
    </section>
  );

  const forgotBody = (
    <section className="container mx-auto px-5 py-2">
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
          placeholder="Enter Registered Email Id"
          className={`placeholder:text-[#959ead] text-dark-hard mt-1 rounded-lg px-3 py-2 font-semibold block outline-none border ${
            errors.email ? "border-red-500" : "border-[#c3cad9]"
          }`}
        />
        {errors.email?.message && (
          <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
        )}
      </div>

      <p className="text-sm font-semibold text-[#5a7184]">
        Already have an account?{" "}
        <button
          onClick={() => setOpenForgot(!openForgot)}
          className="text-primary"
        >
          Log In
        </button>
      </p>
    </section>
  );

  return (
    <div>
      <Modal
        disabled={isLoading || forgotLoading || !isValid}
        title={openForgot ? "Forgot Password" : "Login"}
        actionLabel={openForgot ? "Get Reset Password Link" : "Login"}
        onSubmit={handleSubmit(submitHandler)}
        body={openForgot ? forgotBody : loginBody}
        isOpen={isOpen.login}
        onClose={() => dispatch(toggleModal({ register: false, login: false }))}
        width="relative w-full mt-20 md:mt-2 md:w-4/6 lg:w-2/6 my-6 mx-auto h-full lg:h-auto md:h-auto"
        itemCenter="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
      />
    </div>
  );
};
export default LoginModal;
