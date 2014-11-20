var socket = io('http://localhost:4000');

var connected = new Promise(function(resolve, reject){
  socket.on('connect', function(){
    resolve(socket)
  })
})

navigator.geolocation.getCurrentPosition(function(position){
  connected.then(function(socket){
    socket.emit('location', position)
  })
})

var pic = document.getElementById('pic');

socket.on('pic', function(url){
  pic.setAttribute('src', url)
})