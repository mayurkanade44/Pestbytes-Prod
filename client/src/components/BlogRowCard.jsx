import { Link } from "react-router-dom";
import profile from "../assets/profile.svg";
import post from "../assets/post.jpg";

const BlogRowCard = ({ blog }) => {
  return (
    <Link
      to="/blog/12"
      className={`relative h-44 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-64 md:min-w-[260px] md:hover:scale-105 `}
    >
      <img src={post} alt="" />
      <div className="p-2 border-x-2 border-b-2">
        <h2 className="font-roboto font-bold text-l text-dark-soft md:text-2xl lg:text-[16px]">
          Green Shield
        </h2>
        <div className="flex justify-between flex-nowrap items-center mt-2">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={profile}
              alt="post-profile"
              className="w-5 md:w-7 rounded-full"
            />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-dark-soft text-sm">
                Mayur
              </h4>
              <div className="flex items-center gap-x-2"></div>
            </div>
          </div>
          <span className="font-bold text-dark-light italic text-sm">
            09 May
          </span>
        </div>
      </div>
    </Link>
  );
};
export default BlogRowCard;
