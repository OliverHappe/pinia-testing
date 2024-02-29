import { BaseAction } from "@/types/BoardStore/Actions";

export function createAction<T extends BaseAction>(type: T["type"]) {
  return (payload: T["payload"]) => ({ type: type, payload } as const);
}

export type PayloadOf<T extends (...args: any[]) => { payload?: any }> = ReturnType<T>["payload"];

// export function createAction<T extends Omit<BaseAction, "type">>(type: string) {
//   return (payload: T["payload"]) => ({ type, payload });
// }
