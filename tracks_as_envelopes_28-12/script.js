var forwardBtn = document.getElementById('forward');
  var backwardBtn = document.getElementById('backward');
  var prevBtn = document.getElementById('prev');
  var nextBtn = document.getElementById('next');
  var appearBtn = document.getElementById('infobutton');

  // asterisks players
  const asterisks = document.querySelectorAll('.asterisk');
  asterisks.forEach((item) => {
    var isPlaying = false;
    var timer = null;
    var currentId = 0;

    var currentTimeIndicator = document.querySelector('.music-time__current');
    var leftTimeIndicator = document.querySelector('.music-time__last');
    var progressBar = document.getElementById('length');
    // var title = document.querySelector('.music-player__title');
    // var author = document.querySelector('.music-player__author');
    // var date = document.querySelector('.date');
    // var read = document.querySelector('.read');
    // var info = document.querySelector('.music-info');

    var progressDiv = document.getElementById('progress');

    item.addEventListener('mouseover', () => {
      asterisk.style.color = "white";
    });

    item.addEventListener('click', () => {
      const audio = item.getAttribute('data-audio');
      // new
      var title = item.getAttribute('title');
      document.querySelector('#track-title').innerHTML = title;
      var date = item.getAttribute('date');
      document.querySelector('#track-date').innerHTML = date;
      var read = item.getAttribute('read');
      document.querySelector('#track-read').innerHTML = read;
      var linkname = item.getAttribute('linkname');
      document.querySelector('#track-linkname').innerHTML = linkname;
      var link = item.getAttribute('link');
      document.getElementById('track-linkname').href= link;

      // color change
      var trackInfo = document.getElementById('track-info'); 
      var season = item.getAttribute('season');

      changeColor();
      function changeColor() {
        switch (season) {
          case 'season1':
            trackInfo.style.color = 'blue';
            break;
          case 'season2':
            trackInfo.style.color = '#00ab79';
            break;
          case 'season3':
            trackInfo.style.color = '#ff323c';
            break;
          case 'season4':
            trackInfo.style.color = '#cf4794';
            break;
          default:
            trackInfo.style.color = '#605f6b';
            break;
        }
      }

      // function newWindow(){
      //   window.open(link, '', 'width=600, height=300');
      //   return false;
      // }
      // linkname.onclick = newWindow()

      const audioelement = document.querySelector('#player');

      function play() {
        if (!isPlaying) {
          isPlaying = true;
          audioelement.play();
          showTime();
          // document.querySelector('.asterisk').style.transform = 'rotate(7deg)';

        } else {
          audioelement.pause();
          isPlaying = false;
          clearInterval(timer);
        }
      }

      //  audioelement.play();
      if (audioelement.getAttribute('src') == audio) {
        play();
      } else {
        audioelement.setAttribute('src', audio);
        play();
      }

      // progress bar
      function changeBar() {
        var audio = audioelement;
        var percentage = (audio.currentTime / audio.duration).toFixed(3);
        progressBar.style.transition = '';
        // console.log(audio.currentTime);

        //set current time
        var minute = Math.floor(audio.currentTime / 60);
        var second = Math.floor(audio.currentTime % 60);
        var leftTime = audio.duration - audio.currentTime;
        currentTimeIndicator.innerHTML =
          ('0' + minute).substr(-2) + ':' + ('0' + second).substr(-2);

        //set left time
        var leftMinute = Math.floor(leftTime / 60);
        var leftSecond = Math.floor(leftTime % 60);

        leftTimeIndicator.innerHTML =
          ('0' + leftMinute).substr(-2) + ':' + ('0' + leftSecond).substr(-2);

        //set time bar
        progressBar.style.width = percentage * 100 + '%';
      }

      function showTime() {
        timer = setInterval(function () {
          return changeBar();
        }, 500);
      }

      function progress() {
        var audio = audioelement;
        //get current position and minus progress bar's x position to get current position in progress bar
        var pos =
          (e.pageX - progressDiv.getClientRects()[0].x) /
          progressDiv.getClientRects()[0].width;
        audio.currentTime = pos * audio.duration;
        changeBar();
      }
      progressDiv.addEventListener('click', function () {
        progress();
      });
      // next button
      // function nextMusic(mode) {
      //   audioelement.pause();
      //   isPlaying = false;
      //   clearInterval(timer);

      //   if (mode === 'next') {
      //     currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
      //     changeColor();
      //     init();
      //   } else {
      //     currentId = currentId - 1 < 0 ? list.length - 1 : currentId - 1;
      //     changeColor();
      //     init();
      //   }
      // }

      // goToNextMusic()
      // function goToNextMusic() {
      //   var newId = currentId;
      //   while (isShuffle && !loopOne && newId === currentId) {
      //     newId = Math.floor(Math.random() * Math.floor(list.length - 1));
      //   }
      //   if (!isShuffle && !loopOne) {
      //     currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
      //   }
      //   if (!isShuffle && loopOne) {
      //     currentId = currentId;
      //   }

      //   if (isShuffle) {
      //     currentId = newId;
      //   }
      //   init();
      //   audioelement.play();
      // }

      // // music stops goes to next letter
      // stopMusic()
      //   function stopMusic() {
      //     if (leftTimeIndicator.innerHTML = "00:00") {
      //     goToNextMusic();
      //   }

      function init() {
        //reset music duration and setup audio
        var audio = audioelement === null ? new Audio() : audioelement;
        audio.src = audioelement;
        audio.id = url;
        audioelement === null ? document.body.appendChild(audio) : '';

        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        audioelement.currentTime = 0;

        //set current time
        audio.addEventListener('loadedmetadata', function () {
          var leftMinute = Math.floor(audio.duration / 60);
          var leftSecond = Math.floor(audio.duration % 60);
          currentTimeIndicator.innerHTML = '00:00';
          leftTimeIndicator.innerHTML =
            ('0' + leftMinute).substr(-2) + ':' + ('0' + leftSecond).substr(-2);
          progressBar.style.transition = '';
        });
      }
    });
  });

  //  mute button
  document.getElementById('mute').addEventListener('click', function () {
    var audioelement = document.querySelector('#player');
    this.textContent =
      this.textContent === 'Sound On' ? 'Sound Off' : 'Sound On'; // change this to image.src if you have one
    audioelement.muted = !audioelement.muted;
  });

  // backward forward
  function backward() {
    var audioelement = document.querySelector('#player');
    audioelement.currentTime -= 10;
    if (!isPlaying) {
      changeBar();
    }
  }
  function forward() {
    var audioelement = document.querySelector('#player');
    audioelement.currentTime += 10;
    if (!isPlaying) {
      changeBar();
    }
  }

  // project info top navigaton visibility
  appearBtn.addEventListener('click', () => {   
    var tracks = document.getElementById('tracks-info');
    if (tracks.style.visibility === 'visible'
    ) {
      tracks.style.visibility = 'hidden';
      tracks.style.opacity= '0';
    } else {
      tracks.style.visibility = 'visible';
      tracks.style.opacity= '1';
    }
    tracks.style.transition = 'opacity 0.5s linear';
  })

  forwardBtn.addEventListener('click', forward);
  backwardBtn.addEventListener('click', backward);

  prevBtn.addEventListener('click', function (e) {
    return nextMusic('prev');
  });
  nextBtn.addEventListener('click', function (e) {
    return nextMusic('next');
  });