import StudyTourSeoPage from '@/components/study-tours/StudyTourSeoPage';
import { getStudyTourMetadata, seoTourPages } from '@/data/studyTours';

const page = seoTourPages.aiCompanies;

export const metadata = getStudyTourMetadata(page);

export default function ChinaAiCompanyVisitsPage() {
  return <StudyTourSeoPage page={page} />;
}
