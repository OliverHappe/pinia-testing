import { createAction } from "@/types/ActionFactory";

export declare type AnyBoardAction =
  | IUpdateCardRequestAction
  | IUpdateCardSuccessAction
  | IUpdateCardFailureAction
  | IDeleteCardRequestAction
  | IDeleteCardSuccessAction
  | IDeleteCardFailureAction
  | ILockCardRequestAction
  | ILockCardSuccessAction
  | ILockCardFailureAction
  | IUnlockCardRequestAction
  | IUnlockCardRequestAction
  | IUnlockCardSuccessAction
  | IUnlockCardFailureAction;

export const UpdateCardRequestAction = createAction<IUpdateCardRequestAction>("update-card-request");
export const UpdateCardSuccessAction = createAction<IUpdateCardSuccessAction>("update-card-success");
export const UpdateCardFailureAction = createAction<IUpdateCardFailureAction>("update-card-failure");
export const DeleteCardRequestAction = createAction<IDeleteCardRequestAction>("delete-card-request");
export const DeleteCardSuccessAction = createAction<IDeleteCardSuccessAction>("delete-card-success");
export const DeleteCardFailureAction = createAction<IDeleteCardFailureAction>("delete-card-failure");
export const LockCardRequestAction = createAction<ILockCardRequestAction>("lock-card-request");
export const LockCardSuccessAction = createAction<ILockCardSuccessAction>("lock-card-success");
export const LockCardFailureAction = createAction<ILockCardFailureAction>("lock-card-failure");
export const UnlockCardRequestAction = createAction<IUnlockCardRequestAction>("unlock-card-request");
export const UnlockCardSuccessAction = createAction<IUnlockCardSuccessAction>("unlock-card-success");
export const UnlockCardFailureAction = createAction<IUnlockCardFailureAction>("unlock-card-failure");
// export const UnlockCardAction = createAction<IUnlockCardAction>("unlock-card");
// export const UnlockCardAction = createAction<IUnlockCardAction>("unlock-card");
export const NoPayloadAction = createAction<INoPayloadAction>("no-payload-action");
export interface BaseAction {
  type: string;
  payload?: unknown;
}

interface IUpdateCardRequestAction extends BaseAction {
  type: "update-card-request";
  payload: { id: string; text: string };
}
interface IUpdateCardSuccessAction extends BaseAction {
  type: "update-card-success";
  payload: { id: string; text: string };
}
interface IUpdateCardFailureAction extends BaseAction {
  type: "update-card-failure";
  payload: unknown;
}

interface IDeleteCardRequestAction extends BaseAction {
  type: "delete-card-request";
  payload: { id: string };
}

interface IDeleteCardSuccessAction extends BaseAction {
  type: "delete-card-success";
  payload: { id: string };
}

interface IDeleteCardFailureAction extends BaseAction {
  type: "delete-card-failure";
  payload: unknown;
}

interface ILockCardRequestAction extends BaseAction {
  type: "lock-card-request";
  payload: { id: string; userId: string };
}
interface ILockCardSuccessAction extends BaseAction {
  type: "lock-card-success";
  payload: { id: string; userId: string };
}
interface ILockCardFailureAction extends BaseAction {
  type: "lock-card-failure";
  payload: unknown;
}

interface IUnlockCardRequestAction extends BaseAction {
  type: "unlock-card-request";
  payload: { id: string };
}
interface IUnlockCardSuccessAction extends BaseAction {
  type: "unlock-card-success";
  payload: { id: string };
}
interface IUnlockCardFailureAction extends BaseAction {
  type: "unlock-card-failure";
  payload: unknown;
}

interface INoPayloadAction extends BaseAction {
  type: "no-payload-action";
}
