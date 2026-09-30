import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Shows one rectangular region of a larger image at its natural proportions.
 * `crop` is [x, y, width, height] in the source image's pixels; the box takes the crop's aspect ratio
 * and the full image is positioned behind it so exactly that region is visible — no distortion.
 */
export default function ImageCrop({
  src,
  alt,
  width,
  height,
  crop: [x, y, w, h],
  sizes,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  crop: [number, number, number, number];
  sizes: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ aspectRatio: `${w} / ${h}` }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        quality={90}
        className="absolute max-w-none"
        style={{
          width: `${(width / w) * 100}%`,
          height: "auto",
          left: `${(-x / w) * 100}%`,
          top: `${(-y / h) * 100}%`,
        }}
      />
    </div>
  );
}
