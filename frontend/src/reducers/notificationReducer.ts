export type ActionType = 'MESSAGE' | 'ERROR' | 'CLEAR';

export interface NotificationAction {
  type: ActionType
  payload: string;
}

export interface NotificationState {
  message: string;
}

const notificationReducer = (state: NotificationState, action: NotificationAction) => {
  switch (action.type) {
    case ('MESSAGE'):
      return { ...state, message: action.payload };
    case ('ERROR'):
      return { ...state, message: action.payload };
    case ('CLEAR'):
      return { ...state, message: '' };
    default:
      return state;
  }
};

export { notificationReducer };