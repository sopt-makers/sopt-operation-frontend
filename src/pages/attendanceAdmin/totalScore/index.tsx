import MemberList from '@/components/attendanceAdmin/totalScore/MemberList';
import { useUnauthorizedStatus } from '@/hooks/useUnauthorizedStatus';

function TotalScorePage() {
  useUnauthorizedStatus('MAKERS');

  return <MemberList />;
}

export default TotalScorePage;
