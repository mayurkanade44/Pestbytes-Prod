import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setNewBlog } from "../redux/authSlice";
import { toast } from "react-toastify";
import { useDeleteBlogMutation } from "../redux/blogSlice";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

const BlogCard = ({ blog, className, profile, refetch }) => {
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEdit = () => {
    dispatch(
      setNewBlog({
        status: false,
        blogId: blog._id,
      })
    );
    navigate("/add-blog");
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteBlog(id).unwrap();
      refetch();
      toast.success(res.msg);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
      <Link to={`/blog/${blog._id}`}>
        <img
          src={blog.coverPicture}
          alt="Image"
          className="w-full h-60 rounded-lg border-b-2"
        />
      </Link>
      {profile && (
        <div className=" flex justify-center">
          <button onClick={handleEdit}>
            <FaRegEdit className="text-cyan-600 w-8 h-8 p-1  bg-slate-100 hover:bg-black mr-3" />
          </button>
          <button onClick={() => setOpen(true)}>
            <AiOutlineDelete className="text-red-500 w-8 h-8 p-1  bg-slate-100  hover:bg-black  " />
          </button>
        </div>
      )}
      <DeleteModal open={open}>
        <div className="text-center w-60">
          <AiOutlineDelete className="text-red-500 mx-auto w-10 h-10" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want delete this blog?
            </p>
          </div>
          <div className="flex gap-4">
            <div
              onClick={() => handleDelete(blog._id)}
              className="btn bg-red-700 w-full rounded-md text-white py-1 cursor-pointer"
            >
              Delete
            </div>
            <div
              onClick={() => setOpen(false)}
              className="btn  bg-gray-200 w-full rounded-md text-dark py-1 font-semibold cursor-pointer"
            >
              Cancel
            </div>
          </div>
        </div>
      </DeleteModal>
      <Link to={`/blog/${blog._id}`}>
        <div className="pb-2 pt-1 px-4">
          <h2 className="font-roboto font-bold text-xl text-dark md:text-[25px]">
            {blog.title.substring(0, 30)}
          </h2>
          <div className="flex justify-between flex-nowrap items-center mt-2">
            <div className="flex items-center gap-x-2 md:gap-x-2.5">
              <img
                src={blog.user.avatar}
                alt="post-profile"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full"
              />
              <div className="flex flex-col">
                <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                  {blog.user.name}
                </h4>
                <div className="flex items-center gap-x-2"></div>
              </div>
            </div>
            <span className="font-bold text-dark-light italic text-sm md:text-base">
              {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default BlogCard;
