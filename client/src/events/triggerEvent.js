export const triggerEvent = (socket, eventType, data) => {
  console.log({data})
  socket.emit(eventType, data);
};
