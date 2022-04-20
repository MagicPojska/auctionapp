import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword } from "../utilities/authApi";

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleForgotPassword = async (e) => {
    try {
      e.preventDefault();
      const response = await forgotPassword(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        toast.error("User with that email does not exist!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
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
              value={formData.email}
              className="w-full mt-4 h-16 border-2 bg-gray-50 pl-6 font-light text-base focus:outline-none"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <button
              className="w-full h-14 my-16 bg-purple text-white"
              type="submit"
            >
              RESET PASSWORD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
