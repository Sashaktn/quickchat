const socket = io();

const msgInput = document.getElementById("msg");
const messagesDiv = document.getElementById("messages");
const fileInput = document.getElementById("fileInput");

function sendMessage() {
  const text = msgInput.value;
  if (text.trim()) {
    socket.emit("chat message", text);
    msgInput.value = "";
  }
}

socket.on("chat message", (msg) => {
  const div = document.createElement("div");
  div.textContent = msg;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const type = file.type.startsWith("image") ? "img" : "video";
    const el = document.createElement(type);
    el.src = reader.result;
    if (type === "video") el.controls = true;
    messagesDiv.appendChild(el);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  };
  reader.readAsDataURL(file);
});