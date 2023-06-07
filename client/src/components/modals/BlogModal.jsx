import { useEffect, useState } from "react";
import Modal from "./Modal";
import { MdCalendarMonth } from "react-icons/md";

const BlogModal = ({
  isOpen,
  onClose,
  blogValues,
  onSubmit,
  openPreview,
  disabled,
  user,
  value,
}) => {
  const [previewImage, setPreviewImage] = useState(null);

  const prevImage = () => {
    if (typeof blogValues.file === "string") setPreviewImage(blogValues.file);
    else setPreviewImage(URL.createObjectURL(blogValues.file));
  };

  useEffect(() => {
    prevImage();
  }, [openPreview]);

  const blogBody = (
    <div className="relative px-6 py-1 flex-auto">
      <div>
        <h1 className="text-lg font-medium font-roboto capitalize my-2 text-dark-hard md:text-[26px]">
          {blogValues.title}
        </h1>
        <div className="py-1 px-4 bg-slate-100 mb-5 ">
          <div className="flex justify-between flex-nowrap items-center">
            <div className="flex items-center gap-x-2 md:gap-x-2.5">
              <img
                src={user.avatar}
                alt="post-profile"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full"
              />
              <div className="flex flex-col">
                <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                  <span className="font-normal">by</span> {user.name}
                </h4>
                <div className="flex items-center gap-x-2">
                  <span className="text-xs text-dark-light">
                    <MdCalendarMonth className="inline mr-1 mb-[2px]" />
                    {new Date().toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src={previewImage}
          alt="post"
          className="w-full object-contain h-auto md:h-52 lg:h-72 rounded-lg"
        />
        <div
          className="mt-4 quill"
          dangerouslySetInnerHTML={{ __html: value }}
        ></div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={disabled}
        title="Blog Preview"
        actionLabel="Post"
        onSubmit={onSubmit}
        body={blogBody}
        isOpen={isOpen}
        onClose={onClose}
        width="relative w-full mt-20 md:mt-2 md:w-4/6 lg:w-3/6 my-6 mx-auto h-full lg:h-auto md:h-auto"
        itemCenter="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
      />
    </div>
  );
};
export default BlogModal;
