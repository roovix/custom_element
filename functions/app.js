// Function to get the current user
function getCurrentUser(auth) {
    const getCurrentUserUid = auth.currentUser;
    if(!getCurrentUserUid) {
        return { uid: null };
    }else{
        return getCurrentUserUid;
    }
}

// Function to convert isoTime isoString to time ago
function ISoToTimeAgo(isoString) {
    const now = new Date();
    const past = new Date(isoString);
    const seconds = Math.floor((now - past) / 1000);

    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "week", seconds: 604800 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }
    return "Just now";
}

// Format iso date into readable date
function formatISODate(isoString) {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const date = new Date(isoString);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}


// Function to upload and get image url
async function uploadImageToCloudinary(file=null, api='391989329564552', image_preset='image_preset', folder='profile') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', image_preset);
    formData.append('folder', folder);
    formData.append('api_key', api);

    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dtmbjcbvi/image/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        throw error;
    }
}

// Get domain from link
function getDomain(url) {
    try {
        let hostname = new URL(url).hostname;
        // Remove "www." if present
        return hostname.startsWith("www.") ? hostname.substring(4) : hostname;
    } catch (error) {
        console.error("Invalid URL:", error);
        return null;
    }
}

function changeSocialMediaThumbnail(newImageURL) {
    // Change Open Graph image (for Facebook, LinkedIn, WhatsApp, Discord, etc.)
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
        ogImage.setAttribute('content', newImageURL);
    }

    // Change Twitter Card image
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
        twitterImage.setAttribute('content', newImageURL);
    }
}

function isValidUID(input) {
    // Firebase UID is a 28 character long alphanumeric string
    return /^[A-Za-z0-9_-]{28}$/.test(input);
}

function isValidUsername(input) {
    // Username can be alphanumeric and may include underscores, dashes, etc.
    return /^[A-Za-z0-9_]+$/.test(input) && input.length <= 20; // Assuming max 20 characters for username
}

/**
 * Gets current GPS coordinates
 * @returns {Promise<{lat: number, lng: number}>} Object with latitude and longitude
 * @throws {Error} When geolocation fails with specific error message
 */
async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }

    const options = {
      enableHighAccuracy: true,  // Request GPS if available
      timeout: /Android/i.test(navigator.userAgent) ? 30000 : 10000, // Longer timeout for Android
      maximumAge: 0  // Don't use cached position
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        let errorMessage;
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access was denied. Please enable permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get location timed out. Try again in an open area.";
            break;
          default:
            errorMessage = "An unknown error occurred while getting location.";
        }
        reject(new Error(errorMessage));
      },
      options
    );
  });
}

export { uploadImageToCloudinary, ISoToTimeAgo, getCurrentUser, formatISODate, getDomain, isValidUID, isValidUsername, changeSocialMediaThumbnail, getCurrentLocation }
