const ROUTE_KEY = 'shavat_last_route';

export function saveLastRoute(path: string) {
  if (typeof window !== 'undefined' && path !== '/') {
    localStorage.setItem(ROUTE_KEY, path);
  }
}

export function getLastRoute(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(ROUTE_KEY);
  }
  return null;
}

export function clearLastRoute() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ROUTE_KEY);
  }
}
