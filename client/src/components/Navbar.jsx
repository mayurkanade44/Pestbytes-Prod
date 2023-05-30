import { useState } from "react";
import logo from "../assets/logo.jpg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/userSlice";
import { logout, setNewBlog } from "../redux/authSlice";
import { toast } from "react-toastify";

const navItemsInfo = [
  { name: "Home", type: "link", href: "/" },
  { name: "About Us", type: "link", href: "/about-pestbytes" },
  { name: "Contact Us", type: "link", href: "/" },
];

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
      navVisibilityHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const addBlog = () => {
    dispatch(setNewBlog({ status: true, blogId: "" }));
    navVisibilityHandler();
    navigate("/add-blog");
  };
  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm border-b-[1px]">
      <header className="container mx-auto px-5 flex justify-between py-4 items-center">
        <div>
          <Link to="/">
            <img src={logo} className="w-10" alt="logo" />
          </Link>
        </div>
        <div className="lg:hidden z-50">
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandler} />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } transition-all duration-300 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-2 items-center`}
        >
          <ul className="text-white items-center gap-y-7 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
            {navItemsInfo.map((item) => (
              <NavItems
                key={item.name}
                name={item.name}
                href={item.href}
                setNavIsVisible={navVisibilityHandler}
              />
            ))}
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
            <Link
              to="/login"
              onClick={navVisibilityHandler}
              className="mt-8 lg:mt-0 border-2 border-blue-500 px-4 py-1 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Log In
            </Link>
          )}
        </div>
      </header>
    </section>
  );
};
export default Navbar;
