export const CHAT_OPEN_EVENT = "kw:chat:open";

export function openChat() {
  window.dispatchEvent(new CustomEvent(CHAT_OPEN_EVENT));
}
