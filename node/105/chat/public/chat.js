// console.log('js works');


const socket = io();
let userName = '';


const nameForm = document.querySelector('#nameForm');

const loginForm = document.querySelector('#loginForm');
const messages = document.querySelector('#messages');
const messageInput = document.querySelector('#messageInput');
const messageForm = document.querySelector('#messageForm');


const usernameInput = document.querySelector('#usernameInput');


loginForm.addEventListener('submit', e => {
  e.preventDefault();

  const usernameInput = document.querySelector('#usernameInput');

  username = usernameInput.value;
  if (!username) return;

  socket.emit('login', username);

  loginForm.style.display = "none";

  document.querySelector('#messages').style.display = "block";
  messages.style.display = "block";
  messageForm.style.display = "block";
});



messageForm.addEventListener('submit', e => {
  e.preventDefault();

  const msg = messageInput.value.trim();
  if (!msg) return;

  socket.emit('msg', msg);
  messageInput.value = "";
});


socket.on('msg', data => {
  messages.innerHTML += ` <div><strong>${data.name}</strong>: ${data.msg}</div>`;
});


socket.on('user-connected', username => {
  messages.innerHTML += `<div class="system">${username} joined the chat</div>`;
});

socket.on('user-disconnected', username => {
  messages.innerHTML += `<div class="system">${username} left the chat</div>`;
});

