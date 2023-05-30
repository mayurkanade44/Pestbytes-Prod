import { AiOutlineSearch } from "react-icons/ai";
import { useAllCategoriesQuery, useSearchBlogsQuery } from "../redux/blogSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { setSearch } from "../redux/authSlice";
import { SearchBlogSkeleton } from "../components/skeletons";
import { BreadCrumbs } from "../components";

const AllBlogs = () => {
  const { search } = useSelector((store) => store.auth);
  const [page, setPage] = useState(1);
  const [tempSearch, setTempSearch] = useState("");
  const dispatch = useDispatch();

  const brd = [
    { name: "Home", link: "/" },
    { name: "Blogs", link: `/all-blogs` },
    { name: search.name },
  ];

  const { data, isLoading, refetch } = useSearchBlogsQuery({
    search: search.title,
    category: search.category,
    page: page,
  });
  const { data: categories } = useAllCategoriesQuery();

  useEffect(() => {
    setTempSearch(search.title);
    window.scrollTo(0, 0);
  }, [page]);

  const searchCategory = ({ category, name }) => {
    dispatch(
      setSearch({
        title: "",
        category: category,
        name: name,
      })
    );
    setPage(1);
  };

  const debounce = () => {
    let timeoutId;
    return (e) => {
      setTempSearch(e.target.value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(
          setSearch({
            title: e.target.value,
            category: "",
            name: e.target.value,
          })
        );
        setPage(1);
      }, 1000);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);

  const pages = Array.from({ length: data?.pages }, (_, index) => index + 1);

  return (
    <div className="container my-5 px-6 mx-auto">
      <div className="md:ml-28 mb-2">
        <BreadCrumbs data={brd} />
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col w-full md:w-2/3 gap-y-5 mt-2 relative">
          <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
          <input
            className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-3"
            type="text"
            placeholder="Search for pest, pest prevention or pest services"
            value={tempSearch}
            onChange={optimizedDebounce}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-wrap mt-5 md:w-2/3 ml-1 md:ml-5 ">
          <h1 className="font-bold w-2/12 md:w-1/12">Tags:</h1>
          <div className="w-10/12 md:w-11/12">
            {categories?.map((category) => (
              <button
                key={category._id}
                className={`mr-2 mb-2 rounded-lg bg-primary ${
                  search.category === category._id
                    ? "text-black"
                    : " text-primary"
                } bg-opacity-10 h-6 md:h-auto px-1 md:px-2 py-0.5 hover:text-dark-hard text-sm md:text-base md:font-semibold`}
                onClick={() =>
                  searchCategory({
                    category: category._id,
                    name: category.category,
                  })
                }
              >
                #{category.category.toLowerCase().split(" ")}
              </button>
            ))}
          </div>
        </div>
      </div>
      {isLoading ? (
        <SearchBlogSkeleton />
      ) : (
        <>
          <section className="my-1 text-gray-800 text-center md:text-left">
            <h2 className="text-3xl font-bold mt-3 md:mt-0 mb-5 md:mb-10 text-center">
              {data?.blogs?.length
                ? `Latest ${search.name} Blogs`
                : "No Blog Found"}
            </h2>
            {data?.blogs.map((blog) => (
              <div className="flex flex-wrap mb-6" key={blog._id}>
                <Link
                  to={`/blog/${blog._id}`}
                  className="grow-0 shrink-0 basis-auto w-full md:w-3/12 px-3 mb-0 ml-auto"
                >
                  <div className="relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg mb-6">
                    <img
                      src={blog?.coverPicture}
                      className="w-full h-44"
                      alt="cover-pic"
                    />
                  </div>
                </Link>
                <div className="grow-0 shrink-0 basis-auto w-full md:w-9/12 xl:w-7/12 px-3 mb-0 mr-auto">
                  <h5 className="text-lg font-bold mb-1 md:mb-3">
                    {blog.title}
                  </h5>
                  <div className="mb-1 md:mb-3 text-red-600 font-medium text-sm flex items-center justify-center md:justify-start">
                    {blog?.category.map((c) => `#${c.label} `)}
                  </div>
                  <p className="text-gray-500 mb-2">
                    <small>
                      Published on{" "}
                      {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      by
                      <span className="text-gray-900 ml-1">
                        {blog.user.name}
                      </span>
                    </small>
                  </p>
                  <span
                    className=" text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: blog?.body.substring(0, 100),
                    }}
                  />
                  <Link to={`/blog/${blog._id}`} className="text-primary">
                    ...Read More
                  </Link>
                </div>
              </div>
            ))}
          </section>
          {pages.length > 1 && (
            <nav aria-label="Page navigation example">
              <ul className="list-style-none flex justify-center">
                <li className="pr-1">
                  <button className="relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-30 bg-neutral-700 text-white hover:bg-blue-400">
                    Previous
                  </button>
                </li>
                {pages.map((item) => (
                  <li className="pr-1" key={item}>
                    <button
                      className={`relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-30  ${
                        page === item ? "bg-blue-400" : "bg-neutral-700"
                      } text-white hover:bg-blue-400`}
                      onClick={() => setPage(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
                <li>
                  <button className="relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-30 bg-neutral-700 text-white hover:bg-blue-400">
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};
export default AllBlogs;
