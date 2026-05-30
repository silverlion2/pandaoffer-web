import StudyTourSeoPage from '@/components/study-tours/StudyTourSeoPage';
import { getStudyTourMetadata, seoTourPages } from '@/data/studyTours';

const page = seoTourPages.mbaInnovation;

export const metadata = getStudyTourMetadata(page);

export default function MbaChinaInnovationTourPage() {
  return <StudyTourSeoPage page={page} />;
}
