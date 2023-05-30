import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../redux/userSlice";
import { toast } from "react-toastify";

const ForgotPassword = ({ setOpen }) => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const submitHandler = async (data) => {
    try {
      const res = await forgotPassword(data).unwrap();
      toast.success(res.msg);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error?.error);
    }
  };

  return (
    <section className="container mx-auto px-5 py-10 md:py-16">
      <div className="w-full mx-auto max-w-sm">
        <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-6">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit(submitHandler)}>
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
              <p className="text-red-500 text-xs mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-white mb-2 text-lg py-1 px-5 w-full rounded-lg"
          >
            Get Reset Password Link
          </button>
        </form>
        <p className="text-sm font-semibold text-[#5a7184]">
          Already have an account?{" "}
          <button onClick={() => setOpen(false)} className="text-primary">
            Log In
          </button>
        </p>
      </div>
    </section>
  );
};
export default ForgotPassword;
