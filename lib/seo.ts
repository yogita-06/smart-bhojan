export const siteConfig = {
  name: 'Smart Bhojan',
  description: 'AI-powered vegetarian meal planning made simple. Generate personalized recipes, plan your week, and create smart grocery lists.',
  url: 'https://smartbhojan.com',
  creator: 'Yogita Jha'
};

export function generateMetadata(page: string) {
  const pages = {
    home: {
      title: 'Smart Bhojan - AI-Powered Vegetarian Meal Planning',
      description: 'Discover personalized vegetarian recipes with AI, plan your weekly meals, and generate smart grocery lists. Made for healthy living.',
    },
    dashboard: {
      title: 'Recipe Generator - Smart Bhojan',
      description: 'Generate personalized vegetarian recipes using AI. Set your preferences for calories, cuisine, mood, and health goals.',
    },
    planner: {
      title: '7-Day Meal Planner - Smart Bhojan',
      description: 'Plan your weekly vegetarian meals with ease. Organize breakfast, lunch, and dinner for every day of the week.',
    },
    grocery: {
      title: 'Smart Grocery Lists - Smart Bhojan',
      description: 'Automatically generate grocery lists from your meal plans. Never forget an ingredient again.',
    },
    'bmi-calories': {
      title: 'BMI & Calorie Calculator - Smart Bhojan',
      description: 'Calculate your BMI, daily calorie needs, and macro requirements. Get personalized nutrition guidance.',
    },
  };

  const pageData = pages[page as keyof typeof pages] || pages.home;

  return {
    title: pageData.title,
    description: pageData.description,
    keywords: 'vegetarian recipes, meal planning, AI recipes, healthy eating, nutrition, vegetarian diet, meal prep',
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: pageData.title,
      description: pageData.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
      creator: '@smartbhojan',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    canonical: `${siteConfig.url}/${page === 'home' ? '' : page}`,
  };
}