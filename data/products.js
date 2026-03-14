// Hit the food - Product Data
// Reference copy extracted from index.html

const FRUITS = [
  { id:1,  name:"Fuji Apple",                      sub:"1 each",                    price:11.99, badge:null,        img:IMG.apple },
  { id:2,  name:"Clementines, Bag",                 sub:"3 lb",                      price:7.19,  badge:null,        img:ORANGE_IMG },
  { id:3,  name:"Organic Banana",                   sub:"Sold by the bunch · 1 lb",  price:1.59,  badge:"Organic",   img:IMG.banana },
  { id:4,  name:"Asian Pear",                       sub:"3 ct",                      price:11.99, badge:null,        img:IMG.asianpear },
  { id:5,  name:"Baby Banana",                      sub:"Sold by the bunch · 1 each",price:1.79,  badge:null,        img:IMG.banana },
  { id:6,  name:"Jackfruit",                        sub:"1 lb",                      price:1.19,  badge:null,        img:IMG.jackfruit },
  { id:7,  name:"Well PICT Strawberries",           sub:"16 oz",                     price:7.19,  badge:"In season", img:IMG.strawberry },
  { id:8,  name:"Fuji Apple 4 ct",                  sub:"4 ct",                      price:5.99,  badge:null,        img:IMG.apple },
  { id:9,  name:"Mitimask Shine Muscat Grapes",     sub:"600 g",                     price:17.99, badge:null,        img:IMG.grapes },
  { id:10, name:"Organic Mandarins",                sub:"1 lb",                      price:5.99,  badge:"Organic",   img:ORANGE_IMG },
  { id:11, name:"Baby Banana Bunch",                sub:"Sold by the bunch",         price:2.49,  badge:null,        img:IMG.banana },
  { id:12, name:"Asian Pear Premium",               sub:"2 ct",                      price:8.99,  badge:"In season", img:IMG.asianpear },
  { id:13, name:"Fresh Strawberries Premium Large", sub:"32 oz",                     price:9.99,  badge:"In season", img:IMG.strawberry },
];
const VEGETABLES = [
  { id:20, name:"Jalapeno Pepper",                           sub:"1 each", price:1.99, badge:null,        img:IMG.jalapeno },
  { id:21, name:"Baby Bok Choy",                             sub:"1 lb",   price:2.19, badge:"In season", img:IMG.bokchoy },
  { id:22, name:"Russet Potato Bag",                         sub:"5 lb",   price:3.59, badge:"In season", img:IMG.potato },
  { id:23, name:"Broccoli Crown",                            sub:"1 lb",   price:1.59, badge:"In season", img:IMG.broccoli },
  { id:24, name:"Napa Cabbage",                              sub:"1 lb",   price:2.39, badge:"In season", img:IMG.cabbage },
  { id:25, name:"Salad Cosmo Mung Bean Sprouts",             sub:"16 oz",  price:1.79, badge:null,        img:IMG.sprouts },
  { id:26, name:"Fresh Mint",                                sub:"1 bunch",price:1.59, badge:null,        img:IMG.mint },
  { id:27, name:"Carrot Bag",                                sub:"1 lb",   price:2.19, badge:"In season", img:IMG.carrot },
  { id:28, name:"Salad Cosmo USA Organic Mung Bean Sprouts", sub:"9 oz",   price:2.39, badge:"Organic",   img:IMG.sprouts },
  { id:29, name:"Hokto Organic Bunashimeji Mushrooms",       sub:"3.5 oz", price:3.49, badge:null,        img:IMG.mushroom },
  { id:30, name:"Green Serrano Pepper",                      sub:"1 lb",   price:1.19, badge:"Non GMO",   img:IMG.pepper },
  { id:31, name:"Bok Choy",                                  sub:"1 lb",   price:1.19, badge:"In season", img:IMG.bokchoy },
  { id:32, name:"Baby Carrot Bag",                           sub:"2 lb",   price:2.99, badge:null,        img:IMG.carrot },
];
const BESTSELLERS = [
  { id:40, name:"Soon Tofu Extra Soft",                         sub:"11 oz",   price:1.59,  img:IMG.tofu },
  { id:41, name:"Kewpie Mayonnaise Japanese Style",             sub:"17.6 oz", price:4.99,  img:IMG.mayo },
  { id:42, name:"Napa Cabbage Fresh",                           sub:"1 lb",    price:2.39,  img:IMG.cabbage },
  { id:43, name:"Lotte Choco-Pie Original",                     sub:"12 ct",   price:6.99,  img:IMG.choco },
  { id:44, name:"bibigo Mandu Pork & Vegetable Dumplings",      sub:"24 oz",   price:8.99,  img:IMG.dumpling },
  { id:45, name:"Binggrae Banana Flavored Milk",                sub:"6-pack",  price:9.99,  img:IMG.milk },
  { id:46, name:"Samyang Shin Ramyun Hot & Spicy Noodle",       sub:"5-pack",  price:7.49,  img:IMG.ramen },
  { id:47, name:"Yakult Probiotic Cultured Milk Drink",         sub:"10 ct",   price:5.99,  img:IMG.yakult },
  { id:48, name:"Organic Broccoli Crown",                       sub:"1 lb",    price:2.49,  badge:"Organic", img:IMG.broccoli },
  { id:49, name:"Baby Bok Choy Bundle",                         sub:"2 lb",    price:3.99,  img:IMG.bokchoy },
  { id:50, name:"Fresh Strawberries Premium",                   sub:"32 oz",   price:9.99,  img:IMG.strawberry },
  { id:51, name:"Fuji Apple Bag",                               sub:"5 lb",    price:8.99,  img:IMG.apple },
  { id:52, name:"Russet Potato Fresh",                          sub:"10 lb",   price:5.99,  img:IMG.potato },
];
const ALL_PRODUCTS = [...FRUITS, ...VEGETABLES, ...BESTSELLERS];

