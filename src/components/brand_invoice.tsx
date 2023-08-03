import { BsLink45Deg } from "react-icons/bs";

const BrandInvoice = ({ size = "text-2xl" }) => {
  return (
    <h1 className={`${size} text-cyan-500 font-extrabold flex items-center`}>
      <span>rtk</span>
      <BsLink45Deg className={`${size} text-cyan-500 font-extrabold`} />
      <span>link</span>
    </h1>
  );
};
export default BrandInvoice;
