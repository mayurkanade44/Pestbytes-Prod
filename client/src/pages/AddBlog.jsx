import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  useAllCategoriesQuery,
  useCreateBlogMutation,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
} from "../redux/blogSlice";
import { toast } from "react-toastify";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNewBlog } from "../redux/authSlice";
import { Loading } from "../components/skeletons";
import BlogModal from "../components/modals/BlogModal";

const AddBlog = () => {
  const [value, setValue] = useState("");
  const [postBlog, { isLoading: postBlogLoading }] = useCreateBlogMutation();
  const [uploadBlogImage, { isLoading: blogImageLoading }] =
    useUploadBlogImageMutation();
  const [updateBlog, { isLoading: updateBlogLoading }] =
    useUpdateBlogMutation();
  const { newBlog, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { data: categories } = useAllCategoriesQuery();
  const [category, setCategory] = useState([]);
  const [blogValues, setBlogValues] = useState({
    title: "",
    file: "",
    openPreview: false,
  });
  const [selectedOption, setSelectedOption] = useState([]);
  const navigate = useNavigate();
  const ref = useRef();

  const { data: blog, error } = useGetSingleBlogQuery(newBlog.blogId, {
    skip: newBlog.status,
  });

  useEffect(() => {
    if (!newBlog.status && blog) {
      setBlogValues({
        title: blog.title,
        file: blog.coverPicture,
        openPreview: false,
      });
      setValue(blog.body);
      setSelectedOption(blog.category);
    } else {
      setBlogValues({
        title: "",
        file: "",
        openPreview: false,
      });
      setValue("");
      setSelectedOption([]);
    }
  }, [blog, newBlog.status]);

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

  const imageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const form = new FormData();
      form.append("image", input.files[0]);
      try {
        const res = await uploadBlogImage(form).unwrap();
        const range = ref.current.getEditor().getSelection();
        ref.current.getEditor().insertEmbed(range.index, "image", res);
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.msg || error.error);
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "bullet" }],
          [{ align: [] }],
          ["link", "image", "video"],
        ],
        handlers: {
          image: imageUpload,
        },
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "align",
    "link",
    "image",
    "video",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value || !blogValues.title || !blogValues.file || !selectedOption)
      return toast.error("Please provide all values");

    const form = new FormData();

    form.set("title", blogValues.title);
    form.set("body", value);
    form.append("category", JSON.stringify(selectedOption));
    form.append("coverPic", blogValues.file);

    try {
      let res;
      if (newBlog.status) {
        res = await postBlog(form).unwrap();
      } else {
        res = await updateBlog({ data: form, id: newBlog.blogId }).unwrap();
      }
      toast.success(res.msg);
      navigate(`/blog/${res.newBlog._id}`);
      setBlogValues((prev) => ({
        title: "",
        file: "",
        openPreview: false,
      }));
      setValue("");
      dispatch(
        setNewBlog({
          status: true,
          blogId: "",
        })
      );
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  const handleCoverPic = (e) => {
    setBlogValues((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handlePreview = () => {
    if (!value || !blogValues.title || !blogValues.file)
      return toast.error("Please provide all values");

    setBlogValues((prev) => ({
      ...prev,
      openPreview: !prev.openPreview,
    }));
  };

  const onClose = () => {
    setBlogValues((prev) => ({
      ...prev,
      openPreview: !prev.openPreview,
    }));
  };

  return (
    <div className="container mx-auto max-w-3xl px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
      {blogImageLoading && <Loading />}
      <h2 className="text-center mb-5 text-xl font-semibold">
        {newBlog.status ? "Create New Blog" : "Update Blog"}
      </h2>
      <form action="submit" onSubmit={handleSubmit}>
        <div className="relative mb-3">
          <input
            type="text"
            required
            className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.3rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-800 dark:placeholder:text-neutral-500 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-1"
            placeholder="Add an impressive Title to your blog"
            value={blogValues.title}
            onChange={(e) =>
              setBlogValues((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex w-64 mb-2 rounded-lg">
            <label
              className={`cursor-pointer ${
                blogValues.file ? "bg-green-600" : " bg-teal-600"
              } text-white font-bold py-2 px-4 w-full inline-flex items-center rounded-lg`}
            >
              <AiOutlineCloudUpload className="text-black h-5 w-5 mr-2" />
              <span className="text-base leading-normal">
                {blogValues.file ? "Image Uploaded" : "Upload A Cover Picture"}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverPic}
                required
              />
            </label>
          </div>
          {newBlog.showCategory ? (
            <div className="md:w-3/5 mb-2">
              <Select
                closeMenuOnSelect={false}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={category}
                isMulti={true}
                placeholder="Select Blog Category"
                required
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() =>
                dispatch(
                  setNewBlog({
                    status: false,
                    blogId: newBlog.blogId,
                    showCategory: true,
                  })
                )
              }
              className="bg-black text-white h-8 w-40 rounded-lg hover:bg-slate-700"
            >
              Modify Categories
            </button>
          )}
        </div>
        <ReactQuill
          theme="snow"
          ref={ref}
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          placeholder="Write something"
          className="h-72 mb-20 md:mb-12"
        />
        <div className="flex justify-center">
          <button
            onClick={handlePreview}
            className="bg-primary text-white font-bold text-lg py-2 px-4 mr-2 rounded-lg my-2"
            type="button"
          >
            {!blogValues.openPreview ? "Preview" : "Cancel"}
          </button>
        </div>
        <div className="flex justify-center"></div>
      </form>
      <BlogModal
        disabled={updateBlogLoading || postBlogLoading}
        onSubmit={handleSubmit}
        blogValues={blogValues}
        isOpen={blogValues.openPreview}
        onClose={onClose}
        openPreview={blogValues.openPreview}
        user={user}
        value={value}
      />
    </div>
  );
};
export default AddBlog;
