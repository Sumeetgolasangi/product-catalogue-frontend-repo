import { useParams } from "react-router-dom";
import Listing from "./Listing";

export default function CategoryRoute() {
  const { name = "" } = useParams();
  return <Listing category={decodeURIComponent(name)} />;
}
