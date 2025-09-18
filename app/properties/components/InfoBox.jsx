import Link from "next/link";

const InfoBoxes = ({heading, children, backgroundColor="bg-gray-100", textColor="text-gray-800", buttonInfo}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>
        {children}
      </p>
      <Link
        href={buttonInfo.link}
        className={`${buttonInfo.backgroundColor} inline-block text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBoxes;

          // <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          //   <h2 className="text-2xl font-bold">For Property Owners</h2>
          //   <p className="mt-2 mb-4">
          //     List your properties and reach potential tenants. Rent as an
          //     airbnb or long term.
          //   </p>
          //   <a
          //     href="/add-property.html"
          //    className="inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          //   >
          //     Add Property
          //   </a>
          // </div>

// import Link from "next/link";

// const InfoBoxes = (props) => {
//   return (
//     <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold">{props.title}</h2>
//       <p className="mt-2 mb-4">
//         {props.p}
//       </p>
//       <Link
//         href={props.link}
//         className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
//       >
//         {props.btn}
//       </Link>
//     </div>
//   );
// };