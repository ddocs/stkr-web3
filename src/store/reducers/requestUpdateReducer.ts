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

  if (!state.queries[actionName].data) {
    return {
      ...state,
    };
  }

  if (action.meta?.mutation instanceof Function) {
    return {
      ...state,
      queries: {
        ...state.queries,
        [actionName]: {
          ...state.queries[actionName],
          data: {
            ...action.meta.mutation(
              state.queries[actionName].data,
              action.payload,
            ),
          },
        },
      },
    };
  }

  return {
    ...state,
    queries: {
      ...state.queries,
      [actionName]: {
        ...state.queries[actionName],
        data: {
          ...state.queries[actionName].data,
          ...action.payload,
        },
      },
    },
  };
};
