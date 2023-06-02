import { BlogRow, BlogCard, PopularTags, AdSlider } from "../components";
import { useAllBlogsQuery } from "../redux/blogSlice";
import { AiOutlineSearch } from "react-icons/ai";

import hero from "../assets/hero.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../redux/authSlice";
import { Loading } from "../components/skeletons";

const blogs = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
];

const Home = () => {
  const { data, isLoading, refetch } = useAllBlogsQuery();
  const dispatch = useDispatch();
  const [tempSearch, setTempSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        navigate(`/all-blogs`);
      }, 1000);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <div>
      {isLoading && <Loading />}
      <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row">
        <div className="mt-0 md:mt-8 lg:w-1/2">
          <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
            India's First Community Of Pest Bloggers
          </h1>
          <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
            Read the most interesting case studies, product reviews and
            publications from academia and professional pest managers.
          </p>
          <div className="flex flex-col gap-y-2.5 mt-6 xl:mt-10 relative">
            <div className="relative">
              <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
              <input
                className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
                type="text"
                placeholder="Search for pest, pest prevention or pest services"
                value={tempSearch}
                onChange={optimizedDebounce}
              />
            </div>
          </div>
          <div className="flex mt-4 flex-row lg:items-start flex-nowrap lg:gap-x-4 lg:mt-7">
            <span className="text-dark-light font-semibold italic mt-3 mr-1.5 lg:mt-4 lg:text-sm xl:text-base">
              Popular Tags:
            </span>
            <PopularTags className="rounded-lg bg-primary mt-3 mr-2 bg-opacity-10 h-6 md:h-auto px-2 md:px-3 py-0.5 md:py-1.5 text-primary text-sm md:text-base md:font-semibold" />
          </div>
        </div>
        {/* <div className="hidden lg:block lg:1/2">
          <img
            style={{ paddingLeft: 50, width: 600, height: 380 }}
            src={hero}
            alt="users are reading articles"
          />
        </div> */}
      </section>
      {/* <section className="flex flex-col container mx-auto px-5 py-1">
        <h1 className="text-2xl pb-4 font-bold">
          In the Spotlight: Partnerships
        </h1>
        <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {data?.slice(0, 3).map((blog) => (
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
      </section> */}
      <BlogRow title="Trending Now" blogs={blogs} />
      <AdSlider />
      <BlogRow title="Cockroach" blogs={blogs} />
      <BlogRow title="Termite" blogs={blogs} />
      <BlogRow title="Mosquito" blogs={blogs} />
    </div>
  );
};
export default Home;
