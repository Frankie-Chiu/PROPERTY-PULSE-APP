import Cliploader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = () => {
  return (
    <Cliploader
      color="#3B82F6"
      cssOverride={override}
      size={150}
      aria-label="loading spinner"
    />
  );
};

export default Spinner;
