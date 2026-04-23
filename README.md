# Apna CFO - Vernacular-First AI Personal Finance Advisor 🇮🇳

**Live Deployment:** [https://apnacfo.vercel.app/](https://apnacfo.vercel.app/)

Apna CFO is a premium, AI-powered financial advisor specifically built for Tier-2 and Tier-3 India. It provides jargon-free financial guidance in **Pure Hindi**, **Pure Bhojpuri**, and **Pure English** (100% no Hinglish).

![Home Page Mockup](file:///C:/Users/aryan/.gemini/antigravity/brain/b5f6ae2e-a872-417a-a469-0458c51bf55a/initial_page_load_1776878146050.png)

## 🚀 Features
- **Vernacular-First AI**: Powered by **Mistral AI**, delivering culturally nuanced and script-pure responses.
- **Language Purity**: Strictly enforces Devanagari for Hindi and custom dialects for Bhojpuri. No mixing!
- **Interactive Dashboard**: Real-time financial news, service menus, and a floating AI advisor.
- **FD Advisory Engine**: Compare Fixed Deposit rates across 40+ Indian banks with maturity calculations and TDS impact.
- **Dark/Light Mode**: A premium, persistent theme toggle with smooth transitions.
- **Conversational Memory**: Remembers your profile and financial goals across sessions via MongoDB.

## 🛠️ Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Lucide Icons, Shadcn UI.
- **Backend**: FastAPI (Python), Mistral AI SDK.
- **Databases**: Supabase (PostgreSQL) & MongoDB Atlas.
- **Auth/KYC**: DigiLocker integration path supported.

## 📦 Getting Started

### 1. Prerequisites
- Node.js 18+
- Python 3.10+
- Mistral AI API Key ([Get it here](https://console.mistral.ai/))
- MongoDB Atlas account

### 2. Setup
Clone the repository and install dependencies:

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Environment Variables
Create a `backend/.env` file:
```env
MISTRAL_API_KEY=your_key_here
MONGODB_URI=your_mongodb_atlas_uri
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
```

### 4. Launch
```bash
# Backend
uvicorn main:app --port 8000 --reload

# Frontend
npm run dev
```

## 📄 License
This project is licensed under the MIT License.

---
Built with ❤️ for Bharat by [Aryansh](https://github.com/Aryanshh)
