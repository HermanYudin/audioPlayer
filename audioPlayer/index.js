let currentMusic = 0;

// -------------Форматируем время песни в минуты и секунды---

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};

const main = document.querySelector(".main");
let music = null;
const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const disk = document.querySelector(".disk");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-duration");
const playBtn = document.querySelector(".play-btn");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");
const muteBtn = document.querySelector(".mute-btn");

let songs = [
  {
    name: "Big Guns",
    path: "music/Skid Row - Big Guns.mp3",
    artist: "Skid Row",
    cover: "covers/skid.jpg",
  },
  {
    name: "The RocknRoll Qeen",
    path: "music/The Subways - The RocknRoll Qeen.mp3",
    artist: "The Subways",
    cover: "covers/sub.jpg",
  },
  {
    name: "I Got Mine",
    path: "music/The Black Keys - I Got Mine.mp3",
    artist: "The Black Keys",
    cover: "covers/black.jpg",
  },
  {
    name: "Time of Dying",
    path: "music/Three Days Grace - Time of Dying.mp3",
    artist: "Three Days Grace",
    cover: "covers/time.jpg",
  },
  {
    name: "Сентябрь Горит",
    path: "music/Stigmata - Сентябрь Горит.mp3",
    artist: "Stigmata",
    cover: "covers/sept.jpg",
  },
  {
    name: "Wings of a Butterfly",
    path: "music/HIM - Wings of a Butterfly.mp3",
    artist: "HIM",
    cover: "covers/him.jpg",
  },
  {
    name: "Psychosocial",
    path: "music/Slipknot - Psychosocial.mp3",
    artist: "Slipknot",
    cover: "covers/slip.jpg",
  },
];

// --------------Кликеры---------------

playBtn.addEventListener("click", function () {
  if (playBtn.classList.contains("pause")) {
    music.play();
  } else {
    music.pause();
  }
  playBtn.classList.toggle("pause");
  disk.classList.toggle("play");
});

forwardBtn.addEventListener("click", function () {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  main.removeChild(music);
  setMusic(currentMusic);
  playMusic();
});

backwardBtn.addEventListener("click", function () {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  main.removeChild(music);
  setMusic(currentMusic);
  playMusic();
});

muteBtn.addEventListener("click", function () {
    if(!muteBtn.classList.contains('muted')) {
    muteBtn.classList.add('muted');
    music.volume = 0;
    }
    else if(muteBtn.classList.contains('muted')) {
        muteBtn.classList.remove('muted');
        music.volume = 1; 
    }
  });

// ------------Ставим по i музыку, обложку и название-----

const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music = document.createElement("audio");
  setTimeout(() => {
    main.appendChild(music);
    music.setAttribute("src", song.path);
    music.autoplay = false;
    music.load();
    music.addEventListener(
      "canplay",
      function () {
        music.pause();
        songName.innerHTML = song.name;
        artistName.innerHTML = song.artist;
        disk.style.backgroundImage = `url('${song.cover}')`;

        currentTime.innerHTML = "00:00";
        //без этого считать продолжительность песни не будет
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
        music.play();
      },
      500
    );
  });
};

setMusic(0);

setInterval(() => {
  seekBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);
  if (Math.floor(music.currentTime) === Math.floor(seekBar.max)) {
    forwardBtn.click();
  }
}, 500);

// ---------Делаем перемещение времени музыки по бару---------

seekBar.addEventListener("change", () => {
  music.currentTime = seekBar.value;
});

// -------------Функция для удаления и добавления активных классов при переключении на другие песни------------

const playMusic = () => {
  music.play();
  playBtn.classList.remove("pause");
  disk.classList.add("play");
};
