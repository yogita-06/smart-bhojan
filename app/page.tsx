'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Bot, 
  Calendar, 
  ShoppingCart, 
  Calculator,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Recipes',
    description: 'Generate personalized vegetarian recipes based on your preferences, mood, and health goals.',
  },
  {
    icon: Calendar,
    title: '7-Day Meal Planner',
    description: 'Plan your entire week with organized breakfast, lunch, and dinner schedules.',
  },
  {
    icon: ShoppingCart,
    title: 'Smart Grocery Lists',
    description: 'Automatically generate shopping lists from your meal plans with ingredient consolidation.',
  },
  {
    icon: Calculator,
    title: 'BMI & Calorie Tracker',
    description: 'Calculate your BMI, daily calorie needs, and personalized macro requirements.',
  },
];

const steps = [
  {
    number: 1,
    title: 'Set Your Preferences',
    description: 'Tell us about your dietary needs, health goals, and taste preferences.',
  },
  {
    number: 2,
    title: 'Get AI Recipes',
    description: 'Our AI generates personalized vegetarian recipes just for you.',
  },
  {
    number: 3,
    title: 'Plan & Shop',
    description: 'Plan your week and get automated grocery lists for hassle-free shopping.',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Working Professional',
    content: 'Smart Bhojan has revolutionized my meal planning. The AI recipes are spot-on for my PCOS diet needs!',
    rating: 5,
  },
  {
    name: 'Rahul Patel',
    role: 'Fitness Enthusiast',
    content: 'Perfect for my high-protein vegetarian diet. The macro calculations are incredibly helpful.',
    rating: 5,
  },
  {
    name: 'Anita Singh',
    role: 'Busy Mom',
    content: 'The grocery list feature saves me so much time. No more forgetting ingredients!',
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Meal Planning
              </div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Smart Vegetarian
              <span className="text-blue-600 block">Meal Planning</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Discover personalized vegetarian recipes with AI, plan your weekly meals effortlessly, 
              and generate smart grocery lists. Made for healthy, sustainable living.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button asChild size="lg" className="px-8 py-3 text-lg">
                <Link href="/dashboard">
                  Open Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg">
                <Link href="/planner">
                  Try Planner
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Meal Planning
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools to make vegetarian meal planning simple, smart, and enjoyable.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with Smart Bhojan in three simple steps.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of happy users who have transformed their meal planning experience.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-base">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Meal Planning?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start your journey to healthier, more organized vegetarian eating today.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button asChild size="lg" variant="secondary" className="px-8 py-3 text-lg">
                <Link href="/dashboard">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}