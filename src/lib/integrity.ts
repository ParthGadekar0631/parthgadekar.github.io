import { caseStudies, moduleConfigs, projects } from "../content/site";

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
  assertUnique(caseStudies.map((item) => item.slug), "case study slug");

  const moduleIds = new Set(moduleConfigs.map((item) => item.id));

  for (const project of projects) {
    if (!moduleIds.has(project.primaryModuleId)) {
      throw new Error(`Unknown module on project ${project.slug}: ${project.primaryModuleId}`);
    }
  }

  for (const caseStudy of caseStudies) {
    if (!moduleIds.has(caseStudy.moduleId)) {
      throw new Error(`Unknown module on case study ${caseStudy.slug}: ${caseStudy.moduleId}`);
    }
  }

  didValidate = true;
}
