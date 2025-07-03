"use client";
import { User } from "@/types/type";
import { HeaderProvider } from "./headerProvider";

interface GetHeaderClientSideProps {
  user: string | User | null;
  data?: Record<string, unknown> | string;
  timestamp: number | string | undefined;
}

async function getClientPublicIP(): Promise<string> {
  try {
    const res = await fetch("https://api64.ipify.org?format=json");
    const data = await res.json();
    return data.ip || "Unknown";
  } catch (error) {
    console.error("Failed to fetch public IP:", error);
    return "Unknown";
  }
}

export default async function getHeaderClientSide({
  user,
  data,
  timestamp,
}: GetHeaderClientSideProps) {
  const key = await HeaderProvider({ data: data, timestamp: timestamp });
  let userToken = "";

  if (user && typeof user === "object") {
    userToken = user.access_token || "";
  }

  // Get timezone synchronously on client
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
  // Fetch the public IP address
  const ipAddress = await getClientPublicIP();

  const headers: { [key: string]: string } = {
    Accept: "application/json",
    Timestamp: `${timestamp}`,
    "Api-Access-Key": `${key.accessKey}`,
    "Ip-Address": ipAddress,
    Timezone: timezone,
  };

  if (user) {
    headers["Authorization"] = `Bearer ${userToken}`;
  }

  return headers;
}
