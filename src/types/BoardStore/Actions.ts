import { createAction, props } from "@/types/ActionFactory";

export declare type AnyBoardAction =
  | ReturnType<typeof updateCardRequestAction>
  | ReturnType<typeof updateCardSuccessAction>
  | ReturnType<typeof updateCardFailureAction>
  | ReturnType<typeof deleteCardRequestAction>
  | ReturnType<typeof deleteCardSuccessAction>
  | ReturnType<typeof deleteCardFailureAction>
  | ReturnType<typeof lockCardRequestAction>
  | ReturnType<typeof lockCardSuccessAction>
  | ReturnType<typeof lockCardFailureAction>
  | ReturnType<typeof unlockCardRequestAction>
  | ReturnType<typeof unlockCardSuccessAction>
  | ReturnType<typeof unlockCardFailureAction>
  | ReturnType<typeof noPayloadAction>;

export const updateCardRequestAction = createAction("update-card-request", props<{ id: string; text: string }>());
export const updateCardSuccessAction = createAction("update-card-success", props<{ id: string; text: string }>());
export const updateCardFailureAction = createAction("update-card-failure", props<{ error: string }>());
export const deleteCardRequestAction = createAction(
  "delete-card-request",
  props<{ columnId: string; cardId: string }>()
);
export const deleteCardSuccessAction = createAction(
  "delete-card-success",
  props<{ columnId: string; cardId: string }>()
);
export const deleteCardFailureAction = createAction("delete-card-failure", props<{ error: string }>());
export const lockCardRequestAction = createAction("lock-card-request", props<{ id: string; userId: string }>());
export const lockCardSuccessAction = createAction("lock-card-success", props<{ id: string; userId: string }>());
export const lockCardFailureAction = createAction("lock-card-failure", props<{ error: string }>());
export const unlockCardRequestAction = createAction("unlock-card-request", props<{ id: string }>());
export const unlockCardSuccessAction = createAction("unlock-card-success", props<{ id: string }>());
export const unlockCardFailureAction = createAction("unlock-card-failure", props<{ error: string }>());
export const noPayloadAction = createAction("no-payload-action");
