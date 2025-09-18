//@/properties/search-results/page.jsx

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import PropertyCard from "../components/PropertyCard";
import PropertySearchForm from "../components/PropertySearchForm";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResults = async ({ searchParams }) => {
  console.log("searchParams:", searchParams); // Debug query parameters

  await connectDB();

  const { location, propertyType } = searchParams;

  // Initialize an empty query object
  let query = {};

  // Normalize location: Handle undefined, null, arrays, and non-strings
  let locationString = null;
  if (Array.isArray(location)) {
    locationString = typeof location[0] === "string" ? location[0] : null;
  } else if (typeof location === "string") {
    locationString = location;
  }

  // Add location-based filters if location is a non-empty string
  if (locationString && locationString.trim() !== "") {
    const normalizedLocation = locationString.replace(/\s+/g, " ").trim();
    const locationPattern = new RegExp(normalizedLocation, "i");
    query.$or = [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ];
  }

  // Normalize propertyType: Handle undefined, null, arrays, and non-strings
  let propertyTypeString = null;
  if (Array.isArray(propertyType)) {
    propertyTypeString =
      typeof propertyType[0] === "string" ? propertyType[0] : null;
  } else if (typeof propertyType === "string") {
    propertyTypeString = propertyType;
  }

  // Add propertyType filter if not "All"
  if (
    propertyTypeString &&
    propertyTypeString !== "All" &&
    propertyTypeString.trim() !== ""
  ) {
    query.type = { $eq: propertyTypeString.trim() };
  }

  console.log("MongoDB Query:", query); // Debug the query
  const propertyQueryResult = await Property.find(query).lean();
  console.log(
    "Returned Types:",
    propertyQueryResult.map((p) => p.type)
  ); // Debug returned types
  const properties = convertToSerializableObject(propertyQueryResult);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="py-4 px-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" />
            Back To Properties
          </Link>
          <h1 className="font-bold text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>No Search Results</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResults;
