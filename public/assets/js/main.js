
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky Header on Scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;

    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('sticked');
        if (nextElement) nextElement.classList.add('sticked-header-offset');
      } else {
        selectHeader.classList.remove('sticked');
        if (nextElement) nextElement.classList.remove('sticked-header-offset');
      }
    }
    window.addEventListener('load', headerFixed);
    document.addEventListener('scroll', headerFixed);
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar a');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
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
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
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
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
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
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

const quotes = [
  "Recycling electronics today for a brighter, cleaner tomorrow.",
  "E-waste recycling: small actions, big impacts.",
  "Turn Your E-Waste into E-Treasure.",
  "From Waste to Worth: E-Waste Recycling.",
  "Be the change-maker, the e-waste breaker. Recycle now."
    // Add more quotes as needed
];

const quoteContainer = document.getElementById("quote-container");
const quoteElement = document.getElementById("quote");
let currentIndex = 0;

function rotateQuote() {
    quoteElement.textContent = quotes[currentIndex];
    currentIndex = (currentIndex + 1) % quotes.length;
}

// Change the quote every 5 seconds (5000 milliseconds)
setInterval(rotateQuote, 5000);

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});
















// Price predictor model

/*function calculatePrice() {
  const age = parseInt(document.getElementById('age').value);
  const purchasePrice = parseInt(document.getElementById('purchasePrice').value);
  const quality = parseInt(document.getElementById('quality').value);
  const damages = parseInt(document.getElementById('damages').value);

  if (purchasePrice < 0 || purchasePrice > 9999999) {
      alert("Please enter a purchase price between 0 and 9,999,999.");
      return;
  }

  let basePrice = 0;
 

  basePrice = purchasePrice / age;


  let qualityMultiplier = 0;
  let damagesMultiplier = 0;

  switch (quality) {
      case 1:
          qualityMultiplier = 0.2;
          break;
      case 2:
          qualityMultiplier = 0.4;
          break;
      case 3:
          qualityMultiplier = 0.6;
          break;
      case 4:
          qualityMultiplier = 0.8;
          break;
      case 5:
          qualityMultiplier = 1;
          break;
  }

  switch (damages) {
      case 1:
          damagesMultiplier = 1;
          break;
      case 2:
          damagesMultiplier = 0.8;
          break;
      case 3:
          damagesMultiplier = 0.6;
          break;
      case 4:
          damagesMultiplier = 0.4;
          break;
      case 5:
          damagesMultiplier = 0.2;
          break;
  }

  let minPrice = basePrice * qualityMultiplier;
  let maxPrice = basePrice * (qualityMultiplier + damagesMultiplier);

  document.getElementById('priceRange').innerText = `Estimated Price Range: INR ${minPrice.toFixed(2)} - INR ${maxPrice.toFixed(2)}`;
}*/





function calculatePrice() {
  const age = parseInt(document.getElementById('age').value);
  const purchasePrice = parseInt(document.getElementById('purchasePrice').value);
  const quality = parseInt(document.getElementById('quality').value);
  const damages = parseInt(document.getElementById('damages').value);
  const brand = document.getElementById('brand').value.toLowerCase(); // Get brand and convert to lowercase
  const model = document.getElementById('Model').value.toLowerCase(); // Get model and convert to lowercase

  if (purchasePrice < 0 || purchasePrice > 9999999) {
      alert("Please enter a purchase price between 0 and 9,999,999.");
      return;
  }

  let basePrice = 0;
  basePrice = purchasePrice / age;

  let qualityMultiplier = 0;
  let damagesMultiplier = 0;
  let brandMultiplier = 0;
  let modelMultiplier = 0;

  // Set multipliers based on quality
  switch (quality) {
      case 1:
          qualityMultiplier = 0.2;
          break;
      case 2:
          qualityMultiplier = 0.4;
          break;
      case 3:
          qualityMultiplier = 0.6;
          break;
      case 4:
          qualityMultiplier = 0.8;
          break;
      case 5:
          qualityMultiplier = 1;
          break;
  }

  // Set multipliers based on damages
  switch (damages) {
      case 1:
          damagesMultiplier = 1;
          break;
      case 2:
          damagesMultiplier = 0.8;
          break;
      case 3:
          damagesMultiplier = 0.6;
          break;
      case 4:
          damagesMultiplier = 0.4;
          break;
      case 5:
          damagesMultiplier = 0.2;
          break;
  }

  // Set multipliers based on brand
  switch (brand) {
      case 'apple':
          brandMultiplier = 1.2;
          break;
      case 'oppo':
          brandMultiplier = 1.1;
          break;
      case 'lenevo':
          brandMultiplier = 1.05;
          break;
      case 'samsung':
          brandMultiplier = 1.15;
          break;
      default:
          brandMultiplier = 1; // Default multiplier for other brands
          break;
  }

  // Set multipliers based on model
  switch (model) {
      case 'model1':
          modelMultiplier = 1.2;
          break;
      case 'model2':
          modelMultiplier = 1.1;
          break;
      case 'model3':
          modelMultiplier = 1.05;
          break;
      case 'model4':
          modelMultiplier = 1.15;
          break;
      default:
          modelMultiplier = 1; // Default multiplier for other models
          break;
  }

  // Calculate price range using all multipliers
  let minPrice = basePrice * qualityMultiplier * damagesMultiplier * brandMultiplier * modelMultiplier;
  let maxPrice = Math.min(basePrice * (qualityMultiplier + damagesMultiplier) * brandMultiplier * modelMultiplier, purchasePrice);

  document.getElementById('priceRange').innerText = `Estimated Price Range: INR ${minPrice.toFixed(2)} - INR ${maxPrice.toFixed(2)}`;
}














