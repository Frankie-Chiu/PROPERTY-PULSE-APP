// "use client";
// import {
//   useRouter,
//   useParams,
//   useSearchParams,
//   usePathname,
// } from "next/navigation";

// const PropertyPageId = ({params, searchParams}) => {
//     const router = useRouter();
//     const params = useParams();
//     const searchParams = useSearchParams();
//     const pathname = usePathname();
//     console.log(router);

//   return (
//     <div>
//       <h1>Property Page {params.id} {searchParams.name}</h1>
//     </div>
//   );
// };

// export default PropertyPageId;

import PropertyAddForm from "../components/PropertyAddForm";

const PropertyPageAdd = () => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-xl rounded-md m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};

export default PropertyPageAdd;
