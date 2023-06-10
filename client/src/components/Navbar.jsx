import { useState } from "react";
import logo from "../assets/logo1.jpg";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineProfile,
} from "react-icons/ai";
import { BiMessageAltAdd } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/userSlice";
import { logout, setNewBlog, toggleModal } from "../redux/authSlice";
import { toast } from "react-toastify";

const navItemsInfo = [
  { name: "Home", type: "link", href: "/" },
  { name: "Add Blog", type: "link", href: "/add-blog" },
  { name: "About Us", type: "link", href: "/about-pestbytes" },
  { name: "Contact Us", type: "link", href: "/" },
];

const mobileNav = [{ name: "Home", href: "/" }];

const NavItems = ({ name, href, setNavIsVisible }) => {
  return (
    <li className="relative group">
      <Link
        to={href}
        className="px-4 py-2 hover:text-blue-500"
        onClick={setNavIsVisible}
      >
        {name}
      </Link>
      <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
        /
      </span>
    </li>
  );
};

const Navbar = () => {
  const [navIsVisible, setNavIsVisible] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [logoutUser] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };

  const logoutHandler = async () => {
    try {
      const res = await logoutUser().unwrap();
      dispatch(logout());
      toast.success(res.msg);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [active, setActive] = useState(0);

  const addBlog = () => {
    if (!user) {
      toast.error("Please login to add the blog");
      dispatch(toggleModal({ register: false, login: true }));
      return;
    }

    dispatch(setNewBlog({ status: true, blogId: "", showCategory: true }));
    navigate("/add-blog");
  };
  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm border-b-[1px]">
      <header className="container mx-auto px-5 flex justify-between py-2 md:py-4 items-center">
        <div>
          <Link to="/">
            <img src={logo} className="w-12 logo" alt="logo" />
          </Link>
        </div>
        <div className="lg:hidden z-50">
          {user ? (
            <button
              type="button"
              onClick={logoutHandler}
              className="border-2 border-red-500 px-4 py-1 rounded-full text-red-500 font-semibold"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() =>
                dispatch(toggleModal({ register: false, login: true }))
              }
              className="border-2 border-blue-500 px-4 py-1 rounded-full text-blue-500 font-semibold"
            >
              Log In
            </button>
          )}

          {/* {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandler} />
          )} */}
          <div className="fixed bottom-0 right-0 bg-gray-400 w-full h-14 px-4">
            <ul className="flex justify-between">
              <li className="text-white p-1">
                <Link to="/">
                  <div className="flex justify-center">
                    <AiOutlineHome className="h-6 w-10 " />
                  </div>
                  Home
                </Link>
              </li>
              <li className="text-white p-1">
                <Link to="/all-blogs">
                  <div className="flex justify-center">
                    <AiOutlineSearch className="h-6 w-10" />
                  </div>
                  Blogs
                </Link>
              </li>
              <li className="text-white p-1">
                <button onClick={addBlog} type="button">
                  <div className="flex justify-center">
                    <BiMessageAltAdd className="h-6 w-10" />
                  </div>
                  Add Blog
                </button>
              </li>
              <li className="text-white p-1">
                <Link to="/about-pestbytes">
                  <div className="flex justify-center">
                    <AiOutlineProfile className="h-6 w-10" />
                  </div>
                  About
                </Link>
              </li>
              {user && (
                <li className="text-white p-1">
                  <Link to={`/profile/${user.userId}`}>
                    <div className="flex justify-center">
                      <FaRegUserCircle className="h-6 w-10" />
                    </div>
                    Profile
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } transition-all duration-300 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-2 items-center`}
        >
          <ul className="text-white items-center gap-y-7 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
            {navItemsInfo.map((item) =>
              item.name === "Add Blog" ? (
                user && (
                  <NavItems
                    key={item.name}
                    name={item.name}
                    href={item.href}
                    setNavIsVisible={navVisibilityHandler}
                  />
                )
              ) : (
                <NavItems
                  key={item.name}
                  name={item.name}
                  href={item.href}
                  setNavIsVisible={navVisibilityHandler}
                />
              )
            )}
          </ul>
          {user ? (
            <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
              <div className="relative group">
                <div className="flex flex-col items-center">
                  <button
                    className="flex gap-x-1 items-center mt-4 lg:mt-0 px-4 py-1 rounded-full text-dark font-semibold"
                    onClick={() => setProfileDropdown(!profileDropdown)}
                  >
                    <img
                      src={user.avatar}
                      alt="user-profile"
                      className="w-6 rounded-full mr-2"
                    />
                    <span className="hover:text-blue-500">
                      {user.name.split(" ")[0]}
                    </span>
                    <MdKeyboardArrowDown />
                  </button>
                  <div
                    className={`${
                      profileDropdown ? "block" : "hidden"
                    } lg:hidden transition-all duration-500 pt-1 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-[120px]`}
                  >
                    <ul className="bg-dark-soft lg:bg-white text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                      <button
                        onClick={addBlog}
                        type="button"
                        className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                      >
                        Add Blog
                      </button>
                      <Link
                        to={`/profile/${user.userId}`}
                        className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                        onClick={navVisibilityHandler}
                      >
                        Profile
                      </Link>
                      <button
                        type="button"
                        onClick={logoutHandler}
                        className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() =>
                dispatch(toggleModal({ register: false, login: true }))
              }
              className="mt-8 lg:mt-0 border-2 border-blue-500 px-4 py-1 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Log In
            </button>
          )}
        </div>
      </header>
    </section>
  );
};
export default Navbar;
