  //  =====CHART DONUT DYNAMIC=====
  const ctx = document.getElementById('myDonutChart').getContext('2d');
  const data = {
    labels: ['Marketing (70%)', 'Liquidity (10%)', 'LP Burnt (20%)'],
    datasets: [{
      data: [70, 10, 20],
      backgroundColor: [
        'rgba(255, 179, 186, 0.8)', // pastel pink
        'rgba(255, 223, 186, 0.8)', // pastel orange
        'rgba(186, 255, 201, 0.8)'  // pastel green
      ],
      borderWidth: 2,
      borderColor: '#fff',
      hoverOffset: 10
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              let value = context.formattedValue || '';
              return label + ': ' + value + '%';
            }
          }
        },
        legend: {
          display: true,
          position: 'bottom'
        }
      },
      cutout: '50%' // Membuat donut
    }
  };

  new Chart(ctx, config);
  
  // ========================
  // Counter Animation Script 
  // ========================
  document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter-number');
    let hasAnimated = false; // Ensure the animation only runs once (optional)

    // Use Intersection Observer so animation starts when counters are in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCounters(counters);
          hasAnimated = true;
        }
      });
    }, { threshold: 0.5 });

    // Observe the first counter (or any single element in the container)
    if (counters.length > 0) {
      observer.observe(counters[0]);
    }

    function animateCounters(counters) {
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
        const suffix = counter.getAttribute('data-suffix') || '';
        
        let current = 0;
        // The higher the divisor, the slower the count
        let increment = Math.max(1, Math.floor(target / 50));

        const timer = setInterval(() => {
          if (current < target) {
            current += increment;
            counter.textContent = current + suffix;
          } else {
            clearInterval(timer);
            counter.textContent = target + suffix;
          }
        }, 50); // updates every 50ms
      });
    }
  });
  
  //  =====LOADING PAGE DYNAMIC=====
   // Wait for the complete page to load
    window.addEventListener("load", function() {
        // Ensure loader is visible for at least 3 seconds
        setTimeout(function() {
            // Hide the loader
            document.getElementById("loader").style.display = "none";
            // Display the main content
            document.getElementById("content").style.display = "block";
        }, 1500);
    });

        // Scroll indicator animation
        const scrollIndicator = document.querySelector('.scroll-indicator');
        const scrollTrack = document.querySelector('.scroll-track');
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight);
            
            // Calculate indicator height relative to track
            const trackHeight = scrollTrack.offsetHeight;
            scrollIndicator.style.height = `${scrolled * trackHeight}px`;
        });

        // Smooth scroll and active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Update opacity based on scroll
        window.addEventListener('scroll', () => {
            if(window.innerWidth > 768) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    const section = document.querySelector(link.getAttribute('href'));
                    if(!section) return;
                    
                    const rect = section.getBoundingClientRect();
                    link.style.opacity = rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2 ? '1' : '0.5';
                });
            }
        });

// fungsi-fungsi music player
let progress = document.getElementById('progress');
let song = document.getElementById('song');
let ctrlIcon = document.getElementById('ctrlIcon');
let songImg = document.getElementById('songImg');

let currentSongIndex = 0; // Index of the current song in the playlist


const playlist = [
    { title: 'AIMORAIMO - Tuki.', source: '/audio/tuki.『アイモライモ』Official Music Video.mp3', image: '/Images/aimoraimo-yorushika.jpg' },

    { title: 'HARU - Yorushika', source: '/Audio/ヨルシカ - 晴る（OFFICIAL VIDEO）.mp3', image: '/images/haru-yorushika.png' },

    { title: 'SEESAW - Tuki', source: '/Audio/tuki.『シーソー』Official Music Video.mp3', image: '/Images/seesaw-tuki.webp' },

    { title: 'GHOST IN A FLOWER - Yorushika', source: '/Audio/ヨルシカ - 花に亡霊（OFFICIAL VIDEO）.mp3', image: '/Images/hana ni bourei-yorushika.jpg' },

    // Add more songs to your playlist

];

// Load the current song
loadSong();

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
}
// // Play the song after the page loads
window.addEventListener('load', () => {
    song.play().then(() => {
        ctrlIcon.classList.add('fa-pause');
        ctrlIcon.classList.remove('fa-play');
    }).catch((error) => {
        console.error('Autoplay failed:', error);
    });
});

// Play the song after the page loads
    window.addEventListener('load', () => {
        song.play();
        ctrlIcon.classList.add('fa-pause');
        ctrlIcon.classList.remove('fa-play');
    });

function loadSong() {
    let currentSong = playlist[currentSongIndex];
    song.src = currentSong.source;
    songImg.src = currentSong.image;
    document.querySelector('h6').textContent = currentSong.title;
}

function playPause() {
    if (ctrlIcon.classList.contains('fa-pause')) {
        song.pause();
        ctrlIcon.classList.remove('fa-pause');
        ctrlIcon.classList.add('fa-play');
    } else {
        song.play();
        ctrlIcon.classList.add('fa-pause');
        ctrlIcon.classList.remove('fa-play');
    }
}

// Update progress continuously
setInterval(() => {
    progress.value = song.currentTime;
}, 500);

progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add('fa-pause');
    ctrlIcon.classList.remove('fa-play');
}

function playNext() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong();
    song.play();
    ctrlIcon.classList.add('fa-pause');
    ctrlIcon.classList.remove('fa-play');
}

function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong();
    song.play();
    ctrlIcon.classList.add('fa-pause');
    ctrlIcon.classList.remove('fa-play');
}

function rotateImage() {
    let rotation = 0;
    setInterval(() => {
        if (!song.paused) {
            rotation = (rotation + 1) % 360;
            songImg.style.transform = `rotate(${rotation}deg)`;
        }
    }, 50);
}

rotateImage();

song.onended = function () {
    playNext();
}

// <!-- 
// CAROUSEL SLIDER
// -->
  // Duplicate slides until the wrapper fills at least double the container width.
  function duplicateSlidesUntilFull(container) {
    const wrapper = container.querySelector('.swiper-wrapper');
    const containerWidth = container.offsetWidth;
    
    // Remove previously added clones (non-original slides)
    Array.from(wrapper.children).forEach(child => {
      if (!child.hasAttribute('data-original')) {
        wrapper.removeChild(child);
      }
    });
    
    // Get the original slides
    const originalSlides = Array.from(wrapper.querySelectorAll('.swiper-slide[data-original]'));
    
    // Duplicate originals until the total width is at least double the container width.
    while (wrapper.scrollWidth < containerWidth * 2) {
      originalSlides.forEach(slide => {
        const clone = slide.cloneNode(true);
        // Clones are not marked as original.
        wrapper.appendChild(clone);
      });
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Get all swiper containers.
    const containers = document.querySelectorAll('.swiper-container');
    
    containers.forEach(container => {
      duplicateSlidesUntilFull(container);
      
      // Initialize a new Swiper instance for each container.
      new Swiper(container, {
        loop: true,
        speed: 2000, // Transition animation speed in ms.
        spaceBetween: 0,
        slidesPerView: 'auto',
        autoplay: {
          delay: 0,
        },
      });
    });
    
    // Update slide duplication on scroll.
    window.addEventListener('scroll', () => {
      containers.forEach(container => {
        duplicateSlidesUntilFull(container);
      });
    });
  });

//   =====COPY ALERT=====
// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copy-btn');
  
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText('9jZgvgS2bWtQiYzv48GcWzY4tnkeRSANbTm8Kp1LmSyS')
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Copied!',
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Copy failed!'
          });
        });
    });
  });
  
