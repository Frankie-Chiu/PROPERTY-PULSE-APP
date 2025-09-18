"use client";

import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages = ({ images }) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length > 0 && (
          <Gallery>
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <Item
                  key={index}
                  original={image}
                  thumbnail={image}
                  width="1000"
                  height="600"
                >
                  {({ ref, open }) => (
                    <div
                      className={`${
                        (images.length === 3 && index === 2) || images.length === 1
                          ? "col-span-2"
                          : "col-span-1"
                      }`}
                    >
                      <Image
                        ref={ref}
                        onClick={open}
                        className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                        src={image}
                        alt=""
                        width={1000}
                        height={600}
                        sizes="100vw"
                        priority={true}
                      />
                    </div>
                  )}
                </Item>
              ))}
            </div>
          </Gallery>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;