import { useRouter } from "next/router";
import { HiArrowNarrowLeft } from "react-icons/hi";
export default function Back() {
  const router = useRouter();
  return (
    <header>
      {router.pathname !== "/" && (
        <button
          onClick={() => router.back()}
          className="float-right flex items-center rounded-lg px-5 py-3 text-xs font-bold uppercase  hover:text-primary hover:shadow-lg hover:shadow-gray-200"
        >
          <HiArrowNarrowLeft />
          <span className="ml-2">Back</span>
        </button>
      )}
    </header>
  );
}
