//PropertyDetails.jsx
import connectDB from "@/config/database";

import {
  FaMapMarker,
  FaCheck,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
} from "react-icons/fa";
import PropertyMap from "./PropertyMap";

const PropertyDetails = ({ property }) => {
  if (!property) {
    return (
      <main>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500">Property data is not available.</p>
        </div>
      </main>
    );
  }
  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{property.type}</div>
        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FaMapMarker className="text-lg text-orange-700 mt-1 mr-2" />
          <p className="text-orange-700">
            {property.location.street} {property.location.city},{" "}
            {property.location.state} {property.location.zipcode}
          </p>
        </div>

        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
          Rates & Options
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center text-lg mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            {property.rates.nightly ? (
              <div className="flex items-center text-gray-500 mr-12 font-bold">
                <FaCheck className="inline-block mr-2 text-green-700" />
                Nightly ${property.rates.nightly.toLocaleString()}
              </div>
            ) : (
              <div className="flex items-center text-gray-500 mr-12 font-bold">
                <FaTimes className="inline-block mr-2 text-red-700" />
                Nightly
              </div>
            )}
            {property.rates.weekly ? (
              <div className="flex items-center text-gray-500 mr-12 font-bold">
                <FaCheck className="inline-block mr-2 text-green-700" />
                Weekly ${property.rates.weekly.toLocaleString()}
              </div>
            ) : (
              <div className="flex items-center text-gray-500 mr-12 font-bold">
                <FaTimes className="inline-block mr-2 text-red-700" />
                Weekly
              </div>
            )}
            {property.rates.monthly ? (
              <div className="flex items-center text-gray-500 mr-12 font-bold">
                <FaCheck className="inline-block mr-2 text-green-700" />
                Monthly ${property.rates.monthly.toLocaleString()}
              </div>
            ) : (
              <div className="flex items-center text-gray-500 mr-12 font-bold">
                <FaTimes className="inline-block mr-2 text-red-700" />
                Monthly
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-lg space-x-9">
          <p>
            <FaBed className="inline-block mr-2" /> {property.beds}{" "}
            <span className="sm:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline-block mr-2" /> {property.baths}{" "}
            <span className="sm:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-2" />
            {property.square_feet} <span className="sm:inline">sqft</span>
          </p>
        </div>
        <p className="text-gray-500 mb-4">{property.description}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
          {property.amenities.map((amenity, index) => (
            <li className="flex items-center" key={index}>
              <FaCheck className="inline-block mb-2 text-green-600 mr-2 mt-3" />
              {amenity}
            </li>
          ))}
          {/* {Array.isArray(property?.amenities) &&
          property.amenities.length > 0 ? (
            property.amenities.map((amenity, index) => (
              <li className="flex items-center" key={index}>
                <FaCheck className="inline-block mb-2 text-green-600 mr-2 mt-3" />
                {amenity}
              </li>
            ))
          ) : (
            <li>No amenities available</li>
          )} */}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <PropertyMap property={property}/>
      </div>
    </main>
  );
};

export default PropertyDetails;
