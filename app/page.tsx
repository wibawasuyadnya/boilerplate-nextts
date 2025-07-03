"use server";
import Layout from "@/components/Layout";
import { SessionData } from "@/types/type";
import Section from "@/app/_components/Section";
import { getSessionUser } from "@/lib/getUserSession";

export default async function Home() {
  const session: SessionData = await getSessionUser();
  return (
    <div className="w-full h-full snap-y snap-mandatory ">
      <Layout type="mainpage">
        <Section session={session} />
      </Layout>
    </div>
  );
}