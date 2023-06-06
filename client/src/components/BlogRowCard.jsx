import { Link } from "react-router-dom";
import profile from "../assets/profile.svg";
import post from "../assets/post.jpg";

const BlogRowCard = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog._id}`}
      className={`relative border-2 border-gray-300 h-44 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-64 md:min-w-[260px] md:hover:scale-105 `}
    >
      <img src={blog.coverPicture} alt="cover-pic" className="h-40 w-full" />
      <div className="p-2 border-t-2">
        <h2 className="font-roboto font-bold text-l text-dark-soft md:text-2xl lg:text-[16px]">
          {blog.title}
        </h2>
        <div className="flex justify-between flex-nowrap items-center mt-2">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={blog.user?.avatar}
              alt="post-profile"
              className="w-5 md:w-7 rounded-full"
            />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-dark-soft text-sm">
                {blog.user?.name.split(" ")[0]}
              </h4>
              <div className="flex items-center gap-x-2"></div>
            </div>
          </div>
          <span className="font-bold text-dark-light italic text-sm">
            {new Date(blog?.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
};
export default BlogRowCard;
