import { useParams } from "react-router";
import { getNoteById } from "../helpers/getNoteById";

export const Note = () => {
  const { id } = useParams();
  return <div>Note</div>;
};
