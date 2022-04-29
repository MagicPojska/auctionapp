import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "../utilities/authApi";
import { validatePassword } from "../utilities/helperFunctions";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      if (!validatePassword(password)) {
        return;
      }

      const formData = {
        token: token,
        password: password,
      };

      await resetPassword(formData);
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        toast.error("Password reset is not requested for this account!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      if (error.response.status === 403) {
        toast.error("Password reset is not requested for this account!", {
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
          Enter your new password.
        </p>

        <form
          onSubmit={handlePasswordReset}
          className="mt-12 font-normal text-lg leading-7 mx-24"
        >
          <div className="mb-16">
            <label>New Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              className="w-full mt-4 h-16 border-2 bg-gray-50 pl-6 font-light text-base focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Confirm password</label>
            <input
              type="password"
              placeholder="********"
              value={confirmPassword}
              className="w-full mt-4 h-16 border-2 bg-gray-50 pl-6 font-light text-base focus:outline-none"
              onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPasswordPage;
