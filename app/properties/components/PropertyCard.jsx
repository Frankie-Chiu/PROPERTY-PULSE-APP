import Image from "next/image";
import Link from "next/link";

import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <Link
        href={`/properties/${property._id}`}
      >
        <Image
          src={property.images[0]}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto rounded-t-xl"
        />
      </Link>
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {property.rates.monthly
            ? property.rates.monthly + "/mo"
            : property.rates.weekly
            ? property.rates.weekly + "/wk"
            : property.rates.nightly && property.rates.nightly + "/nt"}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="lg:inline" /> {property.beds}
            <span className="lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="lg:inline" /> {property.baths}
            <span className="lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="lg:inline" /> {property.square_feet}
            <span className="lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {property?.rates?.weekly && (
            <p>
              <FaMoneyBill className="lg:inline mb-1" /> Weekly
            </p>
          )}
          {property?.rates?.monthly && (
            <p>
              <FaMoneyBill className="lg:inline mb-1" /> Monthly
            </p>
          )}
          {property?.rates?.nightly && (
            <p>
              <FaMoneyBill className="lg:inline mb-1" /> Nightly
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="fa-solid fa-location-dot text-lg text-orange-700 lg:inline" />
            <span className="text-orange-700">
              {" "}
              {property.location.city} {property.location.state}{" "}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
