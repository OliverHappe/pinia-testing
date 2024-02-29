import { useBoardStore } from "@/stores/BoardStore";
import { createAction } from "@/types/ActionFactory";

export declare type AnyBoardAction =
  | IUpdateCardAction
  | IDeleteCardAction
  | ILockCardAction
  | CreateCardResponse
  | IUnlockCardAction;

declare type BoardActions =
  | "update-card"
  | "delete-card"
  | "lock-card"
  | "unlock-card"
  | "no-payload-action";

export const UpdateCardAction = createAction<IUpdateCardAction>("update-card");
export const DeleteCardAction = createAction<IDeleteCardAction>("delete-card");
export const LockCardAction = createAction<ILockCardAction>("lock-card");
export const UnlockCardAction = createAction<IUnlockCardAction>("unlock-card");
export const NoPayloadAction =
  createAction<INoPayloadAction>("no-payload-action");
export const CreateCardAction = createAction<ICreateCardAction>("");
export const CreateCardActionSuccess = createAction<CreateCardResponse>("");
export const CreateCardActionFail = createAction<>("");

useBoardStore.dispatch(CreateCardAction);
export interface BaseAction {
  type: string;
  payload?: any;
}

interface IUpdateCardAction extends BaseAction {
  type: "update-card";
  payload: { id: string; text: string };
}

interface IDeleteCardAction extends BaseAction {
  type: "delete-card";
  payload: { id: string };
}

export interface ILockCardAction extends BaseAction {
  type: "lock-card";
  payload: { id: string; userId: string };
}

export interface IUnlockCardAction extends BaseAction {
  type: "unlock-card";
  payload: { id: string };
}

export interface INoPayloadAction extends BaseAction {
  type: "no-payload-action";
}
