import { universities } from '@/data/universities';

const MAJOR_RULES = {
  MBBS: {
    label: 'Medicine (MBBS)',
    keywords: ['medicine', 'mbbs', 'clinical', 'medical', 'pharmacy', 'public health', 'nursing'],
  },
  STEM: {
    label: 'Engineering / STEM',
    keywords: ['engineering', 'computer', 'science', 'technology', 'robotics', 'data', 'math', 'physics'],
  },
  Business: {
    label: 'Business / Economics',
    keywords: ['business', 'economics', 'finance', 'management', 'mba'],
  },
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function normalizeGpa(gpa) {
  const value = Number.parseFloat(gpa?.value);
  if (!Number.isFinite(value)) return null;
  if (gpa.scale === 'four') return (value / 4) * 100;
  if (gpa.scale === 'five') return (value / 5) * 100;
  return value;
}

function programFor(university, major) {
  const rule = MAJOR_RULES[major];
  if (!rule) return university.programs[0];

  return university.programs.find((program) => {
    const normalized = program.toLowerCase();
    return rule.keywords.some((keyword) => normalized.includes(keyword));
  });
}

function admissionThreshold(university) {
  const explicit = university.admissionTips?.match(/GPA[^.]{0,60}?(\d(?:\.\d)?)\+?\/4(?:\.0)?/i);
  if (explicit) return Number.parseFloat(explicit[1]) * 25;
  if (university.tier === 'C9 League') return 82;
  return 72;
}

function tuitionMidpoint(tuitionRange) {
  const values = [...tuitionRange.matchAll(/[\d,]+/g)].map((match) => Number(match[0].replaceAll(',', '')));
  if (values.length === 0) return null;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function roleCopy(role) {
  if (role === 'aspirational') return 'an aspirational option worth testing with a strong application';
  if (role === 'safer') return 'a comparatively safer option for a balanced shortlist';
  return 'a realistic option near the center of your current academic profile';
}

export function createLocalMatch({ nationality, major, gpa }) {
  const gpaPercent = normalizeGpa(gpa);
  const rule = MAJOR_RULES[major];
  if (!rule || gpaPercent === null) return null;

  const candidates = universities
    .map((university) => ({
      university,
      program: programFor(university, major),
      threshold: admissionThreshold(university),
    }))
    .filter((candidate) => candidate.program)
    .sort((a, b) => b.threshold - a.threshold || a.university.qsRank - b.university.qsRank);

  if (candidates.length < 3) return null;

  const unused = new Set(candidates);
  const take = (sortedCandidates) => {
    const candidate = sortedCandidates.find((item) => unused.has(item));
    if (candidate) unused.delete(candidate);
    return candidate;
  };

  const aspirational = take(
    candidates.toSorted((a, b) => {
      const aGap = a.threshold >= gpaPercent ? a.threshold - gpaPercent : 100 + gpaPercent - a.threshold;
      const bGap = b.threshold >= gpaPercent ? b.threshold - gpaPercent : 100 + gpaPercent - b.threshold;
      return aGap - bGap || a.university.qsRank - b.university.qsRank;
    }),
  );
  const realistic = take(
    candidates.toSorted((a, b) => Math.abs(a.threshold - gpaPercent) - Math.abs(b.threshold - gpaPercent)),
  );
  const safer = take(
    candidates.toSorted((a, b) => {
      const aScore = a.threshold <= gpaPercent ? a.threshold : 100 + a.threshold;
      const bScore = b.threshold <= gpaPercent ? b.threshold : 100 + b.threshold;
      return aScore - bScore || b.university.qsRank - a.university.qsRank;
    }),
  );

  const ranked = [
    ['aspirational', aspirational],
    ['realistic', realistic],
    ['safer', safer],
  ];

  return {
    universities: ranked.map(([role, candidate]) => {
      const { university, program, threshold } = candidate;
      const academicFit = clamp(94 - Math.abs(gpaPercent - threshold) * 1.5, 25, 94);
      return {
        name: university.name,
        code: university.code,
        cscAgency: university.cscAgency,
        city: `${university.city}, China`,
        tier: university.tier,
        matchPercent: Math.round(academicFit),
        program,
        tuitionUSD: tuitionMidpoint(university.tuitionRange),
        whyMatch: `${university.name} offers ${program} and is ${roleCopy(role)}. ${university.description}`,
        insiderTip: university.admissionTips,
        role,
        slug: university.slug,
      };
    }),
    cscProbability: clamp(Math.round((gpaPercent - 55) * 1.35), 5, 72),
    cscTip: 'Treat this as a planning range, then verify current scholarship rules and deadlines with the university and CSC.',
    overallAdvice: `Use these three ${rule.label} options as a balanced starting shortlist. Confirm language, nationality, program, and scholarship eligibility before applying.`,
    meta: {
      source: 'curated-local',
      isPartial: true,
      notice: 'AI analysis is temporarily unavailable, so this shortlist uses PandaOffer’s curated university data and your GPA.',
      profile: { nationality, major, gpaPercent: Math.round(gpaPercent) },
    },
  };
}

export function isUsableAiMatch(result) {
  return Boolean(
    result
      && Array.isArray(result.universities)
      && result.universities.length === 3
      && result.universities.every((university) => university?.name && university?.program),
  );
}
