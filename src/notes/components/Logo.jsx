import logo from "../../assets/images/logo.svg";

export const Logo = ({ hidden }) => {
  return (
    <div
      className={`px-5 py-5 bg-[var(--blue-50)] ${
        hidden ? "hidden" : ""
      } w-full lg:bg-white`}
    >
      <img src={logo} alt="Logo" />
    </div>
  );
};
