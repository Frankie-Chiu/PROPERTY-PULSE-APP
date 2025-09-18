import Cliploader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "100px auto",
}

const LoadingPage = () => {
    return ( <Cliploader color="#3B82F6" cssOverride={override} size={150} aria-label="loading spinner" /> );
}
 
export default LoadingPage;

// import Cliploader from "react-spinners/ClipLoader";

// const LoadingPage = ({loading}) => {
//     return ( <Cliploader color="#36d7b7" loading={loading} size={50} aria-babel="loading spinner" /> );
// }
 
// export default LoadingPage;