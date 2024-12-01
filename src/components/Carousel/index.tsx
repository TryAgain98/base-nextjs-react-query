import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {images[currentIndex] && (
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex}`}
          className="w-full h-auto object-cover rounded-md "
        />
      )}

      {images.length > 1 && currentIndex != 0 && (
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-lg hover:bg-gray-800"
          aria-label="Previous"
          type="button"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
      )}

      {images.length > 1 && images.length - 1 !== currentIndex && (
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-lg hover:bg-gray-800"
          aria-label="Next"
          type="button"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ImageCarousel;
