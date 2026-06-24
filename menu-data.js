/**
 * ============================================================
 *  VATAN RESTAURANT — MENU DATA
 *  menu-data.js — Single source of truth for all menu items
 * ============================================================
 *
 *  HOW TO UPDATE A PRICE:
 *  Find the item below and change its price field. That's it.
 *  Both all-menu.html and order.html will reflect the new price.
 *
 *  HOW TO ADD AN ITEM:
 *  Copy an existing item object and paste it into the right
 *  category's items array. Set img to null if no photo yet.
 *
 *  HOW TO HIDE AN ITEM:
 *  Set active: false — it will disappear from both pages.
 *
 *  FIELDS:
 *  - id       : unique kebab-case identifier
 *  - name     : display name
 *  - desc     : short description
 *  - price    : number (e.g. 8.99)
 *  - img      : image path relative to site root, or null if none yet
 *  - tags     : array — any combo of "J" (Jain) and "S" (Swaminarayan)
 *  - note     : optional small note shown under the item name (e.g. "To-Go only")
 *  - section  : optional sub-section heading within a category
 *  - active   : true = shown, false = hidden
 *
 *  CATEGORY FIELDS:
 *  - id        : matches the HTML section id
 *  - name      : display name
 *  - emoji     : category tab emoji
 *  - label     : small sub-label above the section heading
 *  - tagline   : section tagline
 *  - headerImg : section header image path, or null for placeholder
 * ============================================================
 */

