import { Dispatch, SetStateAction, useEffect } from "react";

export default function useTimer(
  isError: boolean,
  setIsError: Dispatch<SetStateAction<boolean>>,
  setMessage: Dispatch<SetStateAction<any>>,
  setAuthorize?: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsError(false);
      setMessage(undefined);
      setAuthorize?.(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isError]);
}

// export default function useTimer2(
//   error: {
//     isError: boolean;
//     message: any;
//   },
//   setError: Dispatch<
//     SetStateAction<{
//       isError: boolean;
//       message: any;
//     }>
//   >
// ) {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setError({ isError: false, message: undefined });
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [error]);
// }
