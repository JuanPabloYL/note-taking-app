import { useNavigate } from "react-router";
import logo from "../../assets/images/logo.svg";

export const Logo = ({ hidden }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div
      className={`px-5 py-5 bg-[var(--blue-50)] hover:cursor-pointer ${
        hidden ? "hidden" : ""
      } w-full lg:bg-white`}
      onClick={handleClick}
    >
      <img src={logo} alt="Logo" />
    </div>
  );
};
