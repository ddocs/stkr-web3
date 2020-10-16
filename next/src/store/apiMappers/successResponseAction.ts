export interface SuccessResponseAction<T> {
  response: {
    data: T;
  };
}
