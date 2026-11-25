import { useSearchParams } from "react-router-dom";
import Listing from "./Listing";

export default function SearchRoute() {
  const [params] = useSearchParams();
  return <Listing search={params.get("q") ?? ""} />;
}
