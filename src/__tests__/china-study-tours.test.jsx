import React from 'react';
import fs from 'fs';
import pathModule from 'path';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import ChinaStudyToursPage from '@/app/china-study-tours/page';
import StudyTourSeoPage from '@/components/study-tours/StudyTourSeoPage';
import { seoTourPages } from '@/data/studyTours';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }) =>
    React.createElement('a', { href, ...props }, children),
}));

vi.mock('next/image', () => ({
  default: ({ fill, priority, ...props }) =>
    React.createElement('img', {
      ...props,
      src: props.src?.src || props.src,
      alt: props.alt || '',
    }),
}));

vi.mock('@/components/layout/Navbar', () => ({
  default: () => React.createElement('nav', { 'aria-label': 'Main navigation' }),
}));

vi.mock('@/components/layout/Footer', () => ({
  default: () => React.createElement('footer', null, 'PandaOffer'),
}));

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getLinkedText = (container) =>
  [...container.querySelectorAll('a[href]')].map((link) =>
    link.textContent.replace(/\s+/g, ' ').trim()
  );

const validInternalRoutes = new Set([
  '/blog/china-study-tours-healthcare-ai-tech-company-visits',
  '/blog/mbbs-in-china-who-recognized',
  '/china-ai-company-visits',
  '/china-healthcare-study-tour',
  '/china-study-tours',
  '/china-tech-company-study-tour',
  '/mba-china-innovation-tour',
  '/study-in-china',
  '/tools/advisor',
]);

const validDynamicRoutes = [];

function expectResolvableLinks(container) {
  const anchors = [...container.querySelectorAll('a[href]')];

  expect(anchors.length).toBeGreaterThan(0);

  anchors.forEach((anchor) => {
    const href = anchor.getAttribute('href');

    if (href.startsWith('#')) {
      expect(container.querySelector(href), `${href} should point to an existing section`).not.toBeNull();
      return;
    }

    if (href.startsWith('/')) {
      const linkPath = href.split('#')[0].split('?')[0];
      const hash = href.includes('#') ? `#${href.split('#')[1]}` : null;
      if (linkPath === '/china-study-tours' && hash) {
        expect(container.querySelector(hash), `${href} should point to an existing section`).not.toBeNull();
      }
      const publicAssetPath = linkPath.startsWith('/') ? linkPath.slice(1) : linkPath;
      const isPublicAsset =
        /\.[a-z0-9]+$/i.test(linkPath) && fs.existsSync(pathModule.join(process.cwd(), 'public', publicAssetPath));
      if (isPublicAsset) return;

      const isKnownRoute =
        validInternalRoutes.has(linkPath) || validDynamicRoutes.some((pattern) => pattern.test(linkPath));
      expect(isKnownRoute, `${href} should be a known internal route`).toBe(true);
      return;
    }

    expect(href.startsWith('mailto:'), `${href} should be a supported external link`).toBe(true);
  });
}

const clickableContentTitles = [
  'University Discovery',
  'Mandarin & Culture',
  'Future China',
  'MBBS & Health Preview',
  'Healthcare Industry Study',
  'AI & Tech Company Visits',
  'Beijing Academic Route',
  'Shanghai + Hangzhou Innovation Route',
  'Chengdu Culture + Campus Route',
  'Hospital Operations',
  'Doctor-Led Clinical Visit',
  'Medical Service Innovation',
  'Biopharma & Devices',
  'Market Insight',
  'Half-Day Hospital Deep Visit',
  'One-Day Healthcare Operations Route',
  'Shanghai + Hangzhou Digital Health Route',
  'Guangzhou + Shenzhen MedTech Route',
  'Beijing Policy + Hospital Management Route',
  "Xi'an + Wuhan Central China Medical Ecosystem",
  'AI Applications',
  'Digital Platforms',
  'Smart Hardware',
  'Industrial Tech',
  'Shanghai AI + Enterprise Tech Route',
  'Hangzhou Digital Economy Route',
  'Shenzhen Robotics + Hardware Route',
  'Guangzhou + Shenzhen Cross-Border Tech Route',
  'Beijing AI Policy + Research Route',
  "Wuhan + Xi'an Central China Tech Route",
];

describe('China study tours page', () => {
  it('makes every study-tour content card reachable through a link', () => {
    const { container } = render(<ChinaStudyToursPage />);
    const linkedText = getLinkedText(container);

    clickableContentTitles.forEach((title) => {
      const matchingLinks = linkedText.filter((text) => new RegExp(escapeRegex(title), 'i').test(text));

      expect(matchingLinks.length, `${title} should be rendered inside a link`).toBeGreaterThan(0);
    });
  });

  it('makes SEO landing-page route modules reachable through links', () => {
    const page = seoTourPages.aiCompanies;
    const { container } = render(<StudyTourSeoPage page={page} />);
    const linkedText = getLinkedText(container);
    const expectedTitles = [
      ...page.modules.map((module) => module.title),
      ...page.sampleRoutes.map((route) => route.title),
    ];

    expectedTitles.forEach((title) => {
      const matchingLinks = linkedText.filter((text) => new RegExp(escapeRegex(title), 'i').test(text));

      expect(matchingLinks.length, `${title} should be rendered inside a link`).toBeGreaterThan(0);
    });
  });

  it('does not render unresolved study-tour page links', () => {
    const { container } = render(<ChinaStudyToursPage />);
    expectResolvableLinks(container);
  });

  it('shows contact details beside downloadable study-tour brochures', () => {
    const { container, getAllByText } = render(<ChinaStudyToursPage />);

    expect(getAllByText('hello@pandaoffer.top').length).toBeGreaterThanOrEqual(3);
    expect(container.querySelectorAll('a[href^="mailto:hello@pandaoffer.top"]').length).toBeGreaterThanOrEqual(3);
    expect(container.querySelectorAll('a[download][href^="/brochures/"]').length).toBe(3);
  });

  it('does not render unresolved SEO landing-page links', () => {
    Object.values(seoTourPages).forEach((page) => {
      const { container, unmount } = render(<StudyTourSeoPage page={page} />);
      expectResolvableLinks(container);
      unmount();
    });
  });
});
