
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Home Slider
   */
  new Swiper('.home-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });


  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()
  /*
  *background slider
  */
  // let slideIndex = 0;
  // const slides = document.getElementsByClassName("slide");
  
  // function showSlides() {
  //     for (let i = 0; i < slides.length; i++) {
  //         slides[i].style.display = "none";  
  //     }
  //     slideIndex++;
  //     if (slideIndex > slides.length) {
  //         slideIndex = 1;
  //     }    
  //     slides[slideIndex - 1].style.display = "block";  
  //     setTimeout(showSlides, 5000); // Change image every 2 seconds
  // }
  
  // showSlides();
  

//   let slideIndex = 0;
// const slides = document.getElementsByClassName("slide");
// const textContent = ["Welcome to digital Marketing","Biggest Ever Holi Fest!!"];
// const buttonContent = ["Get Started","Book Tickets Now"];
// const buttonActions = ["#about", "https://insider.in/rang-rasiyathe-biggest-holiutsav-in-ranchi-holi-2024/event"];
// const buttonContent2 = ["Our Services","Learn More"];
// const buttonActions2 = ["#services", "#services"];
// const heroText = document.querySelector('.hero-info h2');
// const getStartedBtn = document.querySelector('.btn-get-started');
// const servicesBtn = document.querySelector('.btn-services');
// const indicatorsContainer = document.querySelector(".carousel-indicators");


// function showSlides() {
//     for (let i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";  
//     }
//     slideIndex++;
//     if (slideIndex > slides.length) {
//         slideIndex = 1;
//     }    
//     slides[slideIndex - 1].style.display = "block";

//     // Update indicators
//     indicatorsContainer.innerHTML = "";
//     for (let i = 0; i < slides.length; i++) {
//         const indicator = document.createElement("span");
//         indicator.classList.add("indicator");
//         if (i === slideIndex - 1) {
//             indicator.classList.add("active");
//         }
//         indicatorsContainer.appendChild(indicator);
//     }

//     // // Update text content
//     heroText.textContent = textContent[slideIndex - 1];

//     // // Update button content and actions
//     getStartedBtn.textContent = buttonContent[slideIndex - 1];
//     getStartedBtn.href = buttonActions[slideIndex - 1];
    
//     // getStartedBtnBtn.style.display = (slideIndex === slides.length) ? 'none' : 'inline';
//     // servicesBtn.style.display = (slideIndex === slides.length) ? 'none' : 'inline'; // Hide the services button on the last slide

//     setTimeout(showSlides, 4000); // Change image every 2 seconds
// }

// showSlides();

// let slideIndex = 0;
// const slides = document.getElementsByClassName("slide");
// const textContent = [
//     { text: "We provide solutions for your business!", showButtons: true },
//     { text: "", showButtons: false },
//     { text: "Discover our services and grow your business!", showButtons: true }
// ];
// const heroText = document.querySelector('.hero-info h2');
// const getStartedBtn = document.querySelector('.btn-get-started');
// const servicesBtn = document.querySelector('.btn-services');

// function showSlides() {
//     for (let i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";  
//     }
//     slideIndex++;
//     if (slideIndex > slides.length) {
//         slideIndex = 1;
//     }    
//     slides[slideIndex - 1].style.display = "block";

//     // Update text content and button visibility based on slideIndex
//     heroText.textContent = textContent[slideIndex - 1].text;
//     if (textContent[slideIndex - 1].showButtons) {
//         getStartedBtn.style.display = "inline-block";
//         servicesBtn.style.display = "inline-block";
//     } else {
//         getStartedBtn.style.display = "none";
//         servicesBtn.style.display = "none";
//     }

//     setTimeout(showSlides, 4000); // Change image every 2 seconds
// }

// showSlides();


//vesrsion 22-02-24

$(document).ready(function(){
  $('.carousel').carousel({
    interval: 5000, // 5 seconds
    pause: "hover",
    wrap: true
  });
});
