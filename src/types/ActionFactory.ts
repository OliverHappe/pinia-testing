export type PayloadOf<T extends (...args: unknown[]) => { payload?: unknown }> = ReturnType<T>["payload"];

declare type Props = Record<string, any>;
declare type ActionProps<T extends Props> = T;

// export interface BaseAction {
//   type: string;
//   payload?: any;
// }

export function props<T extends Props>(): ActionProps<T> {
  return {} as T;
}

// export function createAction<T extends string>(type: T): () => { readonly type: T };
// export function createAction<T extends string, P extends object>(
//   type: T,
//   props: ActionProps<P>
// ): (payload: P) => { readonly type: T; readonly payload: P };
type ActionFactory<T extends string, P extends Props> = (payload: P) => { type: T; payload: P };

export function createAction<T extends string, P extends Props>(type: T, props: ActionProps<P>): ActionFactory<T, P> {
  return (payload: P) => ({ type: type, payload } as const);
}

// type GenericActionFactory = ActionFactory<string, Props>;

// type Action<T extends string, P extends Props> = ReturnType<ActionFactory<T, P>>;
// Action<string, Props>
export function handle(action: any, ...ons: ReturnType<typeof on>[]) {
  ons.forEach((on) => on(action));
}

export const on = <
  T extends ActionFactory<any, any>,
  K extends ActionFactory<ReturnType<T>["type"], ReturnType<T>["payload"]>,
  P extends ReturnType<T>["payload"]
>(
  action: T,
  callback: (payload: P) => void
) => {
  // const callCallback = (p?: P) => {
  //   if (p !== undefined) {
  //     callback(p);
  //   } else {
  //     callback();
  //   }
  // };
  const permittedAction = action({}).type;

  return (a: ReturnType<T>) => (permittedAction === a.type ? callback(a.payload as P) : null);
};
