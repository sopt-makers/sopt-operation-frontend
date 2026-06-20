export const EDIT_STEP = {
  VIEW: 'view',
  EDITING: 'editing',
  DEPLOY: 'deploy',
} as const;

export type EditStep = (typeof EDIT_STEP)[keyof typeof EDIT_STEP];
