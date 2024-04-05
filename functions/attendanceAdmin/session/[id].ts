export const onRequest: PagesFunction = async (context) => {
  const { next, params } = context;

  if (/\d+/.test(`${params.id}`)) {
    return next('/attendanceAdmin/session/[id]');
  }

  return next();
};
