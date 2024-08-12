import { useRouter } from "next/router";
import { IoIosBackspace } from "react-icons/io";
export default function Cancel() {
  const router = useRouter();
  return (
    <header>
      <button
        onClick={() => router.back()}
        type="button"
        className="absolute top-14 right-20 flex items-center px-3 rounded-sm text-primary"
      >
        <IoIosBackspace className="w-8 h-12" />
        <span className="font-bold ml-1">Cancel</span>
      </button>
    </header>
  );
}
