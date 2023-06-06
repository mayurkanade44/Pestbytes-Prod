import { AiOutlineSearch } from "react-icons/ai";
import { useAllCategoriesQuery, useSearchBlogsQuery } from "../redux/blogSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { setSearch } from "../redux/authSlice";
import { SearchBlogSkeleton } from "../components/skeletons";
import { BreadCrumbs } from "../components";
import Select from "react-select";

const AllBlogs = () => {
  const { search } = useSelector((store) => store.auth);
  const [page, setPage] = useState(1);
  const [tempSearch, setTempSearch] = useState("");
  const dispatch = useDispatch();
  const [category, setCategory] = useState([
    { value: "", label: "All Categories" },
  ]);
  const [selectedOption, setSelectedOption] = useState("");

  const brd = [
    { name: "Home", link: "/" },
    { name: "Blogs", link: `/all-blogs` },
    { name: search.name },
  ];

  const { data, isLoading, isFetching } = useSearchBlogsQuery({
    search: search.title,
    category: search.category,
    page: page,
  });
  const { data: categories } = useAllCategoriesQuery();

  useEffect(() => {
    setTempSearch(search.title);
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    if (categories) {
      categories.map((category) =>
        setCategory((current) => [
          ...current,
          { value: category._id, label: category.category },
        ])
      );
    }
  }, [categories]);

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(
      setSearch({
        title: tempSearch,
        category: selectedOption.value,
        name: selectedOption.label,
      })
    );

    setPage(1);
  };

  const pages = Array.from({ length: data?.pages }, (_, index) => index + 1);

  return (
    <div className="container my-5 px-6 mx-auto">
      <div className="md:ml-28 mb-2">
        <BreadCrumbs data={brd} />
      </div>
      <form onSubmit={handleSearch} className="flex justify-center my-4">
        <div className="flex w-full md:w-2/3">
          <div className="w-2/4 md:w-1/3">
            <Select
              options={category}
              onChange={setSelectedOption}
              placeholder="Categories"
              className="text-sm"
            />
          </div>
          <div className="relative w-full">
            <input
              type="search"
              className="block p-2 w-full z-20 text-sm  rounded-r-lg  border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-500"
              placeholder="Search for pest, pest prevention or pest services..."
              onChange={(e) => setTempSearch(e.target.value)}
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <AiOutlineSearch className="h-5 w-4 md:w-10 text-black" />
            </button>
          </div>
        </div>
      </form>
      {isLoading || isFetching ? (
        <SearchBlogSkeleton />
      ) : (
        <>
          <section className="my-1 text-gray-800 text-center md:text-left">
            <h2 className="text-3xl font-bold mt-3 md:mt-0 mb-5 md:mb-10 text-center">
              {data?.blogs?.length
                ? `Latest ${
                    search.name === undefined ||
                    search.name === "All Categories"
                      ? ""
                      : search.name
                  } Blogs`
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
                    {blog?.category.map(
                      (c) => `#${c.label.replaceAll(" ", "")} `
                    )}
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
                 
                  <Link to={`/blog/${blog._id}`} className="text-primary">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </section>
          {pages.length > 1 && (
            <nav aria-label="Page navigation example">
              <ul className="list-style-none flex justify-center">
                {pages.map((item) => (
                  <li className="pr-1" key={item}>
                    <button
                      className={`relative block rounded px-3 py-1.5 text-sm transition-all duration-30  ${
                        page === item ? "bg-blue-400" : "bg-neutral-700"
                      } text-white hover:bg-blue-400`}
                      onClick={() => setPage(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};
export default AllBlogs;