const MEGA_BROWSE_AISLES = [
  "Prepared Foods","Meat & Seafood","Frozen","Snacks & Candy",
  "Deli","Beverages","Canned Goods & Soups","Dry Goods & Pasta",
  "Dairy & Eggs","Produce","Oils, Vinegars, & Spices",
  "Bakery","Condiments & Sauces",
];

// 3-Level Category Structure
const CATEGORY_STRUCTURE = {
  "Prepared Foods": {
    subcategories: ["Pizza & Meals", "Sushi", "Soups", "Chicken", "Other Prepared Meats", "Salads"],
    tabs: {
      "Pizza & Meals": ["All", "Asian", "More Meals & Sides"],
      "Sushi": ["All", "Rolls", "Sashimi", "Combo"],
      "Soups": ["All", "Asian", "Western"],
    }
  },
  "Meat & Seafood": {
    subcategories: ["Beef", "Chicken", "Pork", "Seafood", "Lamb", "Other Meats"],
    tabs: {}
  },
  "Frozen": {
    subcategories: ["Ice Cream", "Frozen Meals", "Frozen Vegetables", "Frozen Fruits", "Frozen Desserts"],
    tabs: {}
  },
  "Snacks & Candy": {
    subcategories: ["Chips & Crisps", "Cookies", "Candy", "Nuts & Seeds", "Asian Snacks"],
    tabs: {}
  },
  "Deli": {
    subcategories: ["Sliced Meats", "Cheeses", "Prepared Salads", "Dips & Spreads"],
    tabs: {}
  },
  "Beverages": {
    subcategories: ["Soft Drinks", "Juices", "Tea & Coffee", "Water", "Sports Drinks", "Alcohol"],
    tabs: {}
  },
  "Canned Goods & Soups": {
    subcategories: ["Canned Vegetables", "Canned Fruits", "Soups", "Beans", "Canned Meat"],
    tabs: {}
  },
  "Dry Goods & Pasta": {
    subcategories: ["Pasta", "Rice", "Grains", "Flour & Baking", "Cereals"],
    tabs: {}
  },
  "Dairy & Eggs": {
    subcategories: ["Milk", "Cheese", "Yogurt", "Eggs", "Butter & Cream"],
    tabs: {}
  },
  "Produce": {
    subcategories: ["Fresh Fruits", "Fresh Vegetables", "Organic", "Herbs"],
    tabs: {}
  },
  "Oils, Vinegars, & Spices": {
    subcategories: ["Cooking Oils", "Vinegars", "Spices", "Seasonings", "Salt & Pepper"],
    tabs: {}
  },
  "Bakery": {
    subcategories: ["Bread", "Pastries", "Cakes", "Bagels & Muffins", "Tortillas"],
    tabs: {}
  },
  "Condiments & Sauces": {
    subcategories: ["Ketchup & Mustard", "Asian Sauces", "Hot Sauces", "Salad Dressings", "Mayonnaise"],
    tabs: {}
  },
};

