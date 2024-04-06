let map;

    function initMap() {
      map = L.map('map').setView([0, 0], 8); // Default center and zoom level

      // Use a free tileset from OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);
    }
    function findNearestLocation() {
    // Check if the browser supports geolocation
    if ("geolocation" in navigator) {
      // Get the user's location
      navigator.geolocation.getCurrentPosition(function (position) {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        // Define a list of locations with their coordinates
        const locations = [
          { name: "Arihant E Recycling Pvt Ltd", lat: 21.548407, lon: 74.476746},
          { name: "Eco-Recycling Ltd", lat: 19.630951, lon: 72.909126 },
          { name: "E-Incarnation Recycling Pvt. Ltd", lat: 19.809900, lon: 72.744553, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Evergreen Recyclekaro India Pvt. Ltd", lat: 19.673910, lon: 73.075940, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Hi-Tech Recycling (I) Pvt. Ltd", lat: 18.555888, lon: 73.891957, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Justdispose Recycling Pvt Ltd", lat: 19.445070, lon: 72.823600, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Pranam Enterprises", lat: 18.445520, lon: 73.946010, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Techeco E-Waste Namo LLP", lat: 20.097040, lon: 73.813220, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Threco Recycling LLP", lat: 18.972200, lon: 73.438300, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "WE-The Recycling Company", lat: 19.336020, lon: 73.066380, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "ECO Friend Industries", lat: 19.085900, lon: 73.024900, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "A. S. ENTERPRISES", lat: 19.067110, lon: 72.901550, lnk: "https://maps.app.goo.gl/iwiaqq5zwGqqXqQx9" },
          { name: "AG Enterprises", lat: 18.703330, lon: 73.787020, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Alfa Trading Co", lat: 19.106809, lon:72.892686, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Aman Trading Co", lat: 19.092890, lon: 72.882780, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Ambar Enterprises", lat: 18.453640, lon: 73.918100, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Amiable Electroning Pvt. Ltd.", lat: 19.131577, lon: 72.891418, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Anand Computer System", lat: 18.587996, lon: 73.784014, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Ancus India Reprocessing Pvt. Ltd", lat: 19.434700, lon: 72.856750, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Aqsa Stamping", lat: 19.097590, lon: 73.065850, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "ARSH RECYCLING PRIVATE LIMITED", lat: 18.749730, lon: 74.236310, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Asquare Industrial Solutions", lat: 18.789500, lon: 73.344800, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Avis Technoways", lat: 18.202444, lon: 76.042483, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Baban Plastic", lat: 19.869680, lon: 75.223910, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Bharat E Waste Recycling Co.", lat: 19.420470, lon: 72.856100, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Bhavesh Enterprises", lat: 19.117420, lon: 73.055640, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "BKE RECYCLING", lat: 18.455640, lon: 73.958520, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Bombay Metal Works", lat: 19.117420, lon: 73.055640, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Bombay Recyclers Pvt. Ltd", lat: 19.056690, lon: 73.113030, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Bsqaure E-Waste Recyclers", lat: 19.254040, lon: 72.989930, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "CBS EWaste Recycling Industries", lat: 19.558940, lon: 74.017370, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Chaudhary Metal", lat: 19.183600, lon: 73.043450, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Clean Tech", lat: 19.254930, lon: 73.028590, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Connect Info Solutions India Private Limited", lat: 18.999280, lon: 73.113290, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "CPG Shell Mould & Casting", lat: 17.674999, lon: 74.026001, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "E Clean E Green Recycling", lat: 19.401570, lon: 72.839300, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Earth Sense Recycle Pvt. Ltd.", lat: 19.254930, lon: 73.028590, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Eco Layer E-Waste Recycling", lat: 19.397320, lon: 72.830540, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "ECO RESET PRIVATE LIMITED", lat: 19.213999, lon: 72.824250, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          { name: "Eco Tantra LLP", lat: 18.512660, lon: 73.859700, lnk: "https://maps.app.goo.gl/iyo5e8KQqFTzs66g6" },
          // Add more locations here
        ];

        // Function to calculate distance using the Haversine formula
        function calculateDistance(lat1, lon1, lat2, lon2) {
          const R = 6371; // Earth's radius in kilometers
          const dLat = (lat2 - lat1) * (Math.PI / 180);
          const dLon = (lon2 - lon1) * (Math.PI / 180);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return R * c; // Distance in kilometers
        }

        // Find the nearest location
        let nearestLocation;
        let nearestDistance = Infinity;

        locations.forEach((location) => {
          const distance = calculateDistance(userLat, userLon, location.lat, location.lon);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestLocation = location;
          }
        });

        // Display the nearest location and its distance
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `<p> Nearest Location: ${nearestLocation.name}</p> <p>Distance: ${nearestDistance.toFixed(2)} km</p> <a href= "${nearestLocation.lnk}" target="_blank"> Google maps</a>`;

        map.setView([nearestLocation.lat, nearestLocation.lon], 12); // Zoom level may need adjustment
          L.marker([nearestLocation.lat, nearestLocation.lon]).addTo(map)
            .bindPopup(nearestLocation.name)
            .openPopup();
      }, function (error) {
        // Handle geolocation errors
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("User denied the request for geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }



