import { Link } from "react-router-dom";

const BlogRowCard = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog._id}`}
      className={`relative border-2 border-gray-300 h-44 min-w-[230px] cursor-pointer transition duration-200 ease-out md:h-60 md:min-w-[350px] md:hover:scale-105 `}
    >
      <img
        src={blog.coverPicture}
        alt="cover-pic"
        className="object-cover h-32 md:h-40 w-full"
      />
      <div className="p-0.5 md:p-2 border-t-2">
        <h2 className="font-roboto text-[12px] font-bold text-dark-soft md:text-[16px]">
          <span className="hidden md:block">
            {blog.title.length > 41
              ? blog.title.substring(0, 39) + "..."
              : blog.title}
          </span>
          <span className="block md:hidden">
            {blog.title.length > 35
              ? blog.title.substring(0, 32) + "..."
              : blog.title}
          </span>
        </h2>
        <div className="flex justify-between flex-nowrap items-center md:mt-2">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={blog.user?.avatar}
              alt="post-profile"
              className="w-5 md:w-7 rounded-full"
            />
            <div className="flex flex-col">
              <h4 className="md:font-bold italic text-dark-soft text-[12px] md:text-sm">
                {blog.user?.name.split(" ")[0]}
              </h4>
              {/* <div className="flex items-center gap-x-2"></div> */}
            </div>
          </div>
          <span className="font-bold text-dark-light italic text-[12px] md:text-sm">
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
