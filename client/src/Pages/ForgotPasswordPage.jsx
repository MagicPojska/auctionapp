import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword } from "../utilities/authApi";
import LoadingSpinner from "../components/LoadingSpinner";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await forgotPassword({ email: email });
      toast.success(response.data, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        toast.error("User with that email does not exist!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-[22rem] pt-10 2xl:mx-[28rem]">
      <ToastContainer />
      <div className="border-2">
        <div className="w-full h-20 flex justify-center items-center bg-gray-50">
          <h1 className="font-bold leading-tight text-2xl text-black">
            FORGOT PASSWORD
          </h1>
        </div>

        <p className="mx-24 mt-12 font-normal text-textTetriary">
          Lost your password? Please enter your username or email address. You
          will receive a link to create a new password via email.
        </p>

        <form
          onSubmit={handleForgotPassword}
          className="mt-12 font-normal text-lg leading-7 mx-24"
        >
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="user@domain.com"
              value={email}
              className="w-full mt-4 h-16 border-2 bg-gray-50 pl-6 font-light text-base focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {loading ? (
            <div className="w-full flex justify-center my-16">
              <LoadingSpinner width={"h-16 w-16"} />
            </div>
          ) : (
            <button
              className="w-full h-14 my-16 bg-purple text-white"
              type="submit"
            >
              RESET PASSWORD
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
