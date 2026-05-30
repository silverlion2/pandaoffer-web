import StudyTourSeoPage from '@/components/study-tours/StudyTourSeoPage';
import { getStudyTourMetadata, seoTourPages } from '@/data/studyTours';

const page = seoTourPages.healthcare;

export const metadata = getStudyTourMetadata(page);

export default function ChinaHealthcareStudyTourPage() {
  return <StudyTourSeoPage page={page} />;
}
