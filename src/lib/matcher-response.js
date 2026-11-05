// Shared boundary checks without importing the server's university catalog.
const record = value => Boolean(value && typeof value === 'object' && !Array.isArray(value));
const text = value => typeof value === 'string' && value.trim().length > 0 && value.length <= 10000;
const percent = value => Number.isFinite(value) && value >= 0 && value <= 100;

export function isUsableMatch(result) {
  if (!record(result) || !Array.isArray(result.universities) || result.universities.length > 3) return false;
  if (!result.universities.every(university => record(university)
    && ['name', 'program', 'code', 'city', 'tier', 'cscAgency', 'whyMatch', 'insiderTip'].every(key => text(university[key]))
    && percent(university.matchPercent)
    && (university.tuitionUSD === null || (Number.isFinite(university.tuitionUSD) && university.tuitionUSD >= 0)))) return false;
  if (!percent(result.cscProbability) || !text(result.cscTip) || !text(result.overallAdvice)) return false;
  return result.meta === undefined || (record(result.meta)
    && ['ai', 'curated-local'].includes(result.meta.source)
    && typeof result.meta.isPartial === 'boolean'
    && (!result.meta.isPartial || text(result.meta.notice)));
}

export function isUsableAiMatch(result) {
  return isUsableMatch(result) && result.universities.length === 3;
}
