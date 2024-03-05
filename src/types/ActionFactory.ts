export type PayloadOf<T extends (...args: unknown[]) => { payload?: unknown }> = ReturnType<T>["payload"];

declare type ActionProps<T extends object> = T;

export function props<T extends object>(): ActionProps<T> {
  return {} as T;
}

export function createAction<T extends string>(type: T): () => { readonly type: T };
export function createAction<T extends string, P extends object>(
  type: T,
  props: ActionProps<P>
): (payload: P) => { readonly type: T; readonly payload: P };
export function createAction<T extends string, P extends object>(type: T, props?: ActionProps<P> | undefined) {
  return (payload?: P) => ({ type: type, payload } as const);
}
