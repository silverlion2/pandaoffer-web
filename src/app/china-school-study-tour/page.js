import StudyTourSeoPage from '@/components/study-tours/StudyTourSeoPage';
import { getStudyTourMetadata, seoTourPages } from '@/data/studyTours';

const page = seoTourPages.schoolStudy;

export const metadata = getStudyTourMetadata(page);

export default function ChinaSchoolStudyTourPage() {
  return <StudyTourSeoPage page={page} />;
}
