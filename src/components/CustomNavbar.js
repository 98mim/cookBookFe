import { Navbar, Dropdown } from "flowbite-react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { useUser } from "../context/UserContext";
import { useEffect, useRef, useState } from "react";
import CustomButton from "./CustomButton";
import CustomLanguageDropdown from "./CustomLanguageDropdown";
import request from "../util/Api";
import { toast } from "react-toastify";
import { toastOptions } from "./ToastOptions";
import { useTranslation } from "react-i18next";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the current route
  const { user, logout } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const [userData, setUserData] = useState([]);
  const toastId = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  useEffect(() => {
    if (isLoggedIn) {
      request
        .get("/api/user/me")
        .then((response) => {
          setUserData(response.data.data);
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    toastId.current = toast("Loading...", {
      ...toastOptions,
      autoClose: false,
    });
    try {
      logout();
      toast.update(toastId.current, {
        ...toastOptions,
        render: "Logged out successfully",
        type: "success",
      });
      navigate("/");
    } catch (error) {
      toast.update(toastId.current, {
        ...toastOptions,
        render: "Something went wrong",
        type: "error",
      });
      console.error(error);
    }
  };

  // Function to determine if a link is active based on the current path
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img src="/logo-pribor.jpeg" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Be Your Chef
        </span>
      </Navbar.Brand>

      {isLoggedIn ? (
        <div className="flex md:order-2">
          <CustomLanguageDropdown />
          <Dropdown
            pill
            outline
            gradientDuoTone="purpleToPink"
            arrowIcon={false}
            label={
              <div className="flex items-center justify-center">
                {userData?.name?.charAt(0).toUpperCase()}
              </div>
            }
          >
            <Dropdown.Header>
              <span className="block truncate text-sm font-medium">
                {userData.name}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => navigate("/dashboard")}>
              {t("Navbar.dashboard")}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/recipe/add")}>
              {t("Navbar.addNewRecipe")}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>
              {t("Navbar.logout")}
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      ) : (
        <div className="flex md:order-2">
          <CustomLanguageDropdown />
          <CustomButton onClick={handleLoginButtonClick} text={"Login"} />
          <Navbar.Toggle />
        </div>
      )}

      <Navbar.Collapse>
        <Navbar.Link
          onClick={() => navigate("/")}
          active={isActive("/")} // Set active if on the homepage
        >
          {t("Home.home")}
        </Navbar.Link>
        <Navbar.Link
          onClick={() => navigate("/recipe/course_type/MAIN_DISH")}
          active={isActive("/recipe/course_type/MAIN_DISH")} // Active when on the main dish page
        >
          {t("CourseType.MAIN_DISH")}
        </Navbar.Link>
        <Navbar.Link
          onClick={() => navigate("/recipe/course_type/SOUP")}
          active={isActive("/recipe/course_type/SOUP")} // Active when on the soup page
        >
          {t("CourseType.SOUP")}
        </Navbar.Link>
        <Navbar.Link
          onClick={() => navigate("/recipe/course_type/SWEET")}
          active={isActive("/recipe/course_type/SWEET")} // Active when on the sweet course page
        >
          {t("CourseType.SWEET")}
        </Navbar.Link>
        <Navbar.Link
          onClick={() => navigate("/recipe/course_type/SALTY")}
          active={isActive("/recipe/course_type/SALTY")} // Active when on the salty course page
        >
          {t("CourseType.SALTY")}
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
