export declare type AnyAction =
  | UpdateCardAction
  | DeleteCardAction
  | LockCardAction
  | UnlockCardAction;

interface BaseAction {
  type: string;
}

export interface UpdateCardAction extends BaseAction {
  type: "update-card";
  payload: { id: string; text: string };
}

export interface DeleteCardAction extends BaseAction {
  type: "delete-card";
  payload: { id: string };
}

export interface LockCardAction extends BaseAction {
  type: "lock-card";
  payload: { id: string };
}

export interface UnlockCardAction extends BaseAction {
  type: "unlock-card";
  payload: { id: string };
}
