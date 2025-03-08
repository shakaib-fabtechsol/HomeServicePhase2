import { MdFileUpload } from "react-icons/md";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import React from "react";
import { getImageUrl } from "../../utils";

const schema = Yup.object().shape({
  images: Yup.array().min(1, "At least one image is required"),
});

export default function UploadPhotos({ title, close, onUpload, isLoading,oldImages=[] }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      images: oldImages?.map((image) => ({
        preview: getImageUrl(image),
      })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });
  const handleImageUpload = React.useCallback(
    (event) => {
      const files = Array.from(event.target.files);
      files.forEach((file) => {
        append({ file, preview: URL.createObjectURL(file) });
      });
      event.target.value = "";
    },
    [append]
  );

  const handleRemoveImage = (index) => {
    remove(index);
  };

  const onSubmit = (data) => {
    const uploadedFiles = data.images
      .filter((item) => item.file)
      .map((item) => item.file);
    onUpload(uploadedFiles);
  };


  return (
    <div className="rounded-[12px] bg-white p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-h-[calc(100dvh-40px)] overflow-y-auto scroll-x-hidden">
          <p className="text-[#101828] text-lg font-semibold">{title}</p>
          <div className="mt-4">
            <div>
              <div>
                <label
                  className="flex items-center cursor-pointer gap-1 justify-center w-full border border-[#D7D7D7] p-3 bg-[#D7D7D7] rounded-[8px] text-[#343434]"
                  htmlFor="Uploadbeforeimgs"
                >
                  <MdFileUpload />
                  <span className="text-xs">Upload Images</span>
                </label>
                <input
                  type="file"
                  id="Uploadbeforeimgs"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </div>
              {errors.images && (
                <div className="text-red-500 text-sm">
                  {errors.images.message}
                </div>
              )}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {fields.map((field, index) => 
                 <UploadedImage key={'uploaded-image'+index} handleRemoveImage={handleRemoveImage} imageData={field} index={index}/>
            )}
            </div>
          </div>
          <div className="my-4 grid grid-cols-2 gap-3">
            <button
              className="bg-white text-[#343434] text-sm font-semibold border border-[#D7D7D7] p-2 rounded-[8px] shadow-[0px_2px_4px_0px_#2E2E2E0F]"
              onClick={close}
              type="button"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-[#0F91D2] text-white text-sm font-semibold border border-[#0F91D2] p-2 rounded-[8px] shadow-[0px_2px_4px_0px_#2E2E2E0F]"
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function UploadedImage({imageData,index,handleRemoveImage}) {
  return (
    <div key={imageData.id} className="relative">
                    <img
                      src={imageData.preview} 
                      alt={`Image Preview ${index}`}
                      className="w-full aspect-square object-cover rounded-lg border"
                    />
                    {imageData.file && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs size-5 shadow-lg rounded-full"
                      >
                        X
                      </button>
                    )}
                  </div>
  )
}

