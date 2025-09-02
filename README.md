# 🧠 AI Interview Trainer

**AI Interview Trainer** is a full-stack voice-interview simulation app built with **Next.js**, designed to conduct mock sales interviews using real-time voice transcription and AI-based feedback. Users speak their answers into the app, and responses are transcribed, evaluated, and analyzed using DeepSeek AI via OpenRouter.

---

## 🎯 Features

- 🎤 Voice-to-text sales interview using [Vapi](https://vapi.ai/)
- 📄 Real-time transcription of user responses
- 🤖 AI-based response analysis powered by DeepSeek via [OpenRouter](https://openrouter.ai/)
- 🧠 Evaluation across clarity, relevance, persuasiveness, and readiness
- 🔁 Role-based message display with avatars
- 🌐 Clean UI with Tailwind CSS and Radix UI
- 🔒 No user login required — uses `localStorage` for session persistence
- ✅ Status checks for AI connectivity

---

## ⚙️ Tech Stack

- **Next.js** – React framework with API support
- **React** – UI library
- **Vapi** – Voice interface and transcription SDK
- **DeepSeek AI** – LLM used for analyzing user responses (via OpenRouter)
- **Tailwind CSS** – Utility-first styling
- **Radix UI** – Headless avatar components
- **localStorage** – For storing and syncing interview data

---

## 🧪 Pages

- `/` – Interview Start: lets the user begin or end a voice session
- `/results` – Displays transcripted responses and AI-generated analysis

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# SalesBot
