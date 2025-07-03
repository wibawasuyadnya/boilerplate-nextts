"use server";

import { User } from "@/types/type";
import { secretKey } from "@/utils/envConfig";
import { generateAccessKey } from "@/utils/generateAccessKey";
import { decrypt } from "../utils/sessionEncrypt";
import { headers } from "next/headers";

async function getPublicIP(): Promise<string> {
  try {
    const res = await fetch("https://api64.ipify.org?format=json");
    const data = await res.json();
    return data.ip || "Unknown";
  } catch (error) {
    console.error("Failed to fetch public IP:", error);
    return "Unknown";
  }
}

interface GetHeaderProps {
  user?: User | string | null;
  data?: Record<string, unknown> | string | FormData;
  timestamp?: number | string | undefined;
  multipart?: boolean;
}

export default async function getHeader({
  user,
  data,
  timestamp,
  multipart = false,
}: GetHeaderProps) {
  const secret = secretKey;
  const accessKey = generateAccessKey({ data, timestamp, secret });
  let user_token = "";
  let decrypt_data: User | null = null;

  if (typeof user === "string") {
    try {
      decrypt_data = JSON.parse(await decrypt(user)) as User;
      user_token = decrypt_data?.access_token || "";
    } catch (error) {
      console.error("Failed to decrypt user:", error);
    }
  } else if (user) {
    user_token = user.access_token || "";
  }

  // **Get Client IP Address using headers()**
  const headersList = headers();
  let ipAddress =
    (await headersList).get("x-forwarded-for") ||
    (await headersList).get("cf-connecting-ip") ||
    (await headersList).get("x-real-ip") ||
    "Unknown";

  // Handle multiple IPs (e.g., "192.168.1.1, 203.0.113.10")
  if (ipAddress.includes(",")) {
    ipAddress = ipAddress.split(",")[0].trim();
  }

  // Convert `::1` to `127.0.0.1` for localhost
  if (ipAddress === "::1" || ipAddress === "127.0.0.1") {
    ipAddress = await getPublicIP(); 
  }

  // **Get User Timezone**
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";

  const responseHeaders: { [key: string]: string } = {
    Timestamp: `${timestamp}`,
    "Api-Access-Key": `${accessKey}`,
    "Ip-Address": ipAddress,
    Timezone: timezone,
  };

  if (multipart) {
    responseHeaders["Content-Type"] = "multipart/form-data";
  } else {
    responseHeaders["Content-Type"] = "application/json";
  }

  if (user_token) {
    responseHeaders["Authorization"] = `Bearer ${user_token}`;
  }

  return responseHeaders;
}
