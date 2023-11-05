const socketClient = io('/chat');
const form = document.getElementById("chatForm");
const inputMessage = document.getElementById("messageInput");
const h3Name = document.getElementById("name");
const divChat = document.getElementById("chat");
const buttonMessage = document.getElementById("sendMessage")

let user;


Swal.fire({
  title: '¡Bienvenido!',
  text: 'Ingresa tu correo electronico para comenzar a chatear',
  input: 'email',
  inputValidator: (value) => {
      if (!value) {
          return 'Debes ingresar un correo';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
      if (!emailRegex.test(value)) {
          return '¡Debes ingresar un correo electrónico válido!';
      }
  },
  allowOutsideClick: false,
  allowEscapeKey: false,
}).then(result => {
  user = result.value;
  socketClient.emit('newUser', user)
})

socketClient.on('newUserBroadcast', (user) => {
  Toastify({
    text: `Se ha unido ${user}`,
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    className: "info",
  }).showToast();
})

inputMessage.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if  (inputMessage.value.trim().length === 0) return Swal.fire('Error', 'Debes ingresar un mensaje', 'error');
    socketClient.emit('newMessage', { user, message: inputMessage.value });
    inputMessage.value = '';
  }
});


buttonMessage.addEventListener('click', (e) => {
  if (inputMessage.value.trim().length === 0) return Swal.fire('Error', 'Debes ingresar un mensaje', 'error');
  socketClient.emit('newMessage', { user, message: inputMessage.value });
  inputMessage.value = '';
});


socketClient.on('messages', (messages) => {
  const messageLog = document.getElementById('messageLog');
  const rows = messages.map((data) => {
      return `
              <div>
                  <span class="messageHistory">${data.user}: ${data.message}</span>
              </div>
              `;
  });
  messageLog.innerHTML += rows.join("");

})

socketClient.on('messageCreated', (data) => {
  console.log(data)
  const messageLog = document.getElementById('messageLog');
  const row = `
                  <div>
                      <span class="messageHistory">${data.user}: ${data.message}</span>
                  </div>
              `;

  messageLog.innerHTML += row;

});