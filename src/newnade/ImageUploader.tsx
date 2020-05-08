import { ChangeEvent, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import { Button } from "semantic-ui-react";

type Props = {
  onImageCropped: (croppedImageBase64: string) => void;
};

export const ImageUploader = ({ onImageCropped }: Props) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [crop, setCrop] = useState<ReactCrop.Crop>({
    aspect: 16 / 9,
    unit: "%",
    width: 100,
  });

  function onSelectFileClick() {
    fileInputRef.current?.click();
  }

  function onSelectFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      function onReaderImageLoaded() {
        setImageSrc(reader.result as string);
      }

      reader.addEventListener("load", onReaderImageLoaded);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoaded(image: HTMLImageElement) {
    setImage(image);
  }

  function onCropComplete(_: ReactCrop.Crop, __: ReactCrop.PercentCrop) {
    // @no-op
  }

  function onCropChange(crop: ReactCrop.Crop, _: ReactCrop.PercentCrop) {
    setCrop(crop);
  }

  function cropImage() {
    if (!image) {
      console.error("No image");
      return;
    }
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width || 0;
    canvas.height = crop.height || 0;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("CTX err", ctx);
      return;
    } else if (crop.x === undefined) {
      console.error("crop x err", crop);
      return;
    } else if (crop.y === undefined) {
      console.error("crop y err", crop);
      return;
    } else if (crop.width === undefined) {
      console.error("crop width err", crop);
      return;
    } else if (crop.height === undefined) {
      console.error("crop height err", crop);
      return;
    }

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");

    onImageCropped(base64Image);

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error("Failed to load image blob");
            return reject("Failed to load image blob");
          }
          // @ts-ignore
          blob.name = "test";
          resolve(blob);
        },
        "image/jpeg",
        1
      );
    });
  }

  return (
    <>
      <div className="image-uploader">
        <input
          hidden
          ref={fileInputRef}
          type="file"
          accept="image/jpeg"
          onChange={onSelectFile}
        />
        <div className="file-selector-btn">
          <Button onClick={onSelectFileClick} color="teal">
            Add image
          </Button>
          {image && (
            <>
              <br />
              <Button positive onClick={cropImage}>
                Submit
              </Button>
            </>
          )}
        </div>
        {!image && (
          <img
            width="100%"
            src="https://www.urbansplash.co.uk/images/placeholder-16-9.jpg"
            alt="Placeholder for result image"
          />
        )}

        <ReactCrop
          src={imageSrc}
          crop={crop}
          maxWidth={1000}
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
          ruleOfThirds
        />
      </div>
      <style jsx>{`
        .image-uploader {
          max-width: 1200px;
          display: block;
        }

        .file-selector-btn {
          margin-bottom: 12px;
          display: flex;
        }
      `}</style>
    </>
  );
};
