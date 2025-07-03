"use client";
import { SessionData } from "@/types/type";
import { useEffect, useRef } from "react";
import { useDecryptedUserHook } from "./useDecryptedUser";
import { useAppDispatch } from "@/redux/hook";
import getHeader from "@/lib/getHeader";
import { api } from "@/helper/external-api/apiClient";
import fetcher from "@/lib/fetchJson";
import { useRouter } from "next/navigation";

const INACTIVITY_TIMEOUT = 3600000;
const EVENTS = [
  "mousedown",
  "mousemove",
  "keydown",
  "wheel",
  "touchstart",
  "scroll",
];

interface useIdleProps {
  session: SessionData;
}

export const useIdleLogoutHook = ({ session }: useIdleProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const user = useDecryptedUserHook(session.user);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      logoutUser();
    }, INACTIVITY_TIMEOUT);
  };

  const logoutUser = async () => {
    try {
      const headers = await getHeader({ user: session.user, timestamp: Date.now() });

      if (!session.isLoggedIn || user?.access_token?.length === 0) return;
      const response = await api<Response>({
        endpoint: "/api/auth/logout",
        method: "POST",
        options: { headers },
      });

      if (response) {
        await fetcher("/api/auth/logout", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        router.refresh();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const handleActivity = () => resetTimeout();

    EVENTS.forEach((event) =>
      window.addEventListener(event, handleActivity, { passive: true })
    );

    resetTimeout();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      EVENTS.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, []);

  return null;
};
