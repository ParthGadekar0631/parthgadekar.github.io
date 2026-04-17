export type AppRoute =
  | { kind: "home" }
  | { kind: "experience" }
  | { kind: "projects" }
  | { kind: "project-detail"; slug: string }
  | { kind: "skills" }
  | { kind: "education" }
  | { kind: "contact" };

export function parseRoute(pathname: string): AppRoute {
  const normalized = pathname.replace(/\/+$/, "") || "/";

  if (normalized === "/") {
    return { kind: "home" };
  }

  if (normalized === "/experience") {
    return { kind: "experience" };
  }

  if (normalized === "/projects") {
    return { kind: "projects" };
  }

  if (normalized.startsWith("/projects/")) {
    return { kind: "project-detail", slug: normalized.slice("/projects/".length) };
  }

  if (normalized === "/skills") {
    return { kind: "skills" };
  }

  if (normalized === "/education") {
    return { kind: "education" };
  }

  if (normalized === "/contact") {
    return { kind: "contact" };
  }

  return { kind: "home" };
}

export function navigate(path: string) {
  if (window.location.pathname === path) {
    return;
  }

  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
