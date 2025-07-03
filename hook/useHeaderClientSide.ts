"use client";
import { HeaderProvider } from "@/lib/headerProvider";
import { User } from "@/types/type";
import { useEffect, useState } from "react";

interface UseHeaderProps {
  user: string | User | null;
  data?: Record<string, unknown> | string;
  timestamp: number | string | undefined;
}

export function useHeaderClientSide({ user, data, timestamp }: UseHeaderProps) {
  const [headers, setHeaders] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const generateHeaders = async () => {
      try {
        const { accessKey } = await HeaderProvider({ data, timestamp });

        let userToken = "";
        if (user && typeof user === "object") {
          userToken = user.access_token || "";
        }

        const headers: { [key: string]: string } = {
          Accept: "application/json",
          Timestamp: `${timestamp}`,
          "Api-Access-Key": `${accessKey}`,
        };

        if (user) {
          headers["Authorization"] = `Bearer ${userToken}`;
        }

        setHeaders(headers);
      } catch (error) {
        console.error("Failed to generate headers:", error);
      }
    };

    generateHeaders();
  }, [user, data, timestamp]);

  return headers;
}
