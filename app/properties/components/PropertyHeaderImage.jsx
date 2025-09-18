import Property from "@/models/Property";
import Image from "next/image";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const PropertyHeaderImage = ({ image }) => {
  return (
    <>
      <section>
        <div className="container-xl m-auto">
          <div className="grid grid-cols-1">
            <Image
              src={image}
              alt=""
              className="object-cover h-[400px] w-full"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowAltCircleLeft className="fas fa-arrow-left mr-2" />
            Back to Properties
          </Link>
        </div>
      </section>
    </>
  );
};

export default PropertyHeaderImage;
