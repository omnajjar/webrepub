export function isActiveRoute(
  currentRoute: string,
  targetRoute: string
): boolean {
  return currentRoute === targetRoute || currentRoute.includes(targetRoute);
}

export function joinRoutes(mainRoute: string, nestedRout: string): string {
  return mainRoute + nestedRout;
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
