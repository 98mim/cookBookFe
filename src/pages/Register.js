import React, { useRef, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import { toastOptions } from "../components/ToastOptions";
import request from "../util/Api";
function RegistrationPage() {
  const navigate = useNavigate();
  const { login } = useUser();
  const toastId = useRef(null);
  const [passwordError, setPasswordError] = useState(false);

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.passwordRepeat) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);

    toastId.current = toast("Loading...", {
      ...toastOptions,
      autoClose: false,
    });
    try {
      const response = await request.post("/auth/register", formData);
      toast.update(toastId.current, {
        ...toastOptions,
        render: "Submit successfully",
        type: "success",
      });
      navigate("/dashboard");

      login(response.data);
    } catch (error) {
      toast.update(toastId.current, {
        ...toastOptions,
        render: "Something went wrong",
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
          <h1 className={"text-xl"}>Registration</h1>

          <>
            {["name", "email"].map((fieldName) => (
              <div key={fieldName}>
                <div className="mb-2 block">
                  <Label
                    htmlFor={fieldName}
                    value={fieldName.replace("_", " ")}
                  />
                </div>
                <TextInput
                  id={fieldName}
                  name={fieldName}
                  type={fieldName === "name" ? "text" : "email"}
                  placeholder={
                    fieldName === "name" ? "JoeMorgan" : "user@beyourchef.com"
                  }
                  value={formData[fieldName]}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
          </>

          {["password", "passwordRepeat"].map((fieldName) => (
            <div key={fieldName}>
              <div className="mb-2 block">
                <Label htmlFor={fieldName} value={`Your ${fieldName}`} />
              </div>
              <TextInput
                id={fieldName}
                name={fieldName}
                type="password"
                placeholder={
                  fieldName === "password" ? "password" : "password repeat"
                }
                value={formData[fieldName]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}

          {passwordError && (
            <div className="text-red-500">Passwords do not match</div>
          )}

          <div className={"text-gray-700"}>
            <div>
              <>
                Already have an account? Click{" "}
                <span
                  className={"text-blue-500 cursor-pointer"}
                  onClick={handleLoginButtonClick}
                >
                  here
                </span>{" "}
                to login.
              </>
            </div>
          </div>
          <Button className={"w-full"} type="submit">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
