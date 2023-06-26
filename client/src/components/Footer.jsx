import React from "react";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillInstagram,
  AiFillHeart,
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-4">
      <footer className=" bg-dark-hard p-6">
        <div className="container mx-auto grid grid-cols-1 px-2 gap-y-5 gap-x-5 md:grid-cols-2 lg:grid-cols-2 lg:gap-x-10">
          <div className="md:order-first">
            <h3 className="text-white font-bold text-center md:text-start md:text-lg">
              About Pestbytes
            </h3>
            <p className="text-sm text-dark-light text-center mt-4 md:text-left md:text-base lg:text-sm">
              The pivot was to create a platform to influence a new pattern of
              collaborative learning not just keeping it focused on a fixed set
              of writers but opening it up to all communities and spectrum of
              contributors. Pestbytes in 2023 collaborated putting together mind
              and technology to create a platform open to becoming a central
              space where knowledge sharing and innovation announcement is done
              with pride, encouraging a whole new generation of entrepreneurs to
              share, learn, comment, and build knowledge.
            </p>
            <ul className="flex justify-center items-center mt-5 space-x-4 text-gray-300 md:justify-start">
              <li>
                <a href="/">
                  <AiOutlineTwitter className="w-6 h-auto" />
                </a>
              </li>
              <li>
                <a href="/">
                  <AiFillYoutube className="w-6 h-auto" />
                </a>
              </li>
              <li>
                <a href="/">
                  <AiFillInstagram className="w-6 h-auto" />
                </a>
              </li>
              <li>
                <a href="/">
                  <FaFacebook className="w-6 h-auto" />
                </a>
              </li>
              <li>
                <a href="/">
                  <BsTelegram className="w-6 h-auto" />
                </a>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <h3 className="text-white font-bold md:text-lg">Quick Link</h3>
              <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base">
                <li>
                  <Link className="hover:text-blue-600 hover:font-bold" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-blue-600 hover:font-bold"
                    to="/all-blogs"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-blue-600 hover:font-bold"
                    to="/about-pestbytes"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-blue-600 hover:font-bold" to="/">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-4 flex flex-wrap items-stretch">
                <input
                  type="text"
                  className="m-0 mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Email Id"
                />
                <button
                  className="z-[2] inline-block rounded-r bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:z-[3] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  type="button"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-neutral-900 text-center text-white">
        <div className="p-1 text-center">
          © {new Date().getFullYear()} All Rights Reserved By Pestbytes
        </div>
      </div>
    </div>
  );
};
export default Footer;
