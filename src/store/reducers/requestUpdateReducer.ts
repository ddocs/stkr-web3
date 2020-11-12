import { AnyAction } from 'redux';
import { getInitActionName, isUpdateAction } from '../../common/utils/update';

export interface IRequestUpdateState {
  queries: {
    [key: string]: any;
  };
}

export const requestUpdateReducer = (
  state: IRequestUpdateState,
  action: AnyAction,
): IRequestUpdateState => {
  if (!isUpdateAction(action)) {
    return state;
  }

  const actionName = getInitActionName(action.type);

  return {
    ...state,
    queries: {
      ...state.queries,
      [actionName]: {
        ...state.queries[actionName],
        ...action.payload,
      },
    },
  };
};
