import StudyTourSeoPage from '@/components/study-tours/StudyTourSeoPage';
import { getStudyTourMetadata, seoTourPages } from '@/data/studyTours';

const page = seoTourPages.techCompanies;

export const metadata = getStudyTourMetadata(page);

export default function ChinaTechCompanyStudyTourPage() {
  return <StudyTourSeoPage page={page} />;
}
