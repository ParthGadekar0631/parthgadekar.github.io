export type AppRoute =
  | { kind: "home" }
  | { kind: "copilot" }
  | { kind: "projects" }
  | { kind: "project-detail"; slug: string }
  | { kind: "case-studies" }
  | { kind: "case-study-detail"; slug: string }
  | { kind: "about" };

export function parseRoute(pathname: string): AppRoute {
  const normalized = pathname.replace(/\/+$/, "") || "/";

  if (normalized === "/") {
    return { kind: "home" };
  }

  if (normalized === "/copilot") {
    return { kind: "copilot" };
  }

  if (normalized === "/projects") {
    return { kind: "projects" };
  }

  if (normalized.startsWith("/projects/")) {
    return { kind: "project-detail", slug: normalized.slice("/projects/".length) };
  }

  if (normalized === "/case-studies") {
    return { kind: "case-studies" };
  }

  if (normalized.startsWith("/case-studies/")) {
    return { kind: "case-study-detail", slug: normalized.slice("/case-studies/".length) };
  }

  if (normalized === "/about") {
    return { kind: "about" };
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
