import { ironSessionPassword } from "@/utils/envConfig";
import { SessionOptions } from "iron-session";

export async function getIronSessionPassword() {
  const key = `${ironSessionPassword}`;
  return key;
}

export async function getIronOptions(): Promise<SessionOptions> {
  const ironSessionPassword = await getIronSessionPassword();

  return {
    password: ironSessionPassword,
    cookieName: "boilerplate_App",
    cookieOptions: {
      secure: process.env.NEXT_PUBLIC_APP_ENV === "prod", 
    },
  };
}
