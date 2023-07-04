import { BsLink45Deg } from "react-icons/bs";

const Brand = ({ size = "text-2xl" }) => {
  return (
    <h1
      className={`${size} flex items-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-300 font-nasa`}
    >
      <span>rtk</span>
      <BsLink45Deg className={`${size} text-cyan-500 font-extrabold`} />
      <span>link</span>
    </h1>
  );
};
export default Brand;
