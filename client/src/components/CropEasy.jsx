import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./CropImage";
import { toast } from "react-toastify";
import { useUpdateProfilePicMutation } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";

const CropEasy = ({ photo, setOpenCrop, setImage, refetch, id }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [uploadPic, { isLoading }] = useUpdateProfilePicMutation();

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const dispatch = useDispatch();

  const handleCropImage = async () => {
    try {
      const croppedImg = await getCroppedImg(photo?.url, croppedAreaPixels);

      const file = new File([croppedImg.file], `${photo?.file?.name}`, {
        type: photo?.file?.type,
      });

      const formData = new FormData();
      formData.append("image", file);

      const res = await uploadPic({ data: formData, id }).unwrap();
      setImage(res.user.avatar);
      dispatch(setCredentials(res));
      refetch();
      setOpenCrop(false);
      toast.success(res.msg);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="fixed z-[1000] inset-0 bg-black/50 flex justify-center p-5 overflow-auto">
      <div className="bg-white h-fit w-full sm:max-w-[350px] p-5 rounded-lg">
        <h2 className="font-semibold text-dark-hard mb-2">Crop Image</h2>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Cropper
            image={photo?.url}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div>
          <label
            htmlFor="zoomRage"
            className="block mt-2 mb-0.5 text-sm font-medium text-gray-900"
          >
            Zoom: {`${Math.round(zoom * 100)}%`}
          </label>
          <input
            type="range"
            id="zoomRange"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
          />
        </div>
        <div className="flex justify-between gap-2 flex-wrap">
          <button
            disabled={isLoading}
            onClick={() => setOpenCrop(false)}
            className="px-5 py-2.5 rounded-lg text-red-500 border border-red-500 text-sm disabled:opacity-70"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={handleCropImage}
            className="px-5 py-2.5 rounded-lg text-white bg-blue-500 text-sm disabled:opacity-70"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};
export default CropEasy;
