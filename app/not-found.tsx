import { getSessionUser } from "@/lib/getUserSession";
import NotFoundWrapper from "@/components/Layout-Components/NotFoundWrapper";

export default async function NotFound() {
    const session = await getSessionUser();
    return <NotFoundWrapper session={session} />;
}