// Subcategory products
const SUBCATEGORY_PRODUCTS = {
  // Prepared Foods subcategories
  "Pizza & Meals": {
    "All": [
      { id:501, name:"Paldo Kokomen, Clean Spicy", sub:"5 x 4.23 oz", price:8.39, img:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop" },
      { id:502, name:"Assi Ovaletts Slice Rice Cake", sub:"2 lb", price:4.19, img:"https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=300&h=300&fit=crop" },
      { id:503, name:"Bulgogi Beef With Rice", sub:"1 each", price:13.19, badge:"Many in stock", img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
      { id:504, name:"Japchae", sub:"1 each", price:8.39, img:"https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=300&h=300&fit=crop" },
      { id:505, name:"Seasoned Spicy Bean Sprouts", sub:"1 each", price:4.79, badge:"Likely out of stock", img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
      { id:506, name:"Short Ribs With Rice", sub:"1 each", price:15.59, img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop" },
      { id:507, name:"Kimchi Pancake", sub:"1 each", price:8.39, img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
      { id:508, name:"Kimchi Fried Rice", sub:"1 each", price:8.39, img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop" },
      { id:509, name:"Roasted Sweet Potato", sub:"1 each", price:5.99, img:"https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=300&h=300&fit=crop" },
      { id:510, name:"Triangle Spicy Pork Kimbap", sub:"1 each", price:4.79, img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
    ],
    "Asian": [
      { id:511, name:"Dried Tofu & Burdock Kimbap", sub:"230 g", price:4.79, badge:"Zero trans fat", img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
      { id:512, name:"Steamed Mun Hopang Hot Sauce", sub:"255 g", price:4.79, img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
      { id:513, name:"Baby Anchovy KimBaps", sub:"1 each", price:6.59, img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
      { id:514, name:"Konjak Oatmeal Rice Kimbap With Fried Tofu", sub:"230 g", price:4.79, img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
      { id:515, name:"Konjak Oat Rice Kimbap With Mushroom", sub:"230 g", price:4.79, img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
      { id:516, name:"Mung Bean Pancake", sub:"1 each", price:9.59, img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
      { id:517, name:"Bossam Mix Set", sub:"1 each", price:21.59, img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
      { id:518, name:"BON Sweet Red Bean Porridge", sub:"270 g", price:5.99, badge:"Zero trans fat", img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
    ],
    "More Meals & Sides": [
      { id:521, name:"Bibimbap", sub:"1 each", price:13.19, img:"https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=300&h=300&fit=crop" },
      { id:522, name:"Teriyaki Salmon With Rice", sub:"1 each", price:14.39, img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop" },
      { id:523, name:"Tonkatsu With Rice", sub:"1 each", price:13.19, img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
      { id:524, name:"Steamed Rice", sub:"1 each", price:2.99, img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop" },
      { id:525, name:"Amond Kimjaban", sub:"65 g", price:3.59, img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
      { id:526, name:"Cooked Mixed Rice", sub:"1 each", price:3.59, img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop" },
      { id:527, name:"Triangle Kimbap", sub:"1 each", price:4.79, img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
    ],
  },
  "Sushi": {
    "All": [
      { id:531, name:"Original Kimbap", sub:"1 ct", price:10.79, img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
      { id:532, name:"Beef Kimbaps", sub:"1 each", price:6.59, img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
      { id:533, name:"Sashimi Bowl", sub:"1 each", price:13.19, img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
      { id:534, name:"Sushi Combo", sub:"1 each", price:21.59, img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
      { id:535, name:"R Sake Maki", sub:"1 each", price:10.79, img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
      { id:536, name:"Tobiko California Roll", sub:"1 each", price:14.39, img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
      { id:537, name:"Tuna & Kimchi Triangle Kimbap", sub:"1 each", price:4.79, img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
      { id:538, name:"Vegetable Japchae Kimbab", sub:"230 g", price:4.79, badge:"Shellfish free", img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
      { id:539, name:"R California Roll", sub:"1 each", price:13.19, img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
      { id:540, name:"Tekka Maki Roll", sub:"1 each", price:13.99, img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
    ],
  },
  "Soups": {
    "All": [
      { id:541, name:"Beef & Radish Soup", sub:"1 each", price:11.99, img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=300&fit=crop" },
      { id:542, name:"Fish Cake Soup", sub:"1 each", price:7.19, img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=300&fit=crop" },
      { id:543, name:"Soybean Stew", sub:"1 each", price:9.59, img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=300&fit=crop" },
      { id:544, name:"Short Rib & Vegetable Soup", sub:"1 each", price:14.39, img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=300&fit=crop" },
      { id:545, name:"Bonjuk Sweet Pumpkin Porridge", sub:"270 g", price:5.99, img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=300&fit=crop" },
      { id:546, name:"Beef Seaweed Soup", sub:"1 each", price:11.99, badge:"Request", img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=300&fit=crop" },
      { id:547, name:"Spicy Beef Soup", sub:"1 each", price:14.39, badge:"Request", img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=300&fit=crop" },
    ],
  },
  "Chicken": {
    "All": [
      { id:551, name:"Korean Fried Chicken", sub:"8 pcs", price:12.99, badge:"Popular", img:"https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=300&fit=crop" },
      { id:552, name:"Chicken Teriyaki", sub:"1 each", price:9.99, img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop" },
      { id:553, name:"Chicken Katsu", sub:"1 each", price:10.99, img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300&h=300&fit=crop" },
      { id:554, name:"Spicy Chicken Wings", sub:"6 pcs", price:8.99, img:"https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=300&fit=crop" },
      { id:555, name:"Chicken Karaage", sub:"8 pcs", price:9.99, img:"https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=300&fit=crop" },
    ],
  },
  "Other Prepared Meats": {
    "All": [
      { id:561, name:"Beef Bulgogi", sub:"1 lb", price:15.99, img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
      { id:562, name:"Pork Belly BBQ", sub:"1 lb", price:13.99, img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop" },
      { id:563, name:"Galbi Short Ribs", sub:"1 lb", price:19.99, img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop" },
      { id:564, name:"Marinated Pork", sub:"1 lb", price:11.99, img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop" },
    ],
  },
  "Salads": {
    "All": [
      { id:571, name:"Korean Glass Noodle Salad", sub:"12 oz", price:7.99, img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop" },
      { id:572, name:"Seaweed Salad", sub:"8 oz", price:5.99, img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop" },
      { id:573, name:"Cucumber Salad", sub:"10 oz", price:4.99, img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop" },
      { id:574, name:"Spicy Tofu Salad", sub:"12 oz", price:6.99, img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop" },
    ],
  },
  // Other main categories with subcategory products
  "Beef": { "All": [
    { id:311, name:"Atlantic Salmon Fillet", sub:"1 lb", price:12.99, badge:"Fresh", img:"https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=300&h=300&fit=crop" },
    { id:312, name:"Ribeye Steak USDA Choice", sub:"12 oz", price:15.99, badge:"Premium", img:"https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=300&fit=crop" },
    { id:313, name:"Chicken Breast Boneless", sub:"1.5 lb", price:7.99, img:"https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop" },
  ]},
  "Pork": { "All": [
    { id:316, name:"Pork Belly Sliced", sub:"1 lb", price:9.99, img:"https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=300&h=300&fit=crop" },
  ]},
  "Seafood": { "All": [
    { id:311, name:"Atlantic Salmon Fillet", sub:"1 lb", price:12.99, badge:"Fresh", img:"https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=300&h=300&fit=crop" },
    { id:314, name:"Jumbo Shrimp Peeled", sub:"1 lb", price:14.99, badge:"Wild Caught", img:"https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=300&h=300&fit=crop" },
  ]},
};

// Quick access categories for top nav (frequently used)
const QUICK_CATEGORIES = [
  { id:"meat", label:"Meat &\nSeafood", img:"https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=120&h=120&fit=crop" },
  { id:"snacks", label:"Snacks &\nCandy", img:"https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=120&h=120&fit=crop" },
  { id:"dairy", label:"Dairy &\nEggs", img:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=120&h=120&fit=crop" },
  { id:"produce", label:"Produce", img:"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=120&h=120&fit=crop" },
  { id:"frozen", label:"Frozen", img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=120&h=120&fit=crop" },
  { id:"bakery", label:"Bakery", img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&h=120&fit=crop" },
  { id:"beverages", label:"Beverages", img:"https://images.unsplash.com/photo-1544145945-f90425340c7e?w=120&h=120&fit=crop" },
  { id:"prepared", label:"Prepared\nFoods", img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=120&h=120&fit=crop" },
];

const QUICK_TO_CATEGORY = {
  "meat": "Meat & Seafood",
  "snacks": "Snacks & Candy", 
  "dairy": "Dairy & Eggs",
  "produce": "Produce",
  "frozen": "Frozen",
  "bakery": "Bakery",
  "beverages": "Beverages",
  "prepared": "Prepared Foods",
};

// Category-based products
const CATEGORY_PRODUCTS = {
  "Prepared Foods": [
    { id:301, name:"Chicken Teriyaki Bowl", sub:"16 oz", price:9.99, img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop" },
    { id:302, name:"California Roll Sushi", sub:"8 pcs", price:8.99, img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
    { id:303, name:"Beef Bulgogi Plate", sub:"12 oz", price:11.99, img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop" },
    { id:304, name:"Vegetable Spring Rolls", sub:"6 pcs", price:5.99, img:"https://images.unsplash.com/photo-1515669097368-22e68427d265?w=300&h=300&fit=crop" },
    { id:305, name:"Pad Thai Noodles", sub:"14 oz", price:8.49, img:"https://images.unsplash.com/photo-1559314809-0d155014e29e?w=300&h=300&fit=crop" },
    { id:306, name:"Greek Salad", sub:"10 oz", price:7.99, img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop" },
  ],
  "Meat & Seafood": [
    { id:311, name:"Atlantic Salmon Fillet", sub:"1 lb", price:12.99, badge:"Fresh", img:"https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=300&h=300&fit=crop" },
    { id:312, name:"Ribeye Steak USDA Choice", sub:"12 oz", price:15.99, badge:"Premium", img:"https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=300&fit=crop" },
    { id:313, name:"Chicken Breast Boneless", sub:"1.5 lb", price:7.99, img:"https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop" },
    { id:314, name:"Jumbo Shrimp Peeled", sub:"1 lb", price:14.99, badge:"Wild Caught", img:"https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=300&h=300&fit=crop" },
    { id:315, name:"Ground Beef 80/20", sub:"1 lb", price:6.99, img:"https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=300&h=300&fit=crop" },
    { id:316, name:"Pork Belly Sliced", sub:"1 lb", price:9.99, img:"https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=300&h=300&fit=crop" },
  ],
  "Frozen": [
    { id:321, name:"Häagen-Dazs Vanilla", sub:"14 oz", price:5.99, img:"https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300&h=300&fit=crop" },
    { id:322, name:"Frozen Veggie Mix", sub:"16 oz", price:3.49, img:"https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&h=300&fit=crop" },
    { id:323, name:"Chicken Nuggets", sub:"24 oz", price:7.99, img:"https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=300&fit=crop" },
    { id:324, name:"Frozen Pizza Margherita", sub:"12 inch", price:6.99, img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop" },
    { id:325, name:"Ice Cream Mochi", sub:"6 pcs", price:5.49, badge:"Popular", img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop" },
    { id:326, name:"Frozen Dumplings", sub:"20 pcs", price:8.99, img:"https://images.unsplash.com/photo-1534482421-64566f976cfa?w=300&h=300&fit=crop" },
  ],
  "Snacks & Candy": [
    { id:331, name:"Lay's Classic Chips", sub:"10 oz", price:4.29, img:"https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop" },
    { id:332, name:"Oreo Cookies Original", sub:"14.3 oz", price:4.99, img:"https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop" },
    { id:333, name:"M&M's Peanut", sub:"10.7 oz", price:4.49, img:"https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=300&h=300&fit=crop" },
    { id:334, name:"Pocky Chocolate", sub:"2.47 oz", price:2.99, badge:"Imported", img:"https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=300&h=300&fit=crop" },
    { id:335, name:"Trail Mix Premium", sub:"16 oz", price:8.99, img:"https://images.unsplash.com/photo-1604542031658-5799ca5d7936?w=300&h=300&fit=crop" },
    { id:336, name:"Shrimp Chips", sub:"8 oz", price:3.99, img:"https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300&h=300&fit=crop" },
  ],
  "Deli": [
    { id:341, name:"Sliced Turkey Breast", sub:"8 oz", price:6.99, img:"https://images.unsplash.com/photo-1598511726623-d2e9996892f0?w=300&h=300&fit=crop" },
    { id:342, name:"Provolone Cheese Sliced", sub:"8 oz", price:5.49, img:"https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=300&fit=crop" },
    { id:343, name:"Rotisserie Chicken", sub:"32 oz", price:8.99, badge:"Hot & Ready", img:"https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=300&fit=crop" },
    { id:344, name:"Hummus Original", sub:"10 oz", price:4.99, img:"https://images.unsplash.com/photo-1577805947697-89e18249d767?w=300&h=300&fit=crop" },
    { id:345, name:"Salami Genoa", sub:"6 oz", price:7.49, img:"https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=300&h=300&fit=crop" },
    { id:346, name:"Coleslaw Fresh", sub:"16 oz", price:4.29, img:"https://images.unsplash.com/photo-1625938145744-e380515399bf?w=300&h=300&fit=crop" },
  ],
  "Beverages": [
    { id:351, name:"Coca-Cola Classic", sub:"12 pack", price:6.99, img:"https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=300&fit=crop" },
    { id:352, name:"Orange Juice Fresh", sub:"52 oz", price:5.99, badge:"No Pulp", img:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=300&fit=crop" },
    { id:353, name:"Green Tea Matcha", sub:"16.9 oz", price:3.49, img:"https://images.unsplash.com/photo-1556881286-fc6915169721?w=300&h=300&fit=crop" },
    { id:354, name:"Sparkling Water Lime", sub:"8 pack", price:4.99, img:"https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&h=300&fit=crop" },
    { id:355, name:"Almond Milk Unsweetened", sub:"64 oz", price:4.49, img:"https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=300&h=300&fit=crop" },
    { id:356, name:"Cold Brew Coffee", sub:"32 oz", price:7.99, img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop" },
  ],
  "Canned Goods & Soups": [
    { id:361, name:"Campbell's Tomato Soup", sub:"10.75 oz", price:1.99, img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=300&fit=crop" },
    { id:362, name:"Black Beans Organic", sub:"15 oz", price:2.29, badge:"Organic", img:"https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=300&h=300&fit=crop" },
    { id:363, name:"Tuna Chunk Light", sub:"5 oz", price:1.79, img:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=300&fit=crop" },
    { id:364, name:"Diced Tomatoes", sub:"14.5 oz", price:1.99, img:"https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=300&h=300&fit=crop" },
    { id:365, name:"Coconut Milk", sub:"13.5 oz", price:2.49, img:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop" },
    { id:366, name:"Chicken Noodle Soup", sub:"18.6 oz", price:2.99, img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=300&fit=crop" },
  ],
  "Dry Goods & Pasta": [
    { id:371, name:"Spaghetti Pasta", sub:"16 oz", price:1.99, img:"https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=300&h=300&fit=crop" },
    { id:372, name:"Jasmine Rice", sub:"5 lb", price:8.99, img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop" },
    { id:373, name:"Penne Rigate", sub:"16 oz", price:2.29, img:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=300&fit=crop" },
    { id:374, name:"Quinoa Organic", sub:"16 oz", price:5.99, badge:"Organic", img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop" },
    { id:375, name:"Oatmeal Old Fashioned", sub:"42 oz", price:4.99, img:"https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=300&h=300&fit=crop" },
    { id:376, name:"Flour All Purpose", sub:"5 lb", price:3.99, img:"https://images.unsplash.com/photo-1627485937980-221c88ac04f9?w=300&h=300&fit=crop" },
  ],
  "Dairy & Eggs": [
    { id:381, name:"Large Eggs Grade A", sub:"12 ct", price:4.99, img:"https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop" },
    { id:382, name:"Whole Milk Organic", sub:"1 gal", price:6.99, badge:"Organic", img:"https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop" },
    { id:383, name:"Greek Yogurt Plain", sub:"32 oz", price:5.49, img:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop" },
    { id:384, name:"Butter Unsalted", sub:"16 oz", price:4.99, img:"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=300&fit=crop" },
    { id:385, name:"Cheddar Cheese Sharp", sub:"8 oz", price:4.49, img:"https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=300&h=300&fit=crop" },
    { id:386, name:"Cream Cheese", sub:"8 oz", price:3.49, img:"https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=300&fit=crop" },
  ],
  "Produce": FRUITS.concat(VEGETABLES).slice(0, 6),
  "Oils, Vinegars, & Spices": [
    { id:401, name:"Extra Virgin Olive Oil", sub:"17 oz", price:8.99, img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop" },
    { id:402, name:"Balsamic Vinegar", sub:"16.9 oz", price:6.99, img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop" },
    { id:403, name:"Sea Salt Fine", sub:"26 oz", price:3.99, img:"https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=300&h=300&fit=crop" },
    { id:404, name:"Black Pepper Ground", sub:"4 oz", price:4.49, img:"https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300&h=300&fit=crop" },
    { id:405, name:"Sesame Oil", sub:"8.4 oz", price:5.99, img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop" },
    { id:406, name:"Cumin Ground", sub:"2 oz", price:3.99, img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop" },
  ],
  "Bakery": [
    { id:411, name:"Sourdough Bread", sub:"24 oz", price:4.99, badge:"Fresh Baked", img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop" },
    { id:412, name:"Croissants Butter", sub:"4 ct", price:5.99, img:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=300&fit=crop" },
    { id:413, name:"Bagels Plain", sub:"6 ct", price:3.99, img:"https://images.unsplash.com/photo-1585535525067-2f85c37f5e5b?w=300&h=300&fit=crop" },
    { id:414, name:"Chocolate Cake Slice", sub:"1 slice", price:4.49, img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop" },
    { id:415, name:"Baguette French", sub:"16 oz", price:2.99, img:"https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=300&fit=crop" },
    { id:416, name:"Muffins Blueberry", sub:"4 ct", price:5.49, img:"https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300&h=300&fit=crop" },
  ],
  "Condiments & Sauces": [
    { id:421, name:"Ketchup Heinz", sub:"32 oz", price:4.29, img:"https://images.unsplash.com/photo-1461009312844-e80697a81cc7?w=300&h=300&fit=crop" },
    { id:422, name:"Soy Sauce", sub:"15 oz", price:3.99, img:"https://images.unsplash.com/photo-1598511757337-fe2cafc31ba0?w=300&h=300&fit=crop" },
    { id:423, name:"Sriracha Hot Sauce", sub:"17 oz", price:4.49, img:"https://images.unsplash.com/photo-1591130901921-3f0652bb3915?w=300&h=300&fit=crop" },
    { id:424, name:"Mayo Kewpie", sub:"17.6 oz", price:5.99, badge:"Japanese", img:"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop" },
    { id:425, name:"Mustard Dijon", sub:"13 oz", price:4.29, img:"https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=300&h=300&fit=crop" },
    { id:426, name:"BBQ Sauce", sub:"18 oz", price:3.99, img:"https://images.unsplash.com/photo-1619221882220-947b3d3c8861?w=300&h=300&fit=crop" },
  ],
  "Noodles & Rice": [
    { id:431, name:"Shin Ramyun Noodles", sub:"4.2 oz", price:1.99, badge:"Spicy", img:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop" },
    { id:432, name:"Udon Noodles Fresh", sub:"7 oz", price:2.99, img:"https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=300&h=300&fit=crop" },
    { id:433, name:"Rice Noodles", sub:"14 oz", price:3.49, img:"https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop" },
    { id:434, name:"Sushi Rice Premium", sub:"4.4 lb", price:9.99, img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop" },
    { id:435, name:"Ramen Tonkotsu", sub:"3.53 oz", price:2.49, img:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop" },
    { id:436, name:"Glass Noodles", sub:"8 oz", price:3.29, img:"https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop" },
  ],
  "Korean Foods": [
    { id:441, name:"Kimchi Traditional", sub:"14 oz", price:6.99, badge:"Fermented", img:"https://images.unsplash.com/photo-1583224964978-2257b960c3d3?w=300&h=300&fit=crop" },
    { id:442, name:"Gochujang Paste", sub:"17.6 oz", price:7.99, img:"https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=300&h=300&fit=crop" },
    { id:443, name:"Korean BBQ Sauce", sub:"16 oz", price:5.99, img:"https://images.unsplash.com/photo-1619221882220-947b3d3c8861?w=300&h=300&fit=crop" },
    { id:444, name:"Tteokbokki Rice Cakes", sub:"21 oz", price:4.99, img:"https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=300&h=300&fit=crop" },
    { id:445, name:"Seaweed Snack", sub:"0.35 oz x 10", price:5.49, img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
    { id:446, name:"Korean Pear", sub:"1 each", price:3.99, img:"https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=300&h=300&fit=crop" },
  ],
  "Japanese Foods": [
    { id:451, name:"Miso Paste White", sub:"13.2 oz", price:5.99, img:"https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=300&h=300&fit=crop" },
    { id:452, name:"Panko Bread Crumbs", sub:"8 oz", price:3.49, img:"https://images.unsplash.com/photo-1627485937980-221c88ac04f9?w=300&h=300&fit=crop" },
    { id:453, name:"Nori Seaweed Sheets", sub:"10 sheets", price:4.99, img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
    { id:454, name:"Mochi Ice Cream", sub:"6 ct", price:6.99, badge:"Popular", img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop" },
    { id:455, name:"Wasabi Paste", sub:"1.52 oz", price:2.99, img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
    { id:456, name:"Pickled Ginger", sub:"12 oz", price:3.99, img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
  ],
  "Asian Snacks": [
    { id:461, name:"Shrimp Chips", sub:"8 oz", price:3.99, img:"https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300&h=300&fit=crop" },
    { id:462, name:"Pocky Strawberry", sub:"2.47 oz", price:2.99, img:"https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=300&h=300&fit=crop" },
    { id:463, name:"Rice Crackers Mix", sub:"5 oz", price:4.49, img:"https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300&h=300&fit=crop" },
    { id:464, name:"Lotte Choco Pie", sub:"12 ct", price:6.99, badge:"Korean", img:IMG.choco },
    { id:465, name:"Hi-Chew Assorted", sub:"3.53 oz", price:2.99, img:"https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=300&h=300&fit=crop" },
    { id:466, name:"Yan Yan Dip Sticks", sub:"2 oz", price:2.49, img:"https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=300&h=300&fit=crop" },
  ],
  "Health & Beauty": [
    { id:471, name:"Vitamin C 1000mg", sub:"100 ct", price:12.99, img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop" },
    { id:472, name:"Hand Sanitizer", sub:"8 oz", price:4.99, img:"https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=300&h=300&fit=crop" },
    { id:473, name:"Toothpaste Mint", sub:"6 oz", price:3.99, img:"https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=300&fit=crop" },
    { id:474, name:"Sheet Masks Pack", sub:"5 ct", price:9.99, badge:"K-Beauty", img:"https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop" },
    { id:475, name:"Lip Balm Organic", sub:"0.15 oz", price:3.49, img:"https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop" },
    { id:476, name:"Multivitamin Daily", sub:"60 ct", price:14.99, img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop" },
  ],
  "Household": [
    { id:481, name:"Paper Towels", sub:"6 rolls", price:9.99, img:"https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&h=300&fit=crop" },
    { id:482, name:"Dish Soap", sub:"19 oz", price:3.99, img:"https://images.unsplash.com/photo-1585441695325-21557f87621e?w=300&h=300&fit=crop" },
    { id:483, name:"Trash Bags 13 Gal", sub:"45 ct", price:8.99, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop" },
    { id:484, name:"Laundry Detergent", sub:"100 oz", price:12.99, img:"https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=300&fit=crop" },
    { id:485, name:"Sponges Multi-pack", sub:"6 ct", price:4.49, img:"https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop" },
    { id:486, name:"All-Purpose Cleaner", sub:"32 oz", price:4.99, img:"https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=300&h=300&fit=crop" },
  ],
};

const MEGA_CATEGORIES = [
  { id:"meat",     label:"Meat & Seafood",  img:"https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=120&h=120&fit=crop" },
  { id:"snacks",   label:"Snacks & Candy",  img:"https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=120&h=120&fit=crop" },
  { id:"dairy",    label:"Dairy & Eggs",    img:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=120&h=120&fit=crop" },
  { id:"produce",  label:"Produce",         img:"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=120&h=120&fit=crop" },
  { id:"frozen",   label:"Frozen",          img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=120&h=120&fit=crop" },
  { id:"bakery",   label:"Bakery",          img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&h=120&fit=crop" },
  { id:"beverages",label:"Beverages",       img:"https://images.unsplash.com/photo-1544145945-f90425340c7e?w=120&h=120&fit=crop" },
  { id:"prepared", label:"Prepared Foods",  img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=120&h=120&fit=crop" },
];
