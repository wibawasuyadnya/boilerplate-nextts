"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { clearProfile } from "@/redux/slices/profileSlice";

const useUnauthorizedHandler = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleUnauthorized = async () => {
      try {
        await fetch("/api/auth/logout", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        // Clear user session
        dispatch(clearProfile());
        localStorage.removeItem("predictionStartTimes");
        localStorage.removeItem("animatedResults");

        // Redirect to login page
        router.push("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    // Listen for 401 errors
    window.addEventListener("api-unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("api-unauthorized", handleUnauthorized);
    };
  }, [dispatch, router]);
};

export default useUnauthorizedHandler;