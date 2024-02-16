import React, { useRef, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../components/ToastOptions";
import request from "../util/Api";
import { useUser } from "../context/UserContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const toastId = useRef(null);

  const handleRegisterButtonClick = () => {
    navigate("/register");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    toastId.current = toast("Loading...", {
      ...toastOptions,
      autoClose: false,
    });
    try {
      const response = await request.post("/auth/authenticate", formData);

      toast.update(toastId.current, {
        ...toastOptions,
        render: "Submit successfully",
        type: "success",
      });
      login(response.data);
      navigate("/home");
    } catch (error) {
      toast.update(toastId.current, {
        ...toastOptions,
        render: "Something happened wrong",
        type: "error",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex md:w-2/3 w-full p-4 bg-white shadow-2xl border border-gray-100 rounded-lg">
        <form
          className="flex w-full flex-col gap-4 justify-center"
          onSubmit={handleSubmit}
        >
          <h1 className={"text-xl"}>Login</h1>

          {["email", "password"].map((fieldName) => (
            <div key={fieldName}>
              <div className="mb-2 block">
                <Label htmlFor={fieldName} value={`Your ${fieldName}`} />
              </div>
              <TextInput
                id={fieldName}
                name={fieldName}
                type={fieldName === "password" ? "password" : "email"}
                placeholder={
                  fieldName === "password" ? "password" : "mail@mail.com"
                }
                value={formData[fieldName]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}

          <div className={"text-gray-700"}>
            <div>
              <>
                You do not have an account yet? Click{" "}
                <span
                  className={"text-blue-500 cursor-pointer"}
                  onClick={handleRegisterButtonClick}
                >
                  here
                </span>{" "}
                to register
              </>
            </div>
          </div>
          <Button className={"w-full"} type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
