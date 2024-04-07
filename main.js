

const musicImg = document.querySelector(".song-img img");
const musicName = document.querySelector(".song-name");
const artistName = document.querySelector(".song-details .artist-name")
const audioRange = document.querySelector(".audio-form")
  

let musicIndex = 1;



 
 
 const PlayBtn = document.querySelector(".play-pause");
 const Pausebtn = document.querySelector(".pause");
 const stopBtn = document.querySelector(".stop")
 const volumeSlider = document.querySelector('.volume-range');
 const volumeBtn = document.querySelector(".volume-up")
 const vBtn = document.querySelector(".volume");
 const volumeMute = document.querySelector('.volume-mute');
 const forwardBtn = document.querySelector('.forward');
 const backwardBtn = document.querySelector('.backward')
 const audioProgressbar = document.querySelector(".music-range");
 const audioProgresArea = document.querySelector(".range-bar");
 







window.addEventListener("load",(e)=>{
  loadMusics(musicIndex)
  playLevel();
   
  
})

function loadMusics(indexNumb){
  musicName.innerText =  allMusics[indexNumb -1 ].name;
  artistName.innerText = allMusics[indexNumb -1 ].artist;
  musicImg.src = `../img/${allMusics[indexNumb -1 ].img}.jpg`;
  audioRange.src = `../musics/${allMusics[indexNumb -1].src}.mp3`;
  
}

PlayBtn.addEventListener("click",(e)=>{
  
  PlayBtn.classList.toggle("pause");
  if(PlayBtn.classList.contains("pause")){
    audioRange.play();
  }else{
    audioRange.pause();
  }
  playLevel();
})

Pausebtn.addEventListener("click",(e)=>{
  audioRange.pause();
  PlayBtn.classList.remove("pause");
})

 
stopBtn.addEventListener("click",(e)=>{
  audioProgressbar.value=0
  audioRange.pause();
  loadMusics(musicIndex);
  

  PlayBtn.classList.remove("pause");
})
function forward(){
  musicIndex++;
  musicIndex > allMusics.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusics(musicIndex);
 
  PlayBtn.classList.add("pause");

  let randIndex = Math.floor((Math.random() * allMusics.length) + 1);  
  
  musicIndex = randIndex;  
  loadMusics(musicIndex);
  audioRange.play();
  playLevel()

}

function reverse(){

  musicIndex--;
  musicIndex < 1 ? musicIndex = allMusics.length : musicIndex = musicIndex;
  loadMusics(musicIndex);

  PlayBtn.classList.add("pause");

  let randIndex = Math.floor((Math.random() * allMusics.length) + 1);  
  
  musicIndex = randIndex;  
  loadMusics(musicIndex);
  audioRange.play();
  playLevel()
}

forwardBtn.addEventListener("click",(e)=>{
  forward();
})


backwardBtn.addEventListener("click",(e)=>{
  reverse();
})

audioRange.addEventListener("timeupdate",(e)=>{
 
const currentTime = e.target.currentTime;
const duration = e.target.duration;
let progressBar = (currentTime / duration) * 100 ;
audioProgressbar.value = progressBar ;
audioProgressbar.style.transistion = 'all 0.5s ease'



const currenTime = document.querySelector(".currenttime");
const durationTime = document.querySelector(".totaltime")

audioRange.addEventListener("loadeddata",()=>{
 

  let fullAudioProgress = audioRange.duration;

  let totalmins = Math.floor(fullAudioProgress / 60)
  let totalsec = Math.floor(fullAudioProgress % 60)

  if(totalsec < 10){
    totalsec = `0 ${totalsec}`
  }

  durationTime.innerText  =   `${totalmins} : ${totalsec}`


  
})
 
let totalmins = Math.floor(currentTime / 60)
let totalsec = Math.floor(currentTime % 60)

if(totalsec < 10){
  totalsec = `0 ${totalsec}`
}

currenTime.innerText  =   `${totalmins} : ${totalsec}`
})

audioProgresArea.addEventListener("click",(e)=>{
  let pgVal = audioProgressbar.clientWidth;
  let currentSet = e.offsetX;
  let songDuration = audioRange.duration;
  audioRange.currentTime = (  currentSet / pgVal) *songDuration
  
})


