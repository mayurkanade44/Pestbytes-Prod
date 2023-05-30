import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdCalendarMonth } from "react-icons/md";

const Modal = ({
  title,
  value,
  openPreview,
  onClose,
  onSubmit,
  blogValues,
  isLoading,
  user
}) => {
  const [showModal, setShowModal] = useState(openPreview);
  const [previewImage, setPreviewImage] = useState(null);

  const prevImage = () => {
    if (typeof blogValues.file === "string") setPreviewImage(blogValues.file);
    else setPreviewImage(URL.createObjectURL(blogValues.file));
  };

  useEffect(() => {
    setShowModal(openPreview);
    prevImage();
  }, [openPreview]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  

  return (
    <div>
      <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/*content*/}
          <div
            className={`translate duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="translate lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center p-3 rounded-t justify-center relative border-b-[1px]">
                <button
                  className=" p-1 border-0 hover:opacity-70 transition absolute right-9"
                  onClick={handleClose}
                >
                  <IoMdClose size={25} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/*body*/}
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
              {/*footer*/}
              <div className="flex flex-col col-12 p-2">
                <div className="flex justify-center w-full">
                  <button
                    className="bg-green-800 text-white font-bold text-lg py-2 px-4  rounded-lg my-2"
                    onClick={onSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? "posting..." : "Publish"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
