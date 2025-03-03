import iconPlus from "../../assets/images/icon-plus.svg";

export const CreateNewButton = () => {
  return (
    <button className="fixed bottom-25 right-5 bg-indigo-600 text-white rounded-[50%] hover:cursor-pointer w-12 h-12 flex items-center justify-center text-4xl lg:hidden">
      {/* {iconPlus} */}
      <img className="filter invert" src={iconPlus} alt="Icon Plus" />
    </button>
  );
};
