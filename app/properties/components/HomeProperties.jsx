import PropertyCard from "./PropertyCard";
import Link from "next/link";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const HomeProperties = async () => {
  await connectDB();
  const HomeProperties = await Property.find({})
  .sort({createAct: -1})
  .limit(3)
  .lean();
  return (
    <section>
      <div className="lg:container m-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-blue-500 text-center mb-5">
          Recent Listed Properties
        </h2>
      </div>
      <div className="container-xl container:lg mt-auto">
        {HomeProperties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HomeProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
      <div className="m-auto max-w-md my-6 px-4 py-2">
        <Link
          href="/properties"
          className="block bg-black hover:bg-gray-400 rounded-lg text-lg text-white text-center px-2 py-3"
        >
          View All Properties
        </Link>
      </div>
    </section>
  );
};

export default HomeProperties;
