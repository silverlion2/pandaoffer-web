const BASE_MIN = 86;
const BASE_MAX = 486;

export function normalizeRoutePath(value) {
  if (!value || typeof value !== 'string') return '/';

  let path = value.trim();

  try {
    path = new URL(path, 'https://www.pandaoffer.top').pathname;
  } catch {
    path = path.split('#')[0].split('?')[0];
  }

  if (!path.startsWith('/')) path = `/${path}`;
  path = path.replace(/\/{2,}/g, '/');
  path = path.length > 1 ? path.replace(/\/+$/, '') : path;

  return path || '/';
}

export function getRouteVoteBaseCount(path) {
  const normalizedPath = normalizeRoutePath(path);
  const range = BASE_MAX - BASE_MIN + 1;
  let hash = 0;

  for (let index = 0; index < normalizedPath.length; index += 1) {
    hash = (hash * 31 + normalizedPath.charCodeAt(index)) >>> 0;
  }

  return BASE_MIN + (hash % range);
}

export function buildRouteVoteStats(path, realCount = 0, userHasVoted = false) {
  const routePath = normalizeRoutePath(path);
  const safeRealCount = Number.isFinite(Number(realCount)) ? Math.max(0, Number(realCount)) : 0;
  const baseCount = getRouteVoteBaseCount(routePath);

  return {
    routePath,
    baseCount,
    realCount: safeRealCount,
    displayCount: baseCount + safeRealCount,
    userHasVoted: Boolean(userHasVoted),
  };
}
