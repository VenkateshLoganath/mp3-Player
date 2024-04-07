 
 

 
        
        
    const audioTrack = WaveSurfer.create({
      container: '.range-bar',
      waveColor: '#dba870b0',
      progressColor: '#fff',
      barwidth: 5 ,
      responsive: true,
      height: 20,
    })
    audioTrack.load('../musics/song1.mp3')
    audioTrack.on('interaction', () => {
        audioTrack.play()
    })

 
 const PlayBtn = document.querySelector(".play-pause");
 const Pausebtn = document.querySelector(".pause");
 const stopBtn = document.querySelector(".stop")
 const volumeSlider = document.querySelector('.volume-range');
 const volumeBtn = document.querySelector(".volume-up")
 const vBtn = document.querySelector(".volume");
 const volumeMute = document.querySelector('volume-mute')

 PlayBtn.addEventListener("click",(e)=>{
    audioTrack.playPause();
    PlayBtn.classList.toggle("pause");
 })
 Pausebtn.addEventListener("click",(e)=>{
  audioTrack.pause();
  PlayBtn.classList.remove("pause");
})

stopBtn.addEventListener("click",(e)=>{
  audioTrack.stop();
  PlayBtn.classList.remove("pause");
})

volumeSlider.addEventListener("mouseup",(e)=>{
  changeValue(volumeSlider.value)
})

const changeValue = (Volume)=>{
  audioTrack.setVolume(Volume);
}

vBtn.addEventListener('click',(e)=>{
  vBtn.classList.toggle("mute");
  if(vBtn.classList.contains("mute")){
    audioTrack.setVolume(0)
    volumeSlider.value = 0; 
  }else{
    audioTrack.setVolume(0.5)
    volumeSlider.value = 0.5
  }
})
  