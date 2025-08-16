const BASE_BADGE_URL = "/static/badges";

module.exports.badges = [
  { name: "Rookie", threshold: 5, imageUrl: `${BASE_BADGE_URL}/rookie.png` },
  { name: "Regular", threshold: 20, imageUrl: `${BASE_BADGE_URL}/regular.png` },
  { name: "Veteran", threshold: 50, imageUrl: `${BASE_BADGE_URL}/veteran.png` }
];
