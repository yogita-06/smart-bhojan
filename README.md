# Smart Bhojan - AI-Powered Vegetarian Meal Planning

A comprehensive, production-ready web application for intelligent vegetarian meal planning powered by AI. Built with Next.js 14, TypeScript, and modern web technologies.

## 🌟 Features

### Core Functionality
- **AI Recipe Generator**: Generate personalized vegetarian recipes based on preferences, mood, health goals, and dietary restrictions
- **7-Day Meal Planner**: Interactive weekly meal planning with drag-and-drop functionality
- **Smart Grocery Lists**: Automatic grocery list generation with ingredient consolidation from meal plans
- **BMI & Calorie Calculator**: Complete nutritional analysis with BMR, TDEE, and macro calculations

### Technical Features
- **Modern Stack**: Next.js 14 with App Router, React 19, TypeScript
- **State Management**: Zustand with localStorage persistence and SSR safety
- **UI Components**: shadcn/ui with consistent design system
- **Animations**: Framer Motion for smooth micro-interactions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **SEO Optimized**: Meta tags, OpenGraph, JSON-LD, sitemap, and robots.txt

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod validation
- **Deployment**: Vercel-ready

## 🏗️ Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── dashboard/         # AI Recipe Generator
│   ├── planner/           # 7-Day Meal Planner  
│   ├── grocery/           # Smart Grocery Lists
│   ├── bmi-calories/      # BMI & Calorie Calculator
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # SEO sitemap
│   └── robots.ts          # SEO robots.txt
├── components/            # Reusable components
│   ├── ui/                # shadcn/ui components
│   ├── navbar.tsx         # Navigation
│   ├── footer.tsx         # Footer
│   └── ...                # Feature components
├── lib/                   # Utilities and logic
│   ├── store.ts           # Zustand state management
│   ├── types.ts           # TypeScript definitions
│   ├── mockRecipes.ts     # AI recipe generator (mock)
│   ├── format.ts          # Formatting utilities
│   ├── seo.ts             # SEO helpers
│   └── utils.ts           # General utilities
└── README.md
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-bhojan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup** (optional)
   ```bash
   cp .env.example .env.local
   # Configure environment variables if needed
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Import project on [Vercel](https://vercel.com)
3. Deploy with one click!

### Manual Build
```bash
npm run build
npm start
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 🎯 Key Features Walkthrough

### AI Recipe Generator
- Set calorie targets, cuisine preferences, time limits
- Specify mood and health focus (PCOS, diabetes, weight loss, etc.)
- Include/exclude specific ingredients
- Get 6 personalized vegetarian recipes with full nutritional info

### 7-Day Meal Planner
- Visual grid layout for weekly planning
- Add recipes to specific days and meal times
- Export meal plans as JSON (PDF export planned)
- Clear week and bulk actions

### Smart Grocery Lists
- Auto-generate from meal plans
- Ingredient consolidation and normalization
- Check off items with progress tracking
- Search and filter functionality

### BMI & Calorie Calculator
- BMI calculation with WHO categories
- BMR using Mifflin-St Jeor equation
- TDEE based on activity levels
- Customizable macro presets (Balanced, High-Protein, Low-Carb)

## 🔮 Future Enhancements

- Real AI integration (OpenAI/Anthropic API)
- PDF export functionality
- User authentication and cloud sync
- Recipe sharing and community features
- Nutrition tracking and analytics
- Integration with fitness apps

## 👤 Creator

**Yogita Jha**
- GitHub: [@yogitajha](https://github.com/yogitajha)
- LinkedIn: [Yogita Jha](https://linkedin.com/in/yogitajha)

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for healthy, sustainable vegetarian living.