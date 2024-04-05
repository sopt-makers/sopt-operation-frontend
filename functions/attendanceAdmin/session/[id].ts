export const onRequest: PagesFunction = async (context) => {
  const { next, params } = context;

  if (/\d+/.test(`${params.id}`)) {
    return next('/attendanceAdmins/session/[id]');
  }

  return next();
};
