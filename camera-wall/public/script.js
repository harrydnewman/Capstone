const cameras = [
    "cmkAbDUEoyA", "g4CmWNxgsic", "LaGkqNGhZTk",
    "RH5fgOcO0jg", "TITm2dUr2dA", "TUZ5xJ1-EBk", "R__e74ULCXQ",
    "y9vlso3TZ2E", "rnXIjl_Rzy4", "Yzit2MCJ9gw", "8ycgIh5VaT8",
    "__S1lZ6t1qg", "FpkJ6hwJmic", "4TIpitPIsPA", "neTPjjYfyh0",
    "65zBXVetyNI", "ByED80IKdIU", "TmtVbezZaqg", "5WN2PJ_Qxjs",
    "mhQjsLBfOoY", "hTHld3T7NA0"
  ];
  
  let players = [];
  
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]
      ];
    }
    return array;
  }
  
  function onYouTubeIframeAPIReady() {
    const playerContainers = Array.from(document.querySelectorAll('.player-container'));
    const shuffledCameras = shuffle([...cameras]);
  
    let index = 0;
    const batchSize = 3;
    const batchDelay = 1000;
  
    function loadBatch() {
      const nextBatch = playerContainers.slice(index, index + batchSize);
  
      nextBatch.forEach((container, i) => {
        setTimeout(() => {
          const videoId = shuffledCameras.pop();
          const spinner = container.querySelector('.spinner');
          const gridItem = container.parentElement;
  
          if (gridItem) {
            gridItem.classList.add('loaded');
          }
  
          const playerState = {
            hasPlayed: false,
            timeoutDone: false,
          };
  
          const checkAndHideSpinner = () => {
            if (playerState.hasPlayed && playerState.timeoutDone && spinner) {
              spinner.classList.add('hidden');
            }
          };
  
          const player = new YT.Player(container.id, {
            videoId,
            playerVars: {
              autoplay: 1,
              mute: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              fs: 0,
              playsinline: 1
            },
            events: {
              onStateChange: (event) => {
                if (event.data === YT.PlayerState.PLAYING) {
                  playerState.hasPlayed = true;
                  checkAndHideSpinner();
                }
              }
            }
          });
  
          players.push(player);
  
          // ✅ Timeout — marks after 5 seconds
          setTimeout(() => {
            playerState.timeoutDone = true;
            checkAndHideSpinner();
          }, 5000);
  
        }, i * 300);
      });
  
      index += batchSize;
      if (index < playerContainers.length) {
        setTimeout(loadBatch, batchDelay);
      }
    }
  
    loadBatch();
  }
  