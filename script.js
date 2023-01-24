  var forwardBtn = document.getElementById('forward');
  var backwardBtn = document.getElementById('backward');
  var prevBtn = document.getElementById('prev');
  var nextBtn = document.getElementById('next');
  var appearBtn = document.getElementById('infobutton');
  var bar = document.querySelector('#bar');
  var cursorTitle = document.querySelector('.cursor-title');
  var creditsBtn = document.getElementById('credits');
  var creditsInfo = document.getElementById('credits-info');
  var tracks = document.getElementById('tracks-info');

  // new progress bar
  function progressbarMax (bar, audio) {
    audio.onloadedmetadata = () => {
      bar.max = Math.floor(audio.duration);
    }
  }

  // cursor description
  document.addEventListener('mousemove', (event) => {
    cursorTitle.style.top = event.pageY + 'px';
    cursorTitle.style.left = event.pageX + 'px';
  }, false)

  // big asterisks players function here
  const asterisks = document.querySelectorAll('.asterisk');
  asterisks.forEach((item) => {
    var isPlaying = false;
    var timer = null;

    var currentTimeIndicator = document.querySelector('.music-time__current');
    var leftTimeIndicator = document.querySelector('.music-time__last');

    // info
    const audio = item.getAttribute('data-audio');
    var name = item.getAttribute('name');
    var date = item.getAttribute('date');
    var read = item.getAttribute('read');
    var linkname = item.getAttribute('linkname');
    var link = item.getAttribute('link');


    //cursor description event
    item.addEventListener('mouseover', () => {
      cursorTitle.innerHTML = name;
    })
    item.addEventListener('mouseleave', () => {
      cursorTitle.innerHTML = '';
    })
    item.addEventListener('click', () => {
    
    // info appears on top right
    document.querySelector('#track-title').innerHTML = name;
    document.querySelector('#track-date').innerHTML = date;
    document.querySelector('#track-read').innerHTML = read;
    document.querySelector('#track-linkname').innerHTML = linkname;
    document.getElementById('track-linkname').href= link;

    document.querySelector('.top-nav-2').style.display = 'none';

    // asterisks rotation
      var rotatingElements = document.querySelectorAll('.rotating');

      item.querySelector('svg').classList.toggle('rotating');
      
      rotatingElements.forEach(element => {
        element.classList.remove('rotating');
      })

    // color change
      var trackInfo = document.getElementById('track-info'); 
      var season = item.getAttribute('season');

      changeColor();

      bar.style.opacity = 1;

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
      
      const audioelement = document.querySelector('#player');

      progressbarMax(bar, audioelement);

      // slider time update when dragged
      audioelement.addEventListener('timeupdate', () => {
        if (audioelement.currentTime === audioelement.duration) {
          bar.value = 0;
          play();
        } else {
          bar.value = Math.floor(audioelement.currentTime);
        }
      }, false)

      bar.addEventListener('input', event => {
        audioelement.currentTime = event.target.value;
      })


// play audio and time reset
      function play() {
        if (!isPlaying) {
          isPlaying = true;
          audioelement.play();
          showTime();

        } else {
          audioelement.pause();
          isPlaying = false;
          clearInterval(timer);
        }
      }

      if (audioelement.getAttribute('src') == audio) {
        play();
      } else {
        if (isPlaying) {
          play();
        }
        audioelement.setAttribute('src', audio);
        play();
      }

      // progress bar time
      function changeBar() {
        var audio = audioelement;

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
      }

      function showTime() {
        timer = setInterval(function () {
          return changeBar();
        }, 500);
      }

    });
  }); // asterisks function end 

  // project info top navigaton visibility
  appearBtn.addEventListener('click', () => {   
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

//credits button toggle desktop and mobile
   if (window.innerWidth < 960) {
    creditsBtn.addEventListener('click', () => {
      if (creditsInfo.style.opacity == '1') {
      creditsInfo.style.visibility = 'hidden';
      creditsInfo.style.opacity= '0';
      document.querySelector('.top-nav').style.visibility = 'visible';
      document.querySelector('#play').style.visibility = 'visible';
      document.querySelector('#track-info').style.visibility = 'visible';
      document.querySelector('.music-time').style.visibility = 'visible';
      document.querySelector('.progress-bar').style.visibility = 'visible';
      } else {
      creditsInfo.style.visibility = 'visible';
      creditsInfo.style.opacity = '1';
      document.querySelector('.top-nav').style.visibility = 'hidden';
      document.querySelector('#play').style.visibility = 'hidden';
      document.querySelector('#track-info').style.visibility = 'hidden';
      document.querySelector('.music-time').style.visibility = 'hidden';
      document.querySelector('.progress-bar').style.visibility = 'hidden';
      if (tracks.style.visibility === 'visible'
      ) {
        tracks.style.visibility = 'hidden';
        tracks.style.opacity= '0';
      }
      }
    })
 }
  else {
    creditsBtn.addEventListener('mouseover', () => {
      creditsInfo.style.visibility = 'visible';
      creditsInfo.style.opacity = '1';
      document.querySelector('.top-nav').style.visibility = 'hidden';
      document.querySelector('#play').style.visibility = 'hidden';
      document.querySelector('#track-info').style.visibility = 'hidden';
      document.querySelector('.music-time').style.visibility = 'hidden';
      document.querySelector('.progress-bar').style.visibility = 'hidden';
      if (tracks.style.visibility === 'visible'
      ) {
        tracks.style.visibility = 'hidden';
        tracks.style.opacity= '0';
      }
    })
  
    creditsBtn.addEventListener('mouseout', () => {
      creditsInfo.style.visibility = 'hidden';
      creditsInfo.style.opacity= '0';
      document.querySelector('.top-nav').style.visibility = 'visible';
      document.querySelector('#play').style.visibility = 'visible';
      document.querySelector('#track-info').style.visibility = 'visible';
      document.querySelector('.music-time').style.visibility = 'visible';
      document.querySelector('.progress-bar').style.visibility = 'visible';
  
    })
    
  }