import { useRef } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import BlogRowCard from "./BlogRowCard";
import { useDispatch } from "react-redux";
import { setSearch } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const BlogRow = ({ title, id, blogs }) => {
  const rowRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const searchCategory = ({ category, name }) => {
    dispatch(
      setSearch({
        title: "",
        category: category,
        name: name,
      })
    );
    navigate(`/all-blogs`);
  };
  return (
    <div className="container mx-auto px-5 ">
      <div className="space-y-1 md:space-y-2">
        <button
          onClick={() =>
            searchCategory({
              category: id,
              name: title,
            })
          }
          className="md:ml-3 mx-0 cursor-pointer text-sm font-semibold text-[#534f4f] transition duration-200 hover:text-black md:text-2xl"
        >
          {title}
        </button>

        <div className="group relative md:ml-2">
          {blogs?.length > 3 && (
            <BiChevronLeft
              className="absolute text-cyan-800 bg-white border-2 rounded-full top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
              onClick={() => handleClick("left")}
            />
          )}

          <div
            className="flex items-center space-x-0.5 md:mx-3 scrollbar-hide overflow-x-scroll md:space-x-4 md:p-2"
            ref={rowRef}
          >
            {blogs?.map((blog) => (
              <BlogRowCard key={blog._id} blog={blog} />
            ))}
          </div>

          {blogs?.length > 3 && (
            <BiChevronRight
              className="absolute text-cyan-700 bg-white border-2 rounded-full top-0 bottom-0 right-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
              onClick={() => handleClick("right")}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default BlogRow;
