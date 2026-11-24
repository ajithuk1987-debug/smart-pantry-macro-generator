# 🥗 NutriPantry — Smart Pantry & Macro Meal Generator

> Turn your pantry ingredients into delicious, macro-friendly meals with a minimal top-up shopping list.

![Built with React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Deployed-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)

## ✨ Features

- **📸 Snap Ingredients** — Take a photo of your pantry items or upload from gallery; the app auto-detects common ingredients using client-side image analysis (no API calls!)
- **⌨️ Type or Browse** — Manually type comma-separated ingredients or browse & pick from 40+ common pantry items organized by category
- **🎯 Macro Targets** — Filter recipes by minimum protein, maximum calories, and diet style (high-protein, low-carb, vegetarian, quick meals)
- **🧑‍🍳 15+ Easy Recipes** — Curated collection of breakfast, lunch, dinner & snack recipes with clear step-by-step instructions
- **📊 Nutrition Info** — Every recipe shows calories, protein, carbs, fat & fiber per serving with beautiful visual bars
- **🛒 Smart Shopping List** — Auto-generated minimal top-up list showing only what you're missing, grouped by category, with share/copy support
- **📱 Mobile-First Design** — Gorgeous glassmorphism UI optimized for iPhone, Android, and all web browsers
- **🆓 100% Free** — No paid APIs, no trials, no subscriptions. Everything runs client-side.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Build | Vite 6 |
| Hosting | Cloudflare Pages (free) |
| Image Detection | Client-side Canvas API (no paid AI) |
| Recipe Images | Unsplash (free, open-source photos) |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment (Cloudflare Pages)

1. Push to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Connect your GitHub repo
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Deploy! 🎉

Your app will be live at `https://your-project.pages.dev`

## 🍽️ Recipe Categories

| Category | Count | Examples |
|----------|-------|---------|
| 🌅 Breakfast | 3 | Protein Scramble, Overnight Oats, Banana Pancakes |
| 🥗 Lunch | 4 | Teriyaki Chicken Bowl, Chickpea Salad, Tuna Wrap, Quinoa Bowl |
| 🍲 Dinner | 5 | Salmon & Veggies, Tofu Stir-Fry, Burrito Bowl, Pasta Primavera, Prawn Stir-Fry |
| 🍿 Snacks | 3 | Berry Smoothie, PB Toast, Egg Muffins |

## 📄 License

MIT — free to use, modify, and distribute.

---

Made with ❤️ by NutriPantry
