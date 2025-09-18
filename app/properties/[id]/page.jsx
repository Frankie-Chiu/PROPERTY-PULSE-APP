import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeaderImage from "../components/PropertyHeaderImage";
import PropertyDetails from "../components/PropertyDetails";
import PropertyImages from "../components/PropertyImages";
import BookmarkButton from "../components/BookmarkButton";
import ShareButtons from "../components/ShareButton";
import PropertyContactForm from "../components/PropertyContactForm";
import { convertToSerializableObject } from "@/utils/convertToObject";

// const PropertyPage = async ({ params }) => {
//   await connectDB();
//   const property = await Property.findById(params.id).lean();
//   return (
//     <section>
//       <PropertyHeaderImage property={property} />
//       <PropertyDetails property={property}/>
//     </section>
//   );
// };

// export default PropertyPage;
export default async function PropertyPage({ params }) {
  try {
    await connectDB();
    const { id } = await params;
    const propertyDoc = await Property.findById(id).lean();
    const property = convertToSerializableObject(propertyDoc);
    if (!property) {
      return (
        <section>
          <div className="bg-white p-6 rounded-lg shadow-md text-center text-2xl font-bold mt-10">
            <p className="text-gray-500">Property not found.</p>
          </div>
        </section>
      );
    }
    return (
      <section>
        <div>
          <PropertyHeaderImage image={property.images[0]} />
        </div>
        <div className="bg-blue-50">
          <div className="container m-auto py-4 px-6"></div>
          <div className="grid grid-cols-[70%_30%] min-h-screen w-full gap-2">
            <div className="space-y-4 px-3">
              <PropertyDetails property={property} />
              <PropertyImages images={property.images} />
            </div>
            <aside className="space-y-4 mr-3 pr-3">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching property:", error);
    return (
      <section>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500">
            Error loading property data: {error.message}
          </p>
        </div>
      </section>
    );
  }
}
