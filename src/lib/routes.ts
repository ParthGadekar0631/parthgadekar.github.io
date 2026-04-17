export type AppRoute =
  | { kind: "home" }
  | { kind: "experience" }
  | { kind: "projects" }
  | { kind: "project-detail"; slug: string }
  | { kind: "skills" }
  | { kind: "education" }
  | { kind: "contact" };

const basePath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

function stripBasePath(pathname: string) {
  if (!basePath || basePath === "/") {
    return pathname;
  }

  if (pathname === basePath || pathname === `${basePath}/`) {
    return "/";
  }

  if (pathname.startsWith(`${basePath}/`)) {
    return pathname.slice(basePath.length) || "/";
  }

  return pathname;
}

export function parseRoute(pathname: string): AppRoute {
  const normalized = stripBasePath(pathname).replace(/\/+$/, "") || "/";

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

export function toAppPath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (!basePath || basePath === "/") {
    return normalized;
  }

  if (normalized === "/") {
    return `${basePath}/`;
  }

  return `${basePath}${normalized}`;
}

export function navigate(path: string) {
  const targetPath = toAppPath(path);

  if (window.location.pathname === targetPath) {
    return;
  }

  window.history.pushState({}, "", targetPath);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
