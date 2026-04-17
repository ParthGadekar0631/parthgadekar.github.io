import { moduleConfigs, projects } from "../content/site";

let didValidate = false;

function assertUnique(values: string[], label: string) {
  const seen = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      throw new Error(`Duplicate ${label}: ${value}`);
    }

    seen.add(value);
  }
}

export function validateContentIntegrity() {
  if (didValidate) {
    return;
  }

  assertUnique(moduleConfigs.map((item) => item.id), "module id");
  assertUnique(moduleConfigs.map((item) => item.path), "module path");
  assertUnique(projects.map((item) => item.slug), "project slug");

  const moduleIds = new Set(moduleConfigs.map((item) => item.id));
  const projectSlugs = new Set(projects.map((item) => item.slug));

  if (projects.length !== 8) {
    throw new Error(`Expected 8 projects, found ${projects.length}`);
  }

  for (const project of projects) {
    if (!moduleIds.has(project.primaryModuleId)) {
      throw new Error(`Unknown module on project ${project.slug}: ${project.primaryModuleId}`);
    }
  }

  for (const module of moduleConfigs) {
    for (const slug of module.featuredProjectSlugs) {
      if (!projectSlugs.has(slug)) {
        throw new Error(`Unknown featured project on module ${module.id}: ${slug}`);
      }
    }
  }

  didValidate = true;
}
