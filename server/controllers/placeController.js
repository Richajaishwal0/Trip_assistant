const axios = require("axios");
const { handleServerError, sendSuccess } = require("../utils/errorHandler");

// Get more places from external API or database
const getMorePlaces = async (req, res) => {
  try {
    const { query = "famous places", page = 1, per_page = 12 } = req.query;

    console.log(
      "Fetching places with query:",
      query,
      "page:",
      page,
      "per_page:",
      per_page
    );

    // Check if PEXELS_API_KEY is configured
    const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
    
    if (!PEXELS_API_KEY) {
      console.error('❌ PEXELS_API_KEY environment variable is not set');
      return res.status(500).json({
        success: false,
        message: 'External API configuration missing. Please contact administrator.',
        error: 'Places service temporarily unavailable'
      });
    }

    console.log("PEXELS_API_KEY available:", !!PEXELS_API_KEY);
    console.log("Making request to Pexels API...");

    // Pexels API requires the key to be passed as a header
    const response = await axios.get(`https://api.pexels.com/v1/search`, {
      headers: {
        Authorization: `${PEXELS_API_KEY}`,
      },
      params: {
        query,
        page,
        per_page,
      },
    });

    // Make sure we're getting photos array from the response
    const photos = response.data.photos || [];

    // Transform each photo into our places format
    const places = photos.map((photo) => ({
      id: photo.id,
      src: photo.src.large,
      alt: photo.alt || "Beautiful destination",
      photographer: photo.photographer,
      location: photo.alt || "Amazing location",
      city: "Various Cities",
      attraction: photo.alt || "Tourist Attraction",
      description: photo.alt || "A beautiful destination worth exploring",
      price: "Contact for price",
      rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
    }));

    // Return the places array directly
    return res.status(200).json(places);
  } catch (error) {
    console.error("Error fetching places:", error.message);
    if (error.response) {
      console.error("Pexels API response error:", error.response.data);
      console.error("Status:", error.response.status);
    }
    return handleServerError(error, "Failed to fetch places", res);
  }
};

module.exports = {
  getMorePlaces,
};
