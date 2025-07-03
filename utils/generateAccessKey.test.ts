import { secretKey } from "./envConfig";
import { generateAccessKey } from "./generateAccessKey";

const body = {
  username: "Kadek_G",
  password: "Bahasa123",
};
const timestamp = Date.now();
const secret = secretKey;

try {
  const accessKey = generateAccessKey({ data: body, timestamp, secret });
  console.log(accessKey);
  console.log(timestamp);
} catch (error) {
  console.error("Error generating access key:");
}
