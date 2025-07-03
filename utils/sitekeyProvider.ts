"use server";
import { captchaSitekey } from "@/utils/envConfig";

export async function SiteKeyProvider() {
    const sitekey = `${captchaSitekey}`;
    return { sitekey };
}
