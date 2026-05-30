import { notFound } from 'next/navigation';
import MajorLandingPage, {
  generateMetadata as generateMajorMetadata,
  generateStaticParams as generateMajorStaticParams,
} from '../study-[major]-in-china/page';

export const dynamicParams = false;

const majorRoutePattern = /^study-(.+)-in-china$/;

async function getMajorParams(params) {
  const { slug } = await params;
  const match = majorRoutePattern.exec(slug);

  if (!match) {
    notFound();
  }

  return { major: match[1] };
}

export function generateStaticParams() {
  return generateMajorStaticParams().map(({ major }) => ({
    slug: `study-${major}-in-china`,
  }));
}

export async function generateMetadata({ params }) {
  const majorParams = await getMajorParams(params);
  return generateMajorMetadata({ params: Promise.resolve(majorParams) });
}

export default async function StudyMajorRoutePage({ params }) {
  const majorParams = await getMajorParams(params);
  return MajorLandingPage({ params: Promise.resolve(majorParams) });
}
