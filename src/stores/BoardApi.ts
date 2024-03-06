import { Action } from "@/types/ActionFactory";
import { io } from "socket.io-client";
import { onUnmounted } from "vue";

export const useBoardApi = (dispatch: (action: Action) => void) => {
  const socket = io(
    "https://bc-6683-poc-board-collaboration-server.dbc.dbildungscloud.dev",
    // "http://localhost:3000",
    { path: "/poc-board-collaboration-server" }
  );
  // listen for new messages
  socket.on("connect", function () {
    console.log("connected");
  });
  socket.onAny((event, ...args) => {
    dispatch({ type: event, payload: args[0] });
  });

  socket.on("disconnect", () => {
    // TODO reconnect?
  });

  const emitOnSocket = (action: Action) => socket.emit(action.type, action.payload);

  onUnmounted(() => {
    socket.close();
  });

  return {
    emitOnSocket,
  };
};
