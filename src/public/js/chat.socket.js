const socket = io();

const chatText = document.getElementById("chat-text")
const messageLog = document.getElementById("message-log")
let user = null

Swal.fire({
    title: "Identificate",
    input: "text",
    confirmButtonText: "Ingresar",
    allowOutsideClick:false,
    inputValidator: (value)=>{
        return !value && "Digita algo" 
    }
  }).then((response)=>{
    if(response.isConfirmed){
        user = response.value
        socket.emit("authenticated", user);
        console.log(user);
        
    }
})


chatText.addEventListener("keyup", (event)=>{
    if(event.key === "Enter"){
        socket.emit("message", { user, message: chatText.value })
    }
})

socket.on("message-log",(data)=>{
    messageLog.innerText = "";
    data.forEach(item => {
           messageLog.innerHTML += `<li>${item.user} dice: <b>${item.message}</b></li>`; 
    });
})

socket.on("new-user-connect",(data)=>{
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: `${data} se ha unido al chat`
      });
      
})
