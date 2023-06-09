import { Link } from "react-router-dom";
import PopularTags from "./PopularTags";

const SuggestedBlogs = ({ className, header, posts = [] }) => {
  return (
    <div
      className={`w-full shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-lg p-4 ${className}`}
    >
      <h2 className="font-roboto font-medium text-dark-hard md:text-xl">
        {header}
      </h2>
      <div className="grid gap-y-5 mt-5 md:grid-cols-3 md:gap-x-5 lg:grid-cols-1">
        {posts.slice(0, 3).map((item) => (
          <Link
            to={`/blog/${item._id}`}
            key={item._id}
            className="flex space-x-3 flex-nowrap items-center"
          >
            <img
              className="aspect-square object-cover rounded-lg w-1/5 border-2"
              src={item.coverPicture}
              alt="cover-picture"
            />
            <div className="text-sm font-roboto text-dark-hard font-medium">
              <h3 className="text-sm font-roboto text-dark-hard font-medium md:text-base lg:text-lg">
                {item.title}
              </h3>
              <span className="text-xs opacity-60">
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <h2 className="font-roboto font-medium text-dark-hard mt-8 md:text-xl">
        Popular Tags:
      </h2>
      <div className="flex flex-wrap mt-2">
        <PopularTags className="inline-block rounded-md px-3 py-1.5 m-1 bg-primary font-roboto text-xs text-white md:text-sm" />
      </div>
    </div>
  );
};

export default SuggestedBlogs;
