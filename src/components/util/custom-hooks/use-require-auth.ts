import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useRequireAuth(){
  const { data: sessionData, status: sessionStatus } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (sessionStatus != 'authenticated') {
      router.push("/api/auth/signin");
    };
  
  }, [sessionStatus, router]);

  return sessionData
};
