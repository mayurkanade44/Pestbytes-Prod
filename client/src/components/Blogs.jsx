import { useAllBlogsQuery } from "../redux/blogSlice";
import BlogCard from "./BlogCard";
import { FaArrowRight } from "react-icons/fa";

const Blogs = () => {
  const { data: blogs, isLoading, refetch } = useAllBlogsQuery()

  return (
    <section className="flex flex-col container mx-auto px-5 py-5">
      <h1 className="text-2xl pb-4 font-bold">
        In the Spotlight: Partnerships
      </h1>
      <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        {blogs?.slice(0, 3).map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
          />
        ))}
      </div>
      <button className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-5 py-2 rounded-lg">
        <span>More blogs</span>
        <FaArrowRight className="w-3 h-3" />
      </button>
    </section>
  );
};
export default Blogs;
