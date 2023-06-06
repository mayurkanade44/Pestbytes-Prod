import { Link, useSearchParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../redux/userSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { toggleModal } from "../redux/authSlice";

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const [verifyEmail, { isLoading, error }] = useVerifyEmailMutation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const verify = async () => {
    setLoading(true);
    try {
      const res = await verifyEmail({
        verificationToken: searchParams.get("token"),
        email: searchParams.get("email"),
      }).unwrap();
      toast.success(res.msg);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoading) verify();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="container mx-auto px-5 py-10 md:py-28">
      <div className="w-full mx-auto max-w-xl">
        {error ? (
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard my-9">
            <span className="text-red-700"> There was an error, </span> Please
            double check your verification link
          </h1>
        ) : (
          <>
            <h1 className="font-roboto text-4xl font-bold text-center text-dark-hard mb-4">
              <span className="text-lime-600"> Congratulations!! </span>
            </h1>
            <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-4">
              Your Account Successfully Verified.
            </h1>
            <div className="flex justify-center">
              <button
                onClick={() =>
                  dispatch(toggleModal({ register: false, login: true }))
                }
                className="bg-primary w-20  text-white font-bold mb-2 text-lg py-1 px-4 rounded-lg"
              >
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
export default VerifyAccount;