//Voice assistant chatbot
 
const chatHistory = [];
const synth = window.speechSynthesis;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
let recognitionStartedByButton = false;

recognition.lang = 'en-US';

recognition.onresult = function(event) {
    if (!recognitionStartedByButton) {
        return; // Ignore the result if recognition wasn't started by the button
    }

    const userInput = event.results[0][0].transcript;
    const chatContainer = document.getElementById("chat");
    const userMessage = `<div><strong>You:</strong> ${userInput}</div>`;
    chatContainer.innerHTML += userMessage;

    // Add user input to chat history
    chatHistory.push(userInput);

    // Process user input
    const botResponse = getBotResponse(userInput);
    const botMessage = `<div><strong>Bot:</strong> ${botResponse}</div>`;
    chatContainer.innerHTML += botMessage;

    // Speak the bot response
    speak(botResponse);

    // Reset the flag after processing the input
    recognitionStartedByButton = false;
};

document.getElementById('voiceButton').addEventListener('click', function() {
    recognitionStartedByButton = true;
    recognition.start();
});

function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    const chatContainer = document.getElementById("chat");
    const userMessage = `<div><strong>You:</strong> ${userInput}</div>`;
    chatContainer.innerHTML += userMessage;

    // Add user input to chat history
    chatHistory.push(userInput);

    // Set the flag to false to prevent speaking
    recognitionStartedByButton = false;

    // Process user input
    const botResponse = getBotResponse(userInput);
    const botMessage = `<div><strong>Bot:</strong> ${botResponse}</div>`;
    chatContainer.innerHTML += botMessage;
}

