import logo from "../../assets/images/logo.svg";

export const Logo = () => {
  return (
    <div className="px-5 py-5 bg-[var(--blue-50)]">
      <img src={logo} alt="Logo" />
    </div>
  );
};