volumeSlider.addEventListener("mouseup",(e)=>{

 
  audioRange.volume= volumeSlider.value  / 100 ;
  if(audioRange.volume == 0 ){
    vBtn.classList.add("mute")
  }
 
  })
  
 

  vBtn.addEventListener("click",(e)=>{
    vBtn.classList.toggle("mute")
    if(vBtn.classList.contains("mute")){
      audioRange.muted = true;
      volumeSlider.value= 0;
       
    }else{
      audioRange.muted = false;
       
      volumeSlider.value= 50;
    }
  })


  const repeatBtn = document.querySelector("#repeat-plist");
  
  repeatBtn.addEventListener("click", ()=>{
    repeatBtn.parentElement.classList.toggle("show");
    console.log("boom")
    let getText = repeatBtn.innerText; //getting this tag innerText
 
    switch(getText){
      case "repeat":
        repeatBtn.innerText = "repeat_one";
        repeatBtn.setAttribute("title", "Song looped");
        break;
      case "repeat_one":
        repeatBtn.innerText = "repeat";
        repeatBtn.setAttribute("title", "Playlist looped");
        break;
      
    }

     
  });
  const shuffleBtn = document.querySelector("#shuffle-plist");
  let blText = shuffleBtn.innerText; //getting this tag innerText
  shuffleBtn.addEventListener("click",(e)=>{
    shuffleBtn.parentElement.classList.toggle("show");
    console.log("shuffle funciton")
    switch(blText){
      case "shuffle":
         
        shuffleBtn.setAttribute("title", "Playlist shuffled");
        break;
    }
  })

  audioRange.addEventListener("ended", ()=>{
    
    let getText = repeatBtn.innerText;  
    switch(getText){
      case "repeat":
        forward()
        break;
      case "repeat_one":
        audioRange.currentTime = 0;
        loadMusics(musicIndex);
        audioRange.play();
        playLevel()
        break;
    }
  });

  
  audioRange.addEventListener("ended", ()=>{
    let blText = shuffleBtn.innerText;
    if(shuffleBtn.parentElement.classList.contains("show")){
      switch(blText){
        case "shuffle":
          let randIndex = Math.floor((Math.random() * allMusics.length) + 1);  
          do{
            randIndex = Math.floor((Math.random() * allMusics.length) + 1);
          }while(musicIndex == randIndex);  
          musicIndex = randIndex;  
          loadMusics(musicIndex);
          audioRange.play();
          playLevel()
          break;
      }
    }

  });


  const circle = () =>{
    
 
      const inputId = document.querySelector(".Search-Bar").value.toUpperCase();
      const storeItems = document.querySelector("ul");
      const products = document.querySelectorAll(".value")
      const pName = storeItems.getElementsByTagName("h5")
  
   
      for(var i=0; i < pName.length ; i++ ){
  
          let match = products[i].getElementsByTagName('h5')[0];
  
          if(match){
              let textvalue = match.textContent || match.innerHTML ; 
  
              if(textvalue.toUpperCase().indexOf(inputId) > -1){
                  products[i].style.display = ""
              }else{
                  products[i].style.display = "none";
              }
          }
  
      }
  }

  
  const ulTag = document.querySelector("ul");

  for(let i=0; i < allMusics.length; i++){
    let liTag = `
    <li class="product" li-index="${i + 1}">
        <div class="value">
            <div class="music-time">
            <h5>${allMusics[i].name}</h5>
            <span class="author">${allMusics[i].artist}</span>
            <audio class="${allMusics[i].src}" src="../musics/${allMusics[i].src}.mp3"></audio>
            </div>
            <div class="music-dur">
            <span id="${allMusics[i].src}" class="audioDurations">3:40</span> 
            </div>      
            </div>
     
    </li>
`
ulTag.insertAdjacentHTML("beforeend", liTag) ;

      let liAudioDuartionTag = ulTag.querySelector(`#${allMusics[i].src}`);
      let liAudioTag = ulTag.querySelector(`.${allMusics[i].src}`);
      liAudioTag.addEventListener("loadeddata", ()=>{
        let duration = liAudioTag.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if(totalSec < 10){ //if sec is less than 10 then add 0 before it
          totalSec = `0${totalSec}`;
        };
        liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
        liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
 
      });
      
  }

  const allLiTag = ulTag.querySelectorAll("li")

  function playLevel(){
    for(j=0;j<allLiTag.length;j++){
      let audioTag = allLiTag[j].querySelector(".audioDurations");
      if(allLiTag[j].classList.contains("playing")){
        allLiTag[j].classList.remove("playing")
        let addur =audioTag.getAttribute("t-duration")  ;
        audioTag.innerText = addur;
      }

      if(allLiTag[j].getAttribute("li-index") == musicIndex){
        allLiTag[j].classList.add("playing")
        audioTag.innerText = "playing.."
      }
      allLiTag[j].setAttribute("onclick","clicked(this)")
     }
    
  }

  function clicked(e){
    let getLiindex = e.getAttribute("li-index");
    musicIndex =  getLiindex;
    loadMusics(musicIndex);
    audioRange.play();
    PlayBtn.classList.add("pause");
    playLevel()
    }
/*

  const repeatList = document.querySelector(".repeat")
  const shuffleList = document.querySelector(".shuffle")

  repeatList.addEventListener("click",(e)=>{
    repeatList.classList.toggle("show")
    
  })

  let getText = shuffleList.classList;

  audioRange.addEventListener("ended",(e)=>{
    if(repeatList.classList.contains('show')){
      audioRange.currentTime = 0;
      loadMusics(musicIndex);
      audioRange.play();
    
    }else{
      forward()
    }

    switch(getText){
      case "show":
        if(shuffleList.classList.contains('show')){
     
      
        let ranIndex = Math.floor((Math.random() * allMusics.length) + 1)
        musicIndex = ranIndex;
        loadMusics(ranIndex);
      }
    }

  })
 
  shuffleList.addEventListener("click",(e)=>{
    shuffleList.classList.toggle("show")
    if(shuffleList.classList.contains('show')){
     
    }else{

    }
  })



    function shuffleFunciton(){
    if(shuffle){
      currentSong = Math.floor(Math.random() * allMusics.length) 
    }
  }
  console.log("bang")
    repeatList.classList.toggle("show")
    

    shuffleList.addEventListener("click",(e)=>{
      let ranIndex = Math.floor((Math.random() * allMusics.length) + 1)
      do{
        let ranIndex = Math.floor((Math.random() * allMusics.length) + 1);
      }while(musicIndex == ranIndex)
       musicIndex = ranIndex;
       loadMusics(musicIndex);
       playMusic();
    })
 


 */

 