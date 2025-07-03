"use server";
import { secretKey } from "@/utils/envConfig";
import { generateAccessKey } from "@/utils/generateAccessKey";

interface HeaderProviderProps {
  data?: Record<string, unknown> | string;
  timestamp: number | string | undefined;
}

export async function HeaderProvider({ data, timestamp }: HeaderProviderProps) {
  const secret = secretKey;
  const accessKey = generateAccessKey({ data, timestamp, secret });
  return { accessKey };
}
