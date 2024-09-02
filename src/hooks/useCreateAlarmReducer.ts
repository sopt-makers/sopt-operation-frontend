import { useImmerReducer } from 'use-immer';

type Action =
  | { type: 'SET_PART'; payload: string | null }
  | { type: 'SET_IS_ACTIVE'; payload: boolean | null }
  | { type: 'SET_TARGET_LIST'; payload: string[] | null }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'SET_LINK'; payload: string | null };

const initialState: PostAlarmData = {
  target: '활동 회원',
  part: '발송 파트',
  isActive: true,
  targetList: null,
  title: '',
  content: '',
  linkType: '첨부 안함',
  link: null,
};

const postAlarmReducer = (draft: PostAlarmData, action: Action): void => {
  switch (action.type) {
    case 'SET_PART':
      draft.part = action.payload;
      break;
    case 'SET_IS_ACTIVE':
      draft.isActive = action.payload;
      break;
    case 'SET_TARGET_LIST':
      draft.targetList = action.payload;
      break;
    case 'SET_TITLE':
      draft.title = action.payload;
      break;
    case 'SET_CONTENT':
      draft.content = action.payload;
      break;
    case 'SET_LINK':
      draft.link = action.payload;
      break;
  }
};

export const useCreateAlarmReducer = () => {
  const [state, dispatch] = useImmerReducer(postAlarmReducer, initialState);
  return { state, dispatch };
};
