/**
 * ============================================================
 *  VATAN RESTAURANT — PROMOTIONS CONFIG
 *  promos.js — Edit this file to add, remove, or update promos
 * ============================================================
 *
 *  HOW TO ADD A NEW PROMO:
 *  1. Drop the new image into the images/promos/ folder
 *  2. Copy one of the objects below and paste it into the array
 *  3. Set active: true
 *  4. Save the file — the page will automatically show it
 *
 *  HOW TO REMOVE A PROMO:
 *  Set   active: false
 *  (or delete the object entirely)
 *
 *  HOW TO UPDATE PRICING:
 *  Change the price field below — e.g. price: "$21.99"
 *
 *  FIELDS:
 *  - id        : unique identifier (no spaces)
 *  - file      : image filename inside images/promos/
 *  - day       : day label shown on the card
 *  - name      : promotion name
 *  - desc      : short description (shown in old card format)
 *  - price     : price string shown on badge
 *  - active    : true = show on page, false = hide
 *  - lightbox  : true = clicking card opens full image (recommended)
 *  - locations : which locations offer this promo, e.g. "Jersey City"
 *                or "Jersey City, East Windsor" or "All Locations"
 *                (case-insensitive; "all locations" → "All Locations")
 * ============================================================
 */

const VATAN_PROMOS = [
  {
    id:       "fathers-day-hero",
    file:     "Fathers Day.jpg",
    day:      "This Sunday",
    name:     "Grand Lunch Buffet",
    desc:     "Gobi 65, Samosa Chat, Pani Puri, Live Dosas, Veg Chilly Noodles, Veg Fried Rice, Undiyu & more",
    price:    "$27.99",
    active:   false,
    lightbox: true,
    locations: "East Windsor",
    heroOnly: true
  },
  {
    id:       "Father's Day",
    file:     "Fathers Day.jpg",
    day:      "This Sunday",
    name:     "Grand Lunch Buffet",
    desc:     "Gobi 65, Samosa Chat, Pani Puri, Live Dosas, Veg Chilly Noodles, Veg Fried Rice, Undiyu & more",
    price:    "$27.99",
    active:   false,
    lightbox: true,
    locations: "East Windsor"
  },
  {
    id:       "sunday-buffet",
    file:     "June Lunch Buffet.PNG",
    day:      "Every Sunday",
    name:     "Unlimited Buffet",
    desc:     "Kadai Paneer, Dal Fry, Garlic Rice, Veg Hakka Noodles, Desserts & more",
    price:    "$24.99",
    active:   false,
    lightbox: true,
    locations: "East Windsor"
  },
  {
    id:       "4thJuly",
    file:     "4thJuly2026.jpg",
    day:      "Today",
    name:     "Unlimited Buffet",
    desc:     "Amazing menu for 250th Independence Day",
    price:    "$27.99",
    active:    true,
    lightbox: true,
    locations: "East Windsor"
  },
  {
    id:       "tuesday-kathiyawadi",
    file:     "Tuesday_Night.jpg",
    day:      "Every Tuesday",
    name:     "Kathiyawadi Night",
    desc:     "Rotlo, Undhiyu, Baigan Bhartha, Khichdi, Kadhi, Fresh Mango Ras & more",
    price:    "$19.99",
    active:   true,
    lightbox: true,
    locations: "East Windsor"
  },
  {
    id:       "wednesday-chaat",
    file:     "Wednesday_Night.jpg",
    day:      "Every Wednesday",
    name:     "Chaat Night",
    desc:     "Pani Puri, Samosa Chat, Papdi Chat, Pav Bhaji, Gulab Jamun & more",
    price:    "$19.99",
    active:   true,
    lightbox: true,
    locations: "East Windsor"
  },
  {
    id:       "thursday-dosa",
    file:     "Thursday_Night.jpg",
    day:      "Every Thursday",
    name:     "Dosa Night",
    desc:     "Plain, Masala, Mysore & Spring Dosas with Sambhar, Chutney & more",
    price:    "$19.99",
    active:   true,
    lightbox: true,
    locations: "East Windsor"
  }
];

// Export for use in page (works as a plain script include)
if (typeof module !== 'undefined') module.exports = VATAN_PROMOS;
