import crypto from "crypto";

interface GenerateAccessKeyProps {
  data?: Record<string, any> | string;
  timestamp?: number | string | undefined;
  secret: string | undefined;
}

export const generateAccessKey = ({
  data = "",
  timestamp,
  secret,
}: GenerateAccessKeyProps): string => {
  if (!secret) {
    throw new Error("Secret key is required but not provided.");
  }
  if (!timestamp) {
    throw new Error("Timestamp is required but not provided.");
  }

  const dataString = typeof data === "string" ? data : JSON.stringify(data);
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${dataString}.${timestamp}`)
    .digest("hex");
  return `${signature}`;
};
