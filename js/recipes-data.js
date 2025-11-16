// recipes-data.js
// Centralized list of recipes for recommendations, continue cooking, and feed.

const RECIPES = [
  {
    id: 1,
    title: "Creamy Carbonara",
    author: "Maria Romano",
    img: "https://source.unsplash.com/600x400/?carbonara,pasta",
    rating: 4.9,
    time: "25 min",
    tags: ["Italian", "Pasta"],
    difficulty: "Easy",
    likes: 234,
    comments: 42,
    inProgress: true,          // <-- used for Continue Cooking
    lastStep: 2                // <-- optional, later if you add steps
  },
  {
    id: 2,
    title: "Thai Green Curry",
    author: "Alex Chen",
    img: "https://source.unsplash.com/600x400/?thai,curry",
    rating: 4.7,
    time: "35 min",
    tags: ["Asian", "Spicy"],
    difficulty: "Medium",
    likes: 310,
    comments: 55,
    inProgress: false
  },
  {
    id: 3,
    title: "Rainbow Cupcakes",
    author: "Emma Baker",
    img: "https://source.unsplash.com/600x400/?cupcakes,dessert",
    rating: 4.8,
    time: "40 min",
    tags: ["Desserts", "Baking"],
    difficulty: "Medium",
    likes: 189,
    comments: 30,
    inProgress: true,
    lastStep: 1
  },
  {
    id: 4,
    title: "Healthy Buddha Bowl",
    author: "Sara Mint",
    img: "https://source.unsplash.com/600x400/?healthy,bowl",
    rating: 4.6,
    time: "20 min",
    tags: ["Healthy", "Vegetarian"],
    difficulty: "Easy",
    likes: 178,
    comments: 22,
    inProgress: false
  },
  {
    id: 5,
    title: "Classic Cheeseburger",
    author: "John Carter",
    img: "https://source.unsplash.com/600x400/?burger,food",
    rating: 4.5,
    time: "15 min",
    tags: ["American", "Fast Food"],
    difficulty: "Easy",
    likes: 412,
    comments: 61,
    inProgress: false
  },
  {
    id: 6,
    title: "Vegan Stir Fry",
    author: "Lena Wong",
    img: "https://source.unsplash.com/600x400/?stirfry,vegan",
    rating: 4.4,
    time: "18 min",
    tags: ["Vegan", "Asian"],
    difficulty: "Easy",
    likes: 163,
    comments: 19,
    inProgress: true,
    lastStep: 3
  }
];
