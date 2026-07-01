import { Analytics } from "@vercel/analytics/next";
import ProjectsClient from "./ProjectsClient";
import { getMergedProjects } from "@/lib/project-sync";

export const revalidate = 3600;

export default async function ProjectsPage() {
  const items = await getMergedProjects();

  return (
    <>
      <ProjectsClient items={items} />
      <Analytics />
    </>
  );
}
