import { SlEnergy } from "react-icons/sl";

const BrandInvoice = ({ size = "text-2xl" }) => {
  return (
    <h1 className={`${size} text-cyan-500 font-extrabold flex items-center`}>
      <SlEnergy className={`${size} text-cyan-500 font-extrabold`} />
      <span>empyreal energy</span>
    </h1>
  );
};
export default BrandInvoice;
