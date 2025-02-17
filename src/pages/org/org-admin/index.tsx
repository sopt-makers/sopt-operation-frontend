import { ToastProvider } from '@sopt-makers/ui';

import OrgAdmin from '@/components/org/OrgAdmin';

function OrgAdminPage() {
  return (
    <ToastProvider>
      <OrgAdmin />
    </ToastProvider>
  );
}

export default OrgAdminPage;
