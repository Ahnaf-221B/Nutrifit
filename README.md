# 🥗 NutriFit — AI-Powered Fitness & Nutrition Planner

**NutriFit** is a personalized fitness and nutrition planning application designed to help users make informed decisions about their daily nutrition, physical activity, and fitness goals. By combining calorie estimation, personalized recommendations, and an AI-powered chatbot, NutriFit aims to make fitness planning more accessible and convenient.

## ✨ Features

- **Personalized Nutrition Planning:** Generate daily nutrition recommendations based on user information and activity level.
- **TDEE Calculator:** Estimate Total Daily Energy Expenditure (TDEE) to understand daily energy needs.
- **Fitness Goal Support:** Get recommendations tailored to individual fitness objectives.
- **Exercise Recommendations:** Explore suggested physical activities based on fitness needs.
- **AI Fitness Assistant:** Interact with an AI-powered chatbot using Google's Gemini 2.5 Flash model to ask fitness and nutrition-related questions.
- **Interactive User Interface:** Navigate a modern, responsive interface designed for a smooth user experience.
- **Data Visualization:** Present relevant fitness and nutrition information in an easy-to-understand format.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | Component-based user interface |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling |
| Supabase | Backend services and authentication integration |
| Google Gemini 2.5 Flash | AI-powered chatbot |
| Recharts | Data visualization |
| Lucide React | Interface icons |

### Live Link: https://nutrifitbd.vercel.app/

## 🚀 Getting Started

Follow these steps to run NutriFit locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Ahnaf-221B/Nutrifit.git
```

### 2. Navigate to the project directory

```bash
cd Nutrifit
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory and add the environment variables required by your application.

```env
# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key
```


### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for production

```bash
npm run build
```

To start the production server after a successful build:

```bash
npm run start
```

## 📂 Project Structure

The application follows a Next.js App Router structure.

```text
Nutrifit/
├── app/                # Application routes and pages
├── components/         # Reusable UI components
├── lib/                # Shared utilities and application logic
├── public/              # Static assets
├── .env.local           # Local environment variables (not committed)
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## 🧠 How It Works

1. **Enter personal information:** Provide the information needed to estimate daily energy requirements.
2. **Calculate energy needs:** Estimate TDEE using the user's activity level and relevant personal inputs.
3. **Generate recommendations:** Use the calculated energy needs and fitness goals to provide nutrition guidance.
4. **Explore exercise suggestions:** Review recommended physical activities.
5. **Ask the AI assistant:** Use the integrated chatbot for general fitness and nutrition questions.

*Note: Recommendations are intended for general informational purposes and should not replace professional medical or nutritional advice.*

## 🔐 Security

- Keep API keys and private credentials out of source control.
- Configure Supabase authentication and database access policies appropriately.
- Validate user inputs and protect sensitive user information.
- Keep server-side secrets on the server rather than exposing them through public environment variables.

## 🗺️ Future Improvements

Potential enhancements include:

- Personalized meal plans with food and nutrient breakdowns.
- Daily meal and activity tracking.
- Progress dashboards and historical reports.
- Customizable workout routines.
- Improved AI recommendations based on user preferences.
- Additional nutrition data and regional food options.

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch to your fork.
5. Open a pull request describing your changes.

## 👨‍💻 Author

**Ahnaf Hossain**

- GitHub: [@Ahnaf-221B](https://github.com/Ahnaf-221B)
- Project Repository: [NutriFit](https://github.com/Ahnaf-221B/Nutrifit)

---

⭐ If you find NutriFit interesting, consider starring the repository!

**Disclaimer:** NutriFit provides general fitness and nutrition information for educational purposes. Individual results may vary, and its recommendations are not a substitute for professional healthcare advice.
