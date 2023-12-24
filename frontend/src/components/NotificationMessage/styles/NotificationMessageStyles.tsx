import styled from 'styled-components';
import { NotificationState } from '../../../reducers/notificationReducer';

export const NotificationMessageStyles = styled.div<{ $notification: NotificationState }>`
  position: absolute;
  right: 0;
  padding-right: 4rem;
  p {
    color: ${props => props.$notification.message === 'Copied!' ? 'green' : 'red'};
  }
`;