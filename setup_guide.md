# Apna CFO - Free AI Setup Guide (Mistral)

To run the Apna CFO chatbot, we use the **Mistral AI API**. Follow these steps to get your key and set it up.

## 1. Get your Mistral API Key
1. Go to the [Mistral La Plateforme](https://console.mistral.ai/).
2. Sign in or create an account.
3. Navigate to **API Keys** and click **"Create New Key"**.
4. Copy the generated API key.

## 2. Configure the Backend
1. Open the file `backend/.env` (create it if it doesn't exist).
2. Add the following line:
   ```env
   MISTRAL_API_KEY=your_copied_api_key_here
   ```
3. Save the file.

## 3. Restart the Application
1. In your terminal, stop the existing backend server (Ctrl+C).
2. Start it again:
   ```powershell
   cd backend
   python -m uvicorn main:app --port 8000 --reload
   ```

## 4. Why Mistral?
- **Powerful Models**: Mistral-tiny/small are highly efficient and great for multilingual support.
- **Privacy**: Mistral is known for its focus on open-weight and high-performance models.
- **Language Support**: Excellent for European and Asian languages, including Hindi and Bhojpuri.


## 5. MongoDB Setup (Free Forever)
The chatbot uses MongoDB to remember your past conversations. You can get a free database in 2 minutes:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Create a free account.
3. Deploy a **"FREE / M0"** cluster.
4. Go to **"Database Access"** and create a user with a password.
5. Go to **"Network Access"** and click **"Allow Access from Anywhere"** (0.0.0.0/0).
6. Click **"Connect"** -> **"Drivers"** -> Copy the **Connection String**.
7. In `backend/.env`, update the line:
   ```env
   MONGODB_URI=your_copied_connection_string_here
   ```
   *(Be sure to replace `<password>` with your actual password in the string)*
