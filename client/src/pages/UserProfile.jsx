import BlogCard from "../components/BlogCard";
import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "../redux/userSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditProfile } from "../components";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { UserProfileSkeleton } from "../components/skeletons";

const UserProfile = () => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.auth);
  const { data, refetch, isLoading, error } = useGetUserProfileQuery(id);
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      setBlogs(data.blogs);
    }
  }, [data]);

  const goBack = () => {
    setOpen(!open);
  };

  if (isLoading) return <UserProfileSkeleton />;

  return (
    <main className="bg-gray-100 bg-opacity-25">
      {open ? (
        <EditProfile user={data} id={id} close={goBack} refetch={refetch} />
      ) : (
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap p-4 md:pt-8 pb-2">
            <div className="md:ml-16 mt-1">
              <img
                className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-full
                     border-2 border-cyan-600 p-1"
                src={data?.avatar}
                alt="profile"
              />
            </div>
            <div className="w-7/12 ml-4">
              <div className="mt-4 md:mt-0 md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="text-2xl md:text-3xl inline-block font-light md:mr-4 mb-2 sm:mb-0">
                  {data?.name}
                </h2>
                {id === user.userId && (
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="bg-blue-500 px-4 py-1 
                        text-white font-semibold text-sm rounded text-center 
                        sm:inline-block block"
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="hidden md:block">
                <p>{data?.aboutMe}</p>
                <span>
                  <strong>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={data?.socialLinks?.website}
                    >
                      {data?.socialLinks?.website}
                    </a>
                  </strong>
                </span>
                <div className="w-full flex justify-start mt-2">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={data?.socialLinks?.linkedin}
                  >
                    <FaLinkedin className="text-[#4583c9] w-7 h-auto mr-2" />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={data?.socialLinks?.instagram}
                  >
                    <FaInstagram className="text-[#ff56be] w-7 h-auto mr-2" />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={data?.socialLinks?.twitter}
                  >
                    <FaTwitterSquare className="text-[#56d8ff] w-7 h-auto mr-2" />
                  </a>
                </div>
              </div>
              <ul className="hidden md:flex justify-around mt-8">
                <li>
                  <button
                    className="pointer hover:font-bold"
                    onClick={() => setBlogs(data?.blogs)}
                  >
                    <span className="font-semibold mr-1">
                      {data?.blogs.length}
                    </span>
                    Blogs
                  </button>
                </li>
                <li>
                  <button
                    className="pointer hover:font-bold"
                    onClick={() => setBlogs(data?.favorites)}
                  >
                    <span className="font-semibold mr-1">
                      {data?.favorites.length}
                    </span>
                    Favorites
                  </button>
                </li>
                <li></li>
              </ul>
            </div>
            <hr />
            <div className="md:hidden block text-sm my-2">
              <p>{data?.aboutMe}</p>
              <span>
                <strong>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={data?.socialLinks?.website}
                  >
                    {data?.socialLinks?.website}
                  </a>
                </strong>
              </span>
              <div className="w-full flex justify-start mt-2">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={data?.socialLinks?.linkedin}
                >
                  <FaLinkedin className="text-[#4583c9] w-6 h-auto mr-2" />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={data?.socialLinks?.instagram}
                >
                  <FaInstagram className="text-[#ff56be] w-6 h-auto mr-2" />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={data?.socialLinks?.twitter}
                >
                  <FaTwitterSquare className="text-[#56d8ff] w-6 h-auto mr-2" />
                </a>
              </div>
            </div>
          </header>
          <div className="px-px md:px-3">
            <ul
              className="flex md:hidden justify-around space-x-2 border-t 
                text-center p-2 text-gray-600 leading-snug text-sm"
            >
              <li>
                <button onClick={() => setBlogs(data?.blogs)}>
                  <span className="font-semibold text-gray-800 block">
                    {data?.blogs.length}
                  </span>
                  Blogs
                </button>
              </li>
              <li>
                <button onClick={() => setBlogs(data?.favorites)}>
                  <span className="font-semibold text-gray-800 block">
                    {data?.favorites.length}
                  </span>
                  Favorites
                </button>
              </li>
            </ul>
            <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10 px-3">
              {blogs?.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  className="w-full md:w-[calc(50%-20px)]"
                  profile={true}
                  refetch={refetch}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
export default UserProfile;