function getBotResponse(userInput) {
    if (userInput.toLowerCase().includes("recycle" && "dispose")) {
        return "To recycle e-waste in your community, locate nearby recycling facilities or events. Proper recycling involves data wiping and separating components. Look for programs that accept various electronic devices and consider special disposal requirements. Valuable materials like metals and plastics can be recovered through recycling. Recycling old electronics reduces pollution, conserves resources, and supports a circular economy, often with incentives available.";
    }
    else if (userInput.toLowerCase().includes("e-waste" && "pollution")) {
      return "E-waste contributes to pollution through improper disposal methods, releasing hazardous chemicals into the environment. When electronic devices are discarded in landfills or incinerated, they emit toxins such as lead, mercury, and cadmium, contaminating soil, water, and air. Responsible e-waste management practices are crucial to mitigate pollution and safeguard environmental health.";
    }

    else if (userInput.toLowerCase().includes("e-waste" && "circular economy")) {
      return "E-waste poses challenges to the circular economy, but also offers opportunities for resource recovery and sustainability. Through proper recycling and reuse, e-waste can be transformed into valuable materials, contributing to the circular economy by reducing waste, conserving resources, and minimizing environmental impact. Embracing circular principles in e-waste management is essential for a more sustainable future.";
    }

    else if (userInput.toLowerCase().includes("e-waste" && "collection programs"
      )) {
      return "E-waste collection programs play a vital role in responsible waste management and resource conservation. These programs provide convenient and accessible avenues for individuals and businesses to dispose of their electronic devices safely. By participating in e-waste collection programs, communities can promote recycling, reduce landfill waste, and mitigate the environmental impacts of electronic consumption.";
    }

    else if (userInput.toLowerCase().includes("e-waste" && "electronic recycling facilities"
      )) {
      return "Electronic recycling facilities play a crucial role in the sustainable management of e-waste. These specialized facilities utilize advanced technologies to safely process and recycle discarded electronic devices. By extracting valuable materials and components from e-waste, electronic recycling facilities contribute to resource conservation, pollution prevention, and the promotion of a circular economy, fostering a more sustainable approach to electronic consumption.";
    }


    else if (userInput.toLowerCase().includes("e-waste" || "electronic waste"
      )) {
      return "E-waste, or electronic waste, refers to discarded electronic devices such as computers, smartphones, and televisions that are no longer in use and require proper disposal or recycling to prevent environmental contamination and promote resource recovery.";
    }


    else if (userInput.toLowerCase().includes("e-waste" && "responsible disposal"
      )) {
      return "Responsible disposal of e-waste is essential for protecting the environment and human health. By properly recycling or disposing of electronic devices, we can prevent hazardous substances from contaminating soil, water, and air. Adopting sustainable practices and supporting e-waste management initiatives ensures that we minimize the negative impacts of electronic consumption and contribute to a cleaner, healthier planet.";
    }


    else if (userInput.toLowerCase().includes("e-waste" && "reuse"
      )) {
      return "Reusing e-waste is an effective way to reduce its environmental impact and extend the lifespan of electronic devices. By refurbishing or repurposing old electronics, we can minimize the need for new manufacturing, conserve resources, and decrease electronic waste generation. Embracing reuse practices promotes sustainability and contributes to a more circular economy, where products are valued and utilized for as long as possible.";
    }

    else if (userInput.toLowerCase().includes("Toxic substances" && "environmental impact"
      )) {
      return "Toxic substances in e-waste, such as lead, mercury, and brominated flame retardants, pose serious environmental threats if improperly handled. These chemicals can contaminate soil, water, and air, harming ecosystems and human health. Proper disposal and recycling of e-waste are essential to mitigate these impacts, preventing pollution and conserving natural resources.";
    }

    else if (userInput.toLowerCase().includes("Hazardous materials" && "toxic substances"
      )) {
      return "E-waste contains hazardous materials and toxic substances, including lead, mercury, cadmium, and brominated flame retardants, which pose serious environmental and health risks if not handled properly. Safeguarding against the release of these substances through responsible disposal and recycling practices is crucial for protecting both ecosystems and human well-being.";
    }

    else if (userInput.toLowerCase().includes("dispose")) {
      return "Safely dispose of e-waste by researching local recycling facilities or collection events. Follow proper guidelines for data erasure and component separation before dropping off electronics. Regulations govern e-waste disposal to mitigate environmental harm. Avoid improper disposal to prevent pollution and conserve resources. Responsible disposal options ensure secure data removal and minimize negative environmental impacts, supporting a sustainable approach to waste management.";
    }

//16
    else if (userInput.toLowerCase().includes("Environmental impact")) {
      return "The environmental impact of e-waste is significant, with improper disposal leading to pollution of soil, water, and air due to the release of hazardous substances such as lead, mercury, and brominated flame retardants. Additionally, e-waste contributes to the depletion of natural resources and exacerbates electronic waste management challenges, highlighting the urgent need for effective recycling and sustainable disposal practices.";
    }


    else if (userInput.toLowerCase().includes("Toxic substances")) {
      return "Toxic substances in e-waste, such as lead, mercury, and brominated flame retardants, pose serious environmental threats if improperly handled. These chemicals can contaminate soil, water, and air, harming ecosystems and human health. Proper disposal and recycling of e-waste are essential to mitigate these impacts, preventing pollution and conserving natural resources.";
    }

    else if (userInput.toLowerCase().includes("Hazardous materials")) {
      return "Hazardous materials found in e-waste, such as lead, mercury, and cadmium, present significant environmental and health risks if not properly managed. Responsible disposal and recycling of electronic devices are essential to prevent the release of these hazardous substances into the environment, safeguarding both ecosystems and human well-being.";
    }
    else if (userInput.toLowerCase().includes("Pollution")) {
      return "When electronic devices are improperly disposed of or recycled, they release harmful substances such as lead, mercury, cadmium, and other toxic materials into the environment. These pollutants can contaminate soil, water, and air, posing serious health risks to humans and wildlife. Additionally, the improper handling of e-waste can lead to the release of greenhouse gases, contributing to climate change.";
    }

    else if (userInput.toLowerCase().includes("Circular Economy")) {
      return "In a circular economy, resources are kept in use for as long as possible, with the aim of minimizing waste and maximizing the value of products and materials through reuse, repair, refurbishment, and recycling. When applied to e-waste, this means designing electronic devices for durability, repairability, and recyclability, as well as establishing efficient systems for collection, refurbishment, and recycling of discarded electronics.";
    }

    else if (userInput.toLowerCase().includes("Resource Recovery")) {
      return "Resource recovery plays a crucial role in managing e-waste effectively. Electronic waste contains various valuable materials such as precious metals like gold, silver, and platinum, as well as rare earth elements, copper, and other metals that can be recovered and reused. Resource recovery processes, such as dismantling, shredding, sorting, and extraction techniques, are employed to recover these valuable materials from e-waste.";
    }

    else if (userInput.toLowerCase().includes("Sustainable Practices")) {
      return "Implementing sustainable practices in e-waste management involves prioritizing responsible disposal, recycling, and resource recovery methods. By promoting circular economy principles, such as product stewardship and extended producer responsibility, communities can minimize environmental impact, conserve resources, and reduce pollution associated with electronic waste disposal.";
    }

    else if (userInput.toLowerCase().includes("Collection Programs")) {
      return "Collection programs for e-waste are essential for facilitating the proper disposal and recycling of electronic devices at the end of their life cycle. These programs provide individuals and businesses with convenient and accessible options for safely disposing of their old or unwanted electronics, preventing them from ending up in landfills or being improperly disposed of.";
    }

    else if (userInput.toLowerCase().includes("Electronic recycling facilities")) {
      return "Electronic recycling facilities play a critical role in the responsible management of e-waste. These facilities are specialized centers equipped to handle the collection, processing, and recycling of electronic devices at the end of their life cycle.";
    }

    else if (userInput.toLowerCase().includes("Electronic Devices")) {
      return "Electronic devices that fall under the e-waste category include computers, laptops, smartphones, tablets, televisions, printers, and other consumer electronics. These devices become e-waste when they reach the end of their useful life and require proper disposal or recycling to prevent environmental pollution and conserve valuable resources.";
    }

    else if (userInput.toLowerCase().includes("Responsible disposal")) {
      return "One of the most effective ways to responsibly dispose of e-waste is through recycling at certified electronic recycling facilities. These facilities are equipped to safely dismantle, process, and recycle electronic devices, recovering valuable materials and preventing them from ending up in landfills.";
    }

    else if (userInput.toLowerCase().includes("Reuse")) {
      return "Reuse is a fundamental principle in the sustainable management of e-waste. Instead of immediately discarding electronic devices when they become obsolete or unwanted, prioritizing reuse can significantly reduce the environmental impact of electronic waste.";
    }

    else if (userInput.toLowerCase().includes("Electronic product stewardship")) {
      return "Electronic product stewardship refers to the responsibility that manufacturers, retailers, and other stakeholders have for managing electronic products throughout their entire lifecycle, from production to disposal. This concept emphasizes the need for all parties involved in the electronics industry to take proactive measures to minimize the environmental and social impacts of electronic products, including e-waste.";
    }

    else if (userInput.toLowerCase().includes("Landfills")) {
      return "E-waste poses a significant challenge for landfills due to its volume and hazardous components. Improper disposal of electronic devices in landfills can lead to leaching of toxic substances into soil and groundwater, posing environmental and health risks. Implementing proper e-waste management practices is essential to reduce the burden on landfills and mitigate environmental damage.";
    }

    else if (userInput.toLowerCase().includes("Extended producer responsibility")) {
      return "Extended Producer Responsibility (EPR) is a policy approach that places the responsibility for the end-of-life management of products on the manufacturers, rather than solely on consumers or governments. In the context of e-waste, EPR requires electronics manufacturers to take responsibility for the entire lifecycle of their products, including collection, recycling, and proper disposal when they reach the end of their useful life.";
    }


     else if (userInput.toLowerCase().includes("recycle")){
        return "E-waste recycling in your community starts with researching local recycling facilities that accept electronic devices. Follow proper steps, such as data erasure and component separation, before dropping off your e-waste. Many programs offer incentives for recycling, and materials like metals, plastics, and glass can be recovered. Recycling e-waste conserves resources, reduces pollution, and supports a sustainable circular economy.";
    }
    else if (userInput.toLowerCase().includes("dispose")) {
        return "E-waste should be properly disposed of to avoid environmental damage.";
    }
    else {
        return "I'm sorry, I don't understand. Can you please rephrase?";
    }
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

recognition.onstart = function() {
    document.getElementById("recognising").style.display = "block";
};

recognition.onend = function() {
    document.getElementById("recognising").style.display = "none";
};
















/*Prediction model using dataset*/ 

async function predictCost() {
  const age = document.getElementById('age').value;
  const condition = document.getElementById('condition').value;
  const brand = document.getElementById('brand').value;
  const model = document.getElementById('model').value;

  const response = await fetch('/predict', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ age, condition, brand, model })
  });

  const data = await response.json();
  document.getElementById('result').innerText = `Predicted cost: ₹${data.cost}`;
}

