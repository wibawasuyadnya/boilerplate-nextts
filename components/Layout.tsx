import React, {
    ReactNode,
    Fragment,
} from "react";
import { SessionData } from "@/types/type";
import { getSessionUser } from "@/lib/getUserSession";

interface LayoutType {
    children?: ReactNode;
    type?: string;
}

export default async function Layout({
    children,
    type
}: LayoutType) {
    // const session: SessionData = await getSessionUser();
    return (
        <Fragment>
            <div className={`mx-0 pb-5`}>
                <main>{children}</main>
            </div>
        </Fragment>
    );
}


