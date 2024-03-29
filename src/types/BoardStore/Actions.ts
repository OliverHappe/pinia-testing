import { createAction, props } from "@/types/ActionFactory";

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
export const createCardRequestAction = createAction(
  "create-card-request",
  props<{ columnId: string; userId: string }>()
);
export const createCardSuccessAction = createAction(
  "create-card-success",
  props<{ cardId: string; columnId: string; text: string; userId: string }>()
);
export const createCardFailureAction = createAction("create-card-failure", props<{ error: string }>());
export const lockCardRequestAction = createAction(
  "lock-card-request",
  props<{ id: string; userId: string; userName: string }>()
);
export const lockCardSuccessAction = createAction(
  "lock-card-success",
  props<{ id: string; userId: string; userName: string }>()
);
export const lockCardFailureAction = createAction("lock-card-failure", props<{ error: string }>());
export const unlockCardRequestAction = createAction("unlock-card-request", props<{ id: string }>());
export const unlockCardSuccessAction = createAction("unlock-card-success", props<{ id: string }>());
export const unlockCardFailureAction = createAction("unlock-card-failure", props<{ error: string }>());
export const moveCardRequestAction = createAction(
  "move-card-request",
  props<{ newIndex: number; oldIndex: number; from: string; to: string; cardId: string }>()
);
export const moveCardSuccessAction = createAction(
  "move-card-success",
  props<{ newIndex: number; oldIndex: number; from: string; to: string; cardId: string }>()
);
export const moveCardFailureAction = createAction("move-card-failure", props<{ error: string }>());
export const moveColumnRequestAction = createAction(
  "move-column-request",
  props<{ newIndex: number; oldIndex: number; columnId: string }>()
);
export const moveColumnSuccessAction = createAction(
  "move-column-success",
  props<{ newIndex: number; oldIndex: number; columnId: string }>()
);
export const moveColumnFailureAction = createAction("move-column-failure", props<{ error: string }>());
// export const noPayloadAction = createAction("no-payload-action");