const VATAN_MENU = [

  // ═══ THALI ═══
  {
    id: "thali",
    name: "Thali",
    emoji: "🍛",
    label: "Signature",
    tagline: "A complete royal feast — everything served fresh, unlimited refills on select items",
    headerImg: null,
    items: [
      {
        id: "vatan-special-thali",
        name: "Vatan Special Thali",
        desc: "3 vegetables, one kathol, rice, khichdi, kadhi, dal, pickle, jaggery, garlic chutney, sweet, raita, papad & farsan. Choice of 2 rotla / 5 roti / 5 poori / 3 methi thepla / 3 puran poli",
        price: 20.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "punjabi-thali",
        name: "Punjabi Thali",
        desc: "2 veg curries, Dal fry, Jeera rice, Butter Naan, Gulab Jamun, Achar, Chaas, papad, salad",
        price: 20.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "swaminarayan-thali",
        name: "Swaminarayan Thali",
        desc: "2 vegetables, one kathol, rice, khichdi, kadhi, dal, pickle, jaggery, sweet, raita, papad & farsan",
        price: 21.99,
        img: null,
        tags: ["S"],
        note: null,
        active: true
      },
      {
        id: "jain-thali",
        name: "Jain Thali",
        desc: "2 vegetables, one kathol, rice, khichdi, kadhi, dal, pickle, jaggery, sweet, raita, papad & farsan",
        price: 20.99,
        img: null,
        tags: ["J"],
        note: null,
        active: true
      },
      {
        id: "corporate-lunch",
        name: "Vatan Corporate Lunch",
        desc: "One appetizer, two vegetables, dal, rice, 3 rotis, raita & pickle",
        price: 12.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "student-special",
        name: "Student Special",
        desc: "2 vegetables, dal, rice, 3 rotis and raita",
        price: 10.99,
        img: null,
        tags: [],
        note: "To-Go only",
        active: true
      }
    ]
  },

  // ═══ CHAAT ═══
  {
    id: "chaat",
    name: "Chaat",
    emoji: "🍡",
    label: "Street Food",
    tagline: "Mumbai's iconic street flavors — tangy, sweet, spicy & utterly addictive",
    headerImg: "images/food/Panipuri.jpg",
    items: [
      {
        id: "pani-poori-shots",
        name: "Pani Poori Shots",
        desc: "Bite sized flour shell stuffed with potatoes & chickpeas dipped in 6 different sauces",
        price: 8.99,
        img: "images/food/Panipuri.jpg",
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "sev-poori",
        name: "Sev Poori",
        desc: "Crispy wheat poori topped with potatoes, onion, tomatoes, spicy mint, sweet tamarind, garlic chutney & fine sev",
        price: 8.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "dahi-batata-poori",
        name: "Dahi Batata Poori",
        desc: "Crispy puff poori stuffed with potatoes, onion, tomatoes, spicy mint, sweet tamarind, garlic chutney & fine sev",
        price: 8.99,
        img: null,
        tags: ["S"],
        note: null,
        active: true
      },
      {
        id: "samosa-3pcs",
        name: "Samosa (3 Pcs.)",
        desc: "Crispy triangular pastry filled with spiced potatoes & peas, served with mint chutney",
        price: 7.99,
        img: null,
        tags: ["J"],
        note: null,
        active: true
      },
      {
        id: "samosa-chaat",
        name: "Samosa Chaat",
        desc: "Samosa with chickpeas curry, onion, tomatoes, spicy mint, sweet tamarind, garlic chutney & fine sev",
        price: 8.99,
        img: null,
        tags: ["J"],
        note: null,
        active: true
      },
      {
        id: "papdi-chaat",
        name: "Papdi Chaat",
        desc: "Crushed pooris with potatoes, onion, tomatoes, spicy mint, sweet tamarind, garlic chutney, sweetened yogurt & fine sev",
        price: 8.99,
        img: null,
        tags: ["S"],
        note: null,
        active: true
      },
      {
        id: "ragda-pattice",
        name: "Ragda Pattice",
        desc: "Potato patties & white peas curry garnished with onion, tomatoes, spicy mint, sweet tamarind, garlic chutney, sweetened yogurt & fine sev",
        price: 8.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "bhel",
        name: "Bhel",
        desc: "Slightly sweet, spicy & sour puffed rice tossed with chaat chutneys, veggies & sev",
        price: 8.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "chaat-thali",
        name: "Chaat Thali",
        desc: "Three pieces of pani puri, bhel, one piece of ragda pattice & three pieces of dahi puri",
        price: 16.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      }
    ]
  },

  // ═══ PAV KA KAMAL ═══
  {
    id: "pav",
    name: "Pav Ka Kamal",
    emoji: "🥖",
    label: "Mumbai Street Classics",
    tagline: "The magic of Mumbai's beloved pav — done Vatan's way",
    headerImg: "images/food/Misal.jpg",
    items: [
      {
        id: "misal-pav",
        name: "Misal Pav",
        desc: "Famous Maharashtrian dish of spicy gravy & sprouts topped with gram flour crisps, served with pav & onions",
        price: 9.99,
        img: "images/food/Misal.jpg",
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "vada-pav",
        name: "Vada Pav",
        desc: "Indian style burger stuffed with spiced potato dumplings, deep fried & served with chutneys",
        price: 8.99,
        img: "images/food/Vadapavv.jpg",
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "dabeli",
        name: "Dabeli",
        desc: "Sweet & spicy potato mixture topped with garlic chutney & pomegranate seeds, served in pav",
        price: 8.99,
        img: "images/food/Dabeli.jpg",
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "pav-bhaji",
        name: "Pav Bhaji",
        desc: "Mumbai style mixed vegetables cooked with Indian spices, served with pav & onions",
        price: 9.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "cheese-pav-bhaji",
        name: "Cheese Pav Bhaji",
        desc: "Mixed vegetables cooked with Indian spices & topped with Amul cheese, served with pav & onions",
        price: 10.99,
        img: null,
        tags: ["S"],
        note: null,
        active: true
      },
      {
        id: "masala-pav",
        name: "Masala Pav",
        desc: "Pav filled with mixed vegetable curry, served with onions",
        price: 10.99,
        img: null,
        tags: ["S"],
        note: null,
        active: true
      },
      {
        id: "cheese-masala-pav",
        name: "Cheese Masala Pav",
        desc: "Pav filled with mixed vegetable curry & topped with Amul cheese, served with onions",
        price: 11.99,
        img: null,
        tags: ["S"],
        note: null,
        active: true
      },
      {
        id: "szechwan-vada-pav",
        name: "Szechwan Vada Pav",
        desc: "Indian style burger with spiced potato dumplings & fiery szechwan sauce",
        price: 8.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "samosa-pav",
        name: "Samosa Pav",
        desc: "Indian style burger stuffed with samosas & onions",
        price: 8.99,
        img: null,
        tags: [],
        note: null,
        active: true
      }
    ]
  },

  // ═══ GUJARATI STARTERS ═══
  {
    id: "gujarati-app",
    name: "Gujarati Appetizers",
    emoji: "🫔",
    label: "From Gujarat with Love",
    tagline: "Authentic Gujarati snacks — steamed, fried & full of flavor",
    headerImg: null,
    items: [
      {
        id: "methi-gota",
        name: "Methi Gota",
        desc: "Fried dumplings made of fenugreek leaves with chickpea flour",
        price: 8.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "dokla-ka-mokla",
        name: "Dokla Ka Mokla",
        desc: "Khaman dhokla cut into pieces, served with sweet & spicy sauce and yogurt",
        price: 8.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "khichu",
        name: "Khichu",
        desc: "Authentic steamed rice flour served with spicy oil",
        price: 10.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "bhungra-batata",
        name: "Bhungra Batata",
        desc: "Fried fryums served with garlic & spicy potato",
        price: 10.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "muthiya",
        name: "Muthiya",
        desc: "Steamed mix of rice, wheat & chickpea flour with Indian herbs",
        price: 8.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "khaman-dhokla",
        name: "Khaman Dhokla",
        desc: "Steamed savory cake with gram flour, topped with mustard, cumin & green chili tempering",
        price: 8.99,
        img: null,
        tags: [],
        note: null,
        active: true
      }
    ]
  },

  // ═══ INDO-CHINESE ═══
  {
    id: "indochinese",
    name: "Indo-Chinese",
    emoji: "🥢",
    label: "East Meets India",
    tagline: "The legendary fusion — Indian spices with Chinese techniques",
    headerImg: null,
    items: [
      {
        id: "spring-roll",
        name: "Spring Roll (3 Pcs.)",
        desc: "Crispy wheat wrap filled with shredded vegetables",
        price: 7.99,
        img: null,
        tags: [],
        section: "Starters",
        note: null,
        active: true
      },
      {
        id: "chilly-milly-potatoes",
        name: "Chilly Milly Potatoes",
        desc: "Potato wedges cooked with szechwan sauce",
        price: 10.99,
        img: null,
        tags: ["S"],
        section: "Starters",
        note: null,
        active: true
      },
      {
        id: "chinese-bhel",
        name: "Chinese Bhel",
        desc: "Vegetables tossed with fried noodles — served cold",
        price: 11.99,
        img: null,
        tags: ["J","S"],
        section: "Starters",
        note: null,
        active: true
      },
      {
        id: "gobi-65",
        name: "Gobi 65",
        desc: "Crunchy cauliflower florets batter fried with chilies & spices",
        price: 11.99,
        img: null,
        tags: ["J","S"],
        section: "Starters",
        note: null,
        active: true
      },
      {
        id: "paneer-65",
        name: "Paneer 65",
        desc: "Crunchy paneer florets batter fried with chilies & spices",
        price: 11.99,
        img: null,
        tags: ["J","S"],
        section: "Starters",
        note: null,
        active: true
      },
      {
        id: "veg-manchurian-dry",
        name: "Vegetable Manchurian (Dry)",
        desc: "Vegetable fried dumplings tossed in spicy tangy sauce & Indo-Chinese spices",
        price: 11.99,
        img: null,
        tags: ["J","S"],
        section: "Starters",
        note: null,
        active: true
      },
      {
        id: "gobi-manchurian-dry",
        name: "Gobi Manchurian (Dry)",
        desc: "Cauliflower fried dumplings tossed with spicy tangy sauce & Indo-Chinese spices",
        price: 11.99,
        img: null,
        tags: ["J","S"],
        section: "Starters",
        note: null,
        active: true
      },
      {
        id: "paneer-lollipops",
        name: "Special Paneer Lollipops",
        desc: "Cottage cheese balls — crispy outside, soft inside — served on a stick",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        section: "Starters",
        note: null,
        active: true
      },
      {
        id: "paneer-chilly-dry",
        name: "Paneer Chilly (Dry)",
        desc: "Cottage cheese & green pepper tossed in spicy chili sauce with Indo-Chinese seasonings",
        price: 11.99,
        img: null,
        tags: ["S"],
        section: "Starters",
        note: null,
        active: true
      },
      {
        id: "okra-tempura",
        name: "Okra Tempura",
        desc: "Bhindi stuffed with spices, coated with tempura batter & deep fried",
        price: 12.99,
        img: null,
        tags: ["J","S"],
        section: "Starters",
        note: null,
        active: true
      },
      {
        id: "veg-hakka-noodles",
        name: "Veg Hakka Noodles",
        desc: "Boiled wheat noodles & stir vegetables in soy-ginger sauce & Chinese seasonings",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        section: "Mains",
        note: null,
        active: true
      },
      {
        id: "szechwan-noodles",
        name: "Szechwan Noodles",
        desc: "Boiled wheat noodles & stir vegetables in spicy szechwan sauce",
        price: 14.99,
        img: null,
        tags: ["J","S"],
        section: "Mains",
        note: null,
        active: true
      },
      {
        id: "paneer-szechwan-noodles",
        name: "Paneer Szechwan Noodles",
        desc: "Wheat noodles, stir vegetables & cottage cheese in spicy szechwan sauce",
        price: 15.99,
        img: null,
        tags: ["J","S"],
        section: "Mains",
        note: null,
        active: true
      },
      {
        id: "veg-fried-rice",
        name: "Veg Fried Rice",
        desc: "Boiled rice & stir vegetables in soy-ginger sauce & Chinese seasonings",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        section: "Mains",
        note: null,
        active: true
      },
      {
        id: "szechwan-fried-rice",
        name: "Szechwan Fried Rice",
        desc: "Boiled rice & stir vegetables in spicy szechwan sauce",
        price: 14.99,
        img: null,
        tags: ["J","S"],
        section: "Mains",
        note: null,
        active: true
      },
      {
        id: "triple-szechwan-fried-rice",
        name: "Triple Szechwan Fried Rice",
        desc: "Layers of szechwan fried rice, noodles & veg manchurian gravy",
        price: 16.99,
        img: null,
        tags: ["J","S"],
        section: "Mains",
        note: null,
        active: true
      },
      {
        id: "gobi-manchurian-gravy",
        name: "Gobi Manchurian Gravy",
        desc: "Cauliflower fried dumplings tossed with spicy tangy sauce & Indo-Chinese spices with gravy",
        price: 14.99,
        img: null,
        tags: ["J","S"],
        section: "Mains",
        note: null,
        active: true
      },
      {
        id: "veg-manchurian-gravy",
        name: "Vegetable Manchurian Gravy",
        desc: "Vegetable fried dumplings tossed in spicy tangy sauce & Indo-Chinese spices with gravy",
        price: 14.99,
        img: null,
        tags: ["J","S"],
        section: "Mains",
        note: null,
        active: true
      },
      {
        id: "paneer-chilly-gravy",
        name: "Paneer Chilly Gravy",
        desc: "Cottage cheese & green pepper tossed in spicy chili sauce with gravy",
        price: 14.99,
        img: null,
        tags: ["J","S"],
        section: "Mains",
        note: null,
        active: true
      }
    ]
  },

  // ═══ PUNJABI CURRIES ═══
  {
    id: "punjabi",
    name: "Punjabi Curries",
    emoji: "🫕",
    label: "North Indian Classics",
    tagline: "Rich, creamy, boldly spiced — the heart of North Indian vegetarian cooking",
    headerImg: "images/food/Paneerbuttermasala.jpg",
    items: [
      {
        id: "paneer-makhani",
        name: "Paneer Makhani",
        desc: "Cubes of homemade cottage cheese simmered in fresh tomato & butter cream sauce",
        price: 15.99,
        img: "images/food/Paneerbuttermasala.jpg",
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "saag-paneer",
        name: "Saag Paneer",
        desc: "Finely chopped garden fresh spinach cooked with homemade cottage cheese",
        price: 15.99,
        img: "images/food/Palakpaneer.jpg",
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "paneer-tikka-masala",
        name: "Paneer Tikka Masala",
        desc: "Fire roasted cubes of marinated cottage cheese & green pepper in flavorful curry sauce",
        price: 15.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "shahi-paneer",
        name: "Shahi Paneer",
        desc: "Rich Mughlai dish with cottage cheese in battered onion & cashew cream sauce",
        price: 15.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "kadai-paneer",
        name: "Kadai Paneer",
        desc: "Homemade cottage cheese stir fried in onion & tomato curry paste",
        price: 15.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "mutter-paneer",
        name: "Mutter Paneer",
        desc: "Peas cooked with homemade cottage cheese in creamy onion & tomato sauce",
        price: 15.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "paneer-bhurji",
        name: "Paneer Bhurji",
        desc: "Grated cottage cheese cooked in fresh tomato & butter cream sauce",
        price: 15.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "navratan-korma",
        name: "Navratan Korma",
        desc: "Mixed vegetables cooked in creamy mild sauce garnished with dry fruits",
        price: 15.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "veg-jalfrezi",
        name: "Veg Jalfrezi",
        desc: "Fresh garden vegetables marinated in ginger-garlic, cooked with Indian spices",
        price: 15.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "veg-kolhapuri",
        name: "Veg Kolhapuri",
        desc: "Spicy mixed vegetables marinated in ginger-garlic, cooked with Indian spices",
        price: 15.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "peshawari-chole",
        name: "Peshawari Chole",
        desc: "Tender chickpeas cooked with Indian spices & simmered in onion gravy",
        price: 15.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "bhindi-masala",
        name: "Bhindi Masala",
        desc: "Tender okra stir fried with Indian spices, onions & green peas",
        price: 15.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "methi-mutter-malai",
        name: "Methi Mutter Malai",
        desc: "North Indian dish made from fenugreek leaves, green peas & heavy cream",
        price: 15.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "cheese-butter-masala",
        name: "Cheese Butter Masala",
        desc: "Indian cottage cheese cubes in a creamy tomato sauce",
        price: 15.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "malai-kofta",
        name: "Malai Kofta",
        desc: "Potato & cottage cheese balls stuffed with dry fruit in a delicate cream sauce",
        price: 16.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "aloo-jeera",
        name: "Aloo Jeera",
        desc: "Boiled potatoes tossed in simple masalas & coarsely crushed roasted cumin seeds",
        price: 15.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "aloo-palak",
        name: "Aloo Palak",
        desc: "Finely chopped garden fresh spinach cooked with potatoes",
        price: 15.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "aloo-mutter",
        name: "Aloo Mutter",
        desc: "Green peas & potatoes cooked with Indian spices in ginger-garlic tomato sauce",
        price: 15.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "lasooni-palak",
        name: "Lasooni Palak",
        desc: "Finely cut garden fresh spinach cooked in garlic flavored sauce",
        price: 16.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "koya-kaju",
        name: "Koya Kaju",
        desc: "Curry made with toasted cashew laced in a creamy sauce",
        price: 16.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "sham-severa",
        name: "Sham Severa",
        desc: "Exotic combination of spinach & cottage cheese dumplings in a creamy sauce",
        price: 16.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "dal-tadka",
        name: "Dal Tadka",
        desc: "Delicate blend of yellow lentils with tempered spices",
        price: 14.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "dal-makhani",
        name: "Dal Makhani",
        desc: "Mix lentils cooked in thick buttery stew & garnished with fresh cream",
        price: 14.99,
        img: null,
        tags: [],
        note: null,
        active: true
      }
    ]
  },

  // ═══ SHAAK VAAK ═══
  {
    id: "shaak",
    name: "Shaak Vaak",
    emoji: "🥘",
    label: "Gujarati Vegetable Curries",
    tagline: "Traditional Gujarati vegetable dishes — rustic, wholesome & deeply flavorful",
    headerImg: "images/food/Bharta.jpg",
    items: [
      {
        id: "baigan-bharta",
        name: "Baigan Bharta",
        desc: "Roasted eggplant cooked in masala paste made of green onions & sesame seeds",
        price: 14.99,
        img: "images/food/Bharta.jpg",
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "undhiyu",
        name: "Undhiyu",
        desc: "Traditional & authentic mix vegetables cooked with grated coconut, peanuts & spices",
        price: 15.99,
        img: null,
        tags: ["J"],
        note: null,
        active: true
      },
      {
        id: "sev-tameta",
        name: "Sev Tameta",
        desc: "Tomato cooked with chef special spices, garnished with chickpea noodles",
        price: 14.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "rasawala-lasaniya-batata",
        name: "Rasawala Lasaniya Batata",
        desc: "Potato cooked with garlic & special spices",
        price: 14.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "turiya-patra",
        name: "Turiya Patra",
        desc: "Ridge gourd mixed with colocasia leaf with authentic spices",
        price: 14.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "sukhi-bhaji",
        name: "Sukhi Bhaji",
        desc: "Dry boiled potato with special spices",
        price: 14.99,
        img: null,
        tags: ["S"],
        note: null,
        active: true
      }
    ]
  },

  // ═══ HALKE PHULKE ═══
  {
    id: "halke",
    name: "Halke Phulke",
    emoji: "🫓",
    label: "Bread & Curry Combos",
    tagline: "Light & satisfying bread-curry combinations — comfort food at its finest",
    headerImg: null,
    items: [
      {
        id: "dal-dhokli",
        name: "Dal Dhokli",
        desc: "Whole wheat dumplings cooked in lentil soup",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "vagharelo-rotlo",
        name: "Vagharelo Rotlo",
        desc: "Millet flour bread cooked in buttermilk & spices",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "masala-khichdi",
        name: "Masala Khichdi",
        desc: "Rice cooked with lentils, vegetables & Indian spices",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "dal-khichdi",
        name: "Dal Khichdi",
        desc: "Mixture of yellow lentils with rice blended with special chef tadka",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "rotla-shak",
        name: "Rotla Shak",
        desc: "2 millet flour breads with choice of Gujarati shak or curry of the day, pickle, jaggery, garlic chutney, papad & raita",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "thepla-shak",
        name: "Thepla Shak",
        desc: "2 fenugreek leaves bread served with choice of Gujarati shak or curry of the day, pickle, papad & raita",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "puran-poli-shak",
        name: "Puran Poli Shak",
        desc: "2 sweet lentil breads served with choice of Gujarati shak or curry, pickle, papad & raita",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "poori-shak",
        name: "Poori Shak",
        desc: "4 whole wheat deep fried breads with choice of Gujarati shak or curry, pickle, papad & raita",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "rotli-shak",
        name: "Rotli Shak",
        desc: "3 wheat breads with choice of Gujarati shak or curry, pickle, papad & raita",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "chhole-bhature",
        name: "Chhole Bhature",
        desc: "2 fried Indian breads with curried chickpeas, onions, raita & papad",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "chhole-poori",
        name: "Chhole Poori",
        desc: "4 whole wheat deep fried breads with curried chickpeas, onions, raita & papad",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "poori-bhaji",
        name: "Poori Bhaji",
        desc: "4 whole wheat deep fried breads with dry potato curry, raita & papad",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "makki-roti-sarson-saag",
        name: "Makki di Roti Sarson da Saag",
        desc: "2 corn flour breads with special North Indian mustard flavored curry",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      }
    ]
  },

  // ═══ SANDWICHES ═══
  {
    id: "sandwich",
    name: "Indian Sandwiches",
    emoji: "🥪",
    label: "Rekdi Wali",
    tagline: "Mumbai's street-style sandwiches — layered, toasted & packed with flavor",
    headerImg: "images/food/Sandwiches.jpg",
    items: [
      {
        id: "veg-sandwich",
        name: "Vegetable Sandwich",
        desc: "3 layers of bread stuffed with potato, cucumber, onion & tomato with green mint & red garlic chutney",
        price: 9.99,
        img: "images/food/Sandwiches.jpg",
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "veg-cheese-sandwich",
        name: "Vegetable Cheese Sandwich",
        desc: "3 layers with potato, cucumber, onion & tomato, mint & garlic chutney, garnished with Amul cheese",
        price: 10.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "masala-toast-sandwich",
        name: "Masala Toast Sandwich",
        desc: "3 layers of toasted bread stuffed with masala aloo, cucumber, onion & tomato with chutneys",
        price: 10.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "masala-cheese-toast-sandwich",
        name: "Masala Cheese Toast Sandwich",
        desc: "3 layers toasted bread with masala aloo, cucumber, onion & tomato, garnished with Amul cheese",
        price: 11.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "samosa-grill-sandwich",
        name: "Samosa Grill Sandwich",
        desc: "3 layers of toasted bread stuffed with samosa, green mint & red garlic chutney",
        price: 10.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "cheese-samosa-grill-sandwich",
        name: "Cheese Samosa Grill Sandwich",
        desc: "Toasted bread stuffed with samosa, chutneys, garnished with Amul cheese",
        price: 11.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "cheese-chilly-grill-toast",
        name: "Cheese Chilly Grill Toast",
        desc: "2 layers of toasted bread stuffed with Amul cheese & green chili stuffing",
        price: 10.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "modi-sandwich",
        name: "Modi Sandwich",
        desc: "4 layers of bread with melted Vatan's signature filling",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "veg-jumbo-junglee-sandwich",
        name: "Vegetable Jumbo Junglee Sandwich",
        desc: "Home-style round bread stuffed with mayonnaise, lettuce, potatoes, cucumber, onion & tomatoes with mint & garlic chutney",
        price: 17.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "paneer-jumbo-junglee-sandwich",
        name: "Paneer Jumbo Junglee Sandwich",
        desc: "Home-style round bread stuffed with tandoori paneer, bell peppers & onions, spiced with mint & garlic chutney",
        price: 17.99,
        img: null,
        tags: [],
        note: null,
        active: true
      }
    ]
  },

  // ═══ ROLLS & FRANKIES ═══
  {
    id: "rolls",
    name: "Rolls & Frankies",
    emoji: "🌯",
    label: "Chithi Aayi Hai",
    tagline: "Wrapped, spiced & rolled — perfect on the go",
    headerImg: null,
    items: [
      {
        id: "veg-frankie",
        name: "Veg Frankie",
        desc: "Classic vegetarian Frankie roll",
        price: 9.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "veg-cheese-frankie",
        name: "Veg Cheese Frankie",
        desc: "Classic Frankie roll with melted cheese",
        price: 10.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "szechwan-cheese-roll",
        name: "Szechwan Cheese Roll",
        desc: "Roti wrapped with spiced mashed potatoes in szechwan sauce & Amul cheese",
        price: 10.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "szechwan-roll",
        name: "Szechwan Roll",
        desc: "Roti wrapped with spiced mashed potatoes in szechwan sauce",
        price: 9.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "paneer-tikka-kathi-roll",
        name: "Paneer Tikka Kathi Roll",
        desc: "Grilled paneer wrapped in flat paratha with onions & green pepper",
        price: 10.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "mix-veg-kathi-roll",
        name: "Mix Vegetable Kathi Roll",
        desc: "Mixed vegetables wrapped in flat paratha in ground spices",
        price: 9.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "aachari-aloo-kathi-roll",
        name: "Aachari Aloo Kathi Roll",
        desc: "Spiced potato patty marinated in pickle, wrapped in flat paratha",
        price: 9.99,
        img: null,
        tags: ["S"],
        note: null,
        active: true
      },
      {
        id: "chana-masala-kathi-roll",
        name: "Chana Masala Kathi Roll",
        desc: "Chickpeas wrapped in flat paratha in ground spices",
        price: 9.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      }
    ]
  },

  // ═══ DESI PIZZAS ═══
  {
    id: "desi-pizza",
    name: "Desi Pizzas",
    emoji: "🍕",
    label: "Indian Style",
    tagline: "Pizza with an Indian heart — Amul cheese, desi toppings, Vatan's magic",
    headerImg: null,
    items: [
      {
        id: "cheese-pizza",
        name: "Cheese Pizza",
        desc: "Classic cheese pizza with Amul cheese on Indian bread base",
        price: 8.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "cheese-chilly-pizza",
        name: "Cheese Chilly Pizza",
        desc: "Cheese pizza with a fiery chili kick",
        price: 9.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "mix-veg-pizza",
        name: "Mix Vegetable Pizza",
        desc: "Loaded with fresh seasonal vegetables & Amul cheese",
        price: 9.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "paneer-pizza",
        name: "Paneer Pizza",
        desc: "Spiced cottage cheese on Indian pizza bread with cheese",
        price: 10.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      }
    ]
  },

  // ═══ TANDOOR ═══
  {
    id: "tandoor",
    name: "Tandoor",
    emoji: "🔥",
    label: "From the Clay Oven",
    tagline: "Hand-stretched breads, baked fresh in our clay tandoor",
    headerImg: null,
    items: [
      {
        id: "tandoori-roti",
        name: "Tandoori Roti",
        desc: "Leavened whole wheat bread baked in clay oven",
        price: 3.99,
        img: null,
        tags: [],
        section: "Tandoor Breads",
        note: null,
        active: true
      },
      {
        id: "butter-tandoori-roti",
        name: "Butter Tandoori Roti",
        desc: "Leavened whole wheat bread baked in clay oven, topped with butter",
        price: 4.49,
        img: null,
        tags: ["J"],
        section: "Tandoor Breads",
        note: null,
        active: true
      },
      {
        id: "plain-naan",
        name: "Plain Naan",
        desc: "Leavened white flour bread baked in tandoor oven",
        price: 2.99,
        img: null,
        tags: [],
        section: "Tandoor Breads",
        note: null,
        active: true
      },
      {
        id: "butter-naan",
        name: "Butter Naan",
        desc: "Leavened white flour bread baked in clay oven, topped with butter",
        price: 3.99,
        img: null,
        tags: [],
        section: "Tandoor Breads",
        note: null,
        active: true
      },
      {
        id: "garlic-naan",
        name: "Garlic Naan",
        desc: "Leavened white flour bread baked in clay oven with chopped garlic",
        price: 4.99,
        img: null,
        tags: [],
        section: "Tandoor Breads",
        note: null,
        active: true
      },
      {
        id: "chili-naan",
        name: "Chili Naan",
        desc: "Finely chopped fresh chilies mixed with spices, baked in white flour dough",
        price: 4.99,
        img: null,
        tags: ["J"],
        section: "Tandoor Breads",
        note: null,
        active: true
      },
      {
        id: "chili-garlic-naan",
        name: "Chili Garlic Naan",
        desc: "Finely chopped chilies & chopped garlic baked in white flour dough",
        price: 5.99,
        img: null,
        tags: [],
        section: "Tandoor Breads",
        note: null,
        active: true
      },
      {
        id: "onion-kulcha",
        name: "Onion Kulcha",
        desc: "Finely chopped fresh onions mixed with spices, baked in white flour dough",
        price: 5.99,
        img: null,
        tags: [],
        section: "Tandoor Breads",
        note: null,
        active: true
      },
      {
        id: "paneer-kulcha",
        name: "Paneer Kulcha",
        desc: "Finely chopped cottage cheese mixed with spices, baked in white flour dough",
        price: 5.99,
        img: null,
        tags: ["J"],
        section: "Tandoor Breads",
        note: null,
        active: true
      },
      {
        id: "kashmiri-kulcha",
        name: "Kashmiri Kulcha",
        desc: "Tandoor-baked Indian bread stuffed with roasted nuts & dry fruits",
        price: 5.99,
        img: null,
        tags: ["J"],
        section: "Tandoor Breads",
        note: null,
        active: true
      },
      {
        id: "vatan-assorted-basket",
        name: "Vatan Assorted Basket",
        desc: "A combination of butter naan, garlic naan & tandoor roti — 1 each",
        price: 11.99,
        img: null,
        tags: ["J","S"],
        section: "Tandoor Breads",
        note: null,
        active: true
      },
      {
        id: "plain-paratha",
        name: "Plain Paratha",
        desc: "Bread made from whole wheat dough",
        price: 4.49,
        img: null,
        tags: ["J","S"],
        section: "Tandoor Breads",
        note: null,
        active: true
      },
      {
        id: "stuffed-paratha",
        name: "Stuffed Paratha",
        desc: "Choice of: Aloo / Gobi / Onion / Cabbage / Mix Veg / Jalapeño / Cheese (+$1) / Paneer (+$1) — includes yogurt, pickle & salad",
        price: 6.99,
        img: null,
        tags: [],
        section: "Tandoor Breads",
        note: null,
        active: true
      },
      {
        id: "fulka-chapati",
        name: "Fulka / Chapati (2 Pcs.)",
        desc: "Thin whole wheat bread",
        price: 0.99,
        img: null,
        tags: [],
        section: "Gujarati Breads",
        note: null,
        active: true
      },
      {
        id: "poori-2pcs",
        name: "Poori (2 Pcs.)",
        desc: "Whole wheat deep fried bread",
        price: 0.99,
        img: null,
        tags: [],
        section: "Gujarati Breads",
        note: null,
        active: true
      },
      {
        id: "rotla",
        name: "Rotla",
        desc: "Bread made with millet flour",
        price: 3.49,
        img: null,
        tags: [],
        section: "Gujarati Breads",
        note: null,
        active: true
      },
      {
        id: "thepla",
        name: "Thepla",
        desc: "Bread made with fenugreek leaves",
        price: 2.49,
        img: null,
        tags: [],
        section: "Gujarati Breads",
        note: null,
        active: true
      },
      {
        id: "puran-poli",
        name: "Puran Poli",
        desc: "Bread stuffed with sweet lentils",
        price: 3.49,
        img: null,
        tags: [],
        section: "Gujarati Breads",
        note: null,
        active: true
      },
      {
        id: "mix-grilled-veg",
        name: "Mix Grilled Vegetables",
        desc: "Mixed vegetables marinated in yogurt-based chef special curry, cooked in tandoor",
        price: 16.99,
        img: null,
        tags: ["J","S"],
        section: "Tandoor Barbeque",
        note: null,
        active: true
      },
      {
        id: "paneer-tikka",
        name: "Paneer Tikka",
        desc: "Cubes of cottage cheese marinated in yogurt-based chef special curry with bell pepper & onion, cooked in tandoor",
        price: 16.99,
        img: null,
        tags: ["J","S"],
        section: "Tandoor Barbeque",
        note: null,
        active: true
      }
    ]
  },

  // ═══ RICE ═══
  {
    id: "rice",
    name: "Rice Preparations",
    emoji: "🍚",
    label: "Aromatic",
    tagline: "Fragrant basmati rice cooked with love and the finest spices",
    headerImg: null,
    items: [
      {
        id: "jeera-rice",
        name: "Jeera Rice",
        desc: "Basmati rice cooked & topped with cumin seeds",
        price: 6.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "tawa-pulav",
        name: "Tawa Pulav",
        desc: "Basmati rice cooked with seasonal vegetables & Indian herbs",
        price: 12.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "veg-biryani",
        name: "Veg Biryani",
        desc: "Slow-cooked basmati rice with vegetables, aromatic herbs & exotic spices — gluten free",
        price: 12.99,
        img: null,
        tags: ["J"],
        note: null,
        active: true
      },
      {
        id: "paneer-biryani",
        name: "Paneer Biryani",
        desc: "Slow-cooked basmati rice with vegetables, aromatic herbs, cottage cheese & exotic spices — gluten free",
        price: 13.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      }
    ]
  },

  // ═══ SOUPS ═══
  {
    id: "soups",
    name: "Hot Soups",
    emoji: "🍵",
    label: "Garma Garam",
    tagline: "Warming, nourishing bowls to start your meal right",
    headerImg: null,
    items: [
      {
        id: "hot-sour-soup",
        name: "Hot & Sour Soup",
        desc: "An exotic soup of chopped mixed vegetables with fresh onions, garlic & ginger",
        price: 5.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "manchow-soup",
        name: "Manchow Soup",
        desc: "Indo-Chinese soup with oriental vegetables & spices",
        price: 5.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "tomato-soup",
        name: "Tomato Soup",
        desc: "Smooth tomato soup seasoned with herbs & a touch of cream",
        price: 5.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "mulligatawny-soup",
        name: "Mulligatawny Soup",
        desc: "Delicately seasoned split lentil soup topped with fresh garlic & ginger",
        price: 5.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "sweet-corn-soup",
        name: "Sweet Corn Soup",
        desc: "Light vegetable soup made with slightly sweet corn kernels",
        price: 5.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "lemon-coriander-soup",
        name: "Lemon and Coriander Soup",
        desc: "Indo-Chinese soup made with fresh coriander, lemon & Indian spices",
        price: 5.99,
        img: null,
        tags: [],
        note: null,
        active: true
      }
    ]
  },

  // ═══ FRIES ═══
  {
    id: "fries",
    name: "Our Fries",
    emoji: "🍟",
    label: "Crispy Sides",
    tagline: "Golden, crispy & perfectly seasoned",
    headerImg: "images/food/Frenchfries.jpg",
    items: [
      {
        id: "french-fries",
        name: "French Fries",
        desc: "Classic golden crispy fries, served with ketchup & mayo",
        price: 6.99,
        img: "images/food/Frenchfries.jpg",
        tags: [],
        note: null,
        active: true
      },
      {
        id: "cheese-fries",
        name: "Cheese Fries",
        desc: "Golden fries topped with melted cheese",
        price: 7.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "seasoned-fries",
        name: "Black Pepper / White Pepper / Peri Peri Fries",
        desc: "Choose your seasoning — bold, zesty or fiery",
        price: 6.99,
        img: null,
        tags: [],
        note: null,
        active: true
      }
    ]
  },

  // ═══ SIZZLERS ═══
  {
    id: "sizzlers",
    name: "Spectacular Sizzlers",
    emoji: "✨",
    label: "Show Stoppers",
    tagline: "Arriving at your table sizzling hot — a feast for the senses",
    headerImg: null,
    items: [
      {
        id: "veggie-sizzler",
        name: "Veggie Sizzler",
        desc: "Cottage cheese cutlets flavoured with BBQ sauce on a bed of rice/noodles with stir fried exotic veggies & masala fries",
        price: 17.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      },
      {
        id: "chinese-sizzler",
        name: "Chinese Sizzler",
        desc: "Manchurian or chilli cottage cheese in szechwan sauce on a bed of rice/noodles with stir fried exotic veggies & fries",
        price: 17.99,
        img: null,
        tags: ["J","S"],
        note: null,
        active: true
      }
    ]
  },

  // ═══ DESSERTS ═══
  {
    id: "desserts",
    name: "Indian Desserts",
    emoji: "🍮",
    label: "Sweet Endings",
    tagline: "Mithai, halwa & more — end every meal on a sweet note",
    headerImg: "images/food/GJ.jpg",
    items: [
      {
        id: "gulab-jamun",
        name: "Gulab Jamun",
        desc: "Milk dumplings served in rose-flavored sugar syrup",
        price: 4.99,
        img: "images/food/GJ.jpg",
        tags: [],
        note: null,
        active: true
      },
      {
        id: "gajar-halwa",
        name: "Gajar Halwa",
        desc: "Sweet made with grated carrots & koya — a timeless Indian classic",
        price: 5.99,
        img: "images/food/Gajarkahalwa.jpg",
        tags: [],
        note: null,
        active: true
      },
      {
        id: "rasgulla",
        name: "Rasgulla",
        desc: "Ball-shaped dumplings of Indian cottage cheese cooked in light sugar syrup",
        price: 5.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "dudhi-halwa",
        name: "Dudhi Halwa",
        desc: "Sweet made with grated bottle gourd & koya",
        price: 8.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "jalebi-rabdi",
        name: "Jalebi with Rabdi",
        desc: "Jalebi served with homemade evaporated milk",
        price: 8.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "gulab-jamun-rabdi",
        name: "Gulab Jamun with Rabdi",
        desc: "Gulab jamun served with homemade evaporated milk",
        price: 8.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "gajar-halwa-rabdi",
        name: "Gajar Halwa with Rabdi",
        desc: "Gajar halwa served with homemade evaporated milk",
        price: 8.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "sizzling-brownie",
        name: "Sizzling Brownie with Ice Cream",
        desc: "Warm brownie served sizzling with a scoop of ice cream",
        price: 9.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "falooda",
        name: "Falooda",
        desc: "Popular ice cream dessert made with vermicelli & jelly",
        price: 6.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "pastry-black-forest",
        name: "Black Forest Pastry",
        desc: "Bakery pastry",
        price: 4.00,
        img: null,
        tags: [],
        section: "Bakery Pastries",
        note: null,
        active: true
      },
      {
        id: "pastry-choc-butterscotch",
        name: "Chocolate Butter Scotch Pastry",
        desc: "Bakery pastry",
        price: 4.00,
        img: null,
        tags: [],
        section: "Bakery Pastries",
        note: null,
        active: true
      },
      {
        id: "pastry-german-black-forest",
        name: "German Black Forest Pastry",
        desc: "Bakery pastry",
        price: 4.00,
        img: null,
        tags: [],
        section: "Bakery Pastries",
        note: null,
        active: true
      },
      {
        id: "pastry-mango",
        name: "Mango Pastry",
        desc: "Bakery pastry",
        price: 4.00,
        img: null,
        tags: [],
        section: "Bakery Pastries",
        note: null,
        active: true
      },
      {
        id: "pastry-mix-fruit",
        name: "Mix Fruit Pastry",
        desc: "Bakery pastry",
        price: 4.00,
        img: null,
        tags: [],
        section: "Bakery Pastries",
        note: null,
        active: true
      },
      {
        id: "pastry-moca",
        name: "Moca Pastry",
        desc: "Bakery pastry",
        price: 4.00,
        img: null,
        tags: [],
        section: "Bakery Pastries",
        note: null,
        active: true
      },
      {
        id: "pastry-pineapple",
        name: "Pineapple Pastry",
        desc: "Bakery pastry",
        price: 4.00,
        img: null,
        tags: [],
        section: "Bakery Pastries",
        note: null,
        active: true
      },
      {
        id: "pastry-tiramisu",
        name: "Tiramisu Pastry",
        desc: "Bakery pastry",
        price: 4.00,
        img: null,
        tags: [],
        section: "Bakery Pastries",
        note: null,
        active: true
      },
      {
        id: "puff-aloo",
        name: "Aloo Puff",
        desc: "Flaky pastry puff with spiced potato filling",
        price: 3.00,
        img: null,
        tags: [],
        section: "Puffs",
        note: null,
        active: true
      },
      {
        id: "puff-jalapeno-cheese",
        name: "Jalapeño Cheese Puff",
        desc: "Flaky pastry puff with jalapeño & cheese filling",
        price: 3.00,
        img: null,
        tags: [],
        section: "Puffs",
        note: null,
        active: true
      },
      {
        id: "puff-paneer",
        name: "Paneer Puff",
        desc: "Flaky pastry puff with spiced paneer filling",
        price: 3.00,
        img: null,
        tags: [],
        section: "Puffs",
        note: null,
        active: true
      },
      {
        id: "puff-veg",
        name: "Veg Puff",
        desc: "Flaky pastry puff with mixed vegetable filling",
        price: 3.00,
        img: null,
        tags: [],
        section: "Puffs",
        note: null,
        active: true
      }
    ]
  },

  // ═══ BEVERAGES ═══
  {
    id: "beverages",
    name: "Drinks & Beverages",
    emoji: "🥤",
    label: "Cool Down",
    tagline: "Refreshing Indian drinks — from creamy lassis to spiced mojitos",
    headerImg: null,
    items: [
      {
        id: "mojito",
        name: "Mojito",
        desc: "Classic / Tamarind Orange / Paan / Cumin Spice / Mango Jalapeño",
        price: 6.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "lassi",
        name: "Lassi",
        desc: "Sweet / Salt / Mango / Rose / Chocolate / Rajwadi",
        price: 5.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "masala-chaas",
        name: "Masala Chaas",
        desc: "Spiced buttermilk — India's original probiotic drink",
        price: 3.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "masala-chaas-bottle",
        name: "Masala Chaas Bottle",
        desc: "Take-home bottle of our signature spiced buttermilk",
        price: 9.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "jal-jeera-soda",
        name: "Jal Jeera Soda",
        desc: "Tangy cumin spiced Indian sparkling drink",
        price: 6.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "masala-thums-up",
        name: "Masala Thums Up",
        desc: "Spiced cola with Indian masala twist",
        price: 6.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "masala-tea",
        name: "Masala Tea",
        desc: "Aromatic spiced Indian chai",
        price: 1.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "madras-coffee",
        name: "Madras Coffee",
        desc: "South Indian style filtered coffee",
        price: 1.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "can-soda",
        name: "Can Soda",
        desc: "Assorted can sodas",
        price: 1.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "bottled-water",
        name: "Bottled Water",
        desc: "Still water",
        price: 1.99,
        img: null,
        tags: [],
        note: null,
        active: true
      }
    ]
  },

  // ═══ ACCOMPANIMENTS ═══
  {
    id: "accompaniments",
    name: "Extras & Accompaniments",
    emoji: "🧂",
    label: "Add-Ons",
    tagline: "Complete your meal with these little essentials",
    headerImg: null,
    items: [
      {
        id: "roasted-papad",
        name: "Roasted Papad",
        desc: "Light & crispy lentil wafer, roasted fresh",
        price: 1.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "fried-papad",
        name: "Fried Papad",
        desc: "Deep fried lentil wafer, golden & crunchy",
        price: 1.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "masala-papad",
        name: "Masala Papad",
        desc: "Papad topped with onion, tomatoes & spicy chutneys",
        price: 3.99,
        img: null,
        tags: [],
        note: null,
        active: true
      },
      {
        id: "raita",
        name: "Raita",
        desc: "Creamy yogurt with spices",
        price: 2.99,
        img: null,
        tags: [],
        note: null,
        active: true
      }
    ]
  }

];

// Export for Node/testing environments
if (typeof module !== 'undefined') module.exports = VATAN_MENU;
