# UA Legal Bot

A Telegram bot that provides **legal guidance** for situations like being stopped by police, home searches, and other legal queries. Built with **Telegraf**, **Node.js**, **PostgreSQL**, and **OpenAI**.

---

## Features

- Interactive menu-driven flow:
  - 🚓 Зупинили на вулиці  
  - 🚗 Зупинили в автомобілі  
  - 🏠 Обшук в домі  
  - ⚖️ Інше  
- AI-powered advice via OpenAI (GPT-5 Nano)  
- Free-text user input after choosing “Мені не допомогло. Спитати поради в бота”  
- Input filters:
  - Length filter  
  - Spam filter  
  - Semantic similarity filter  
- Handles long AI responses safely for Telegram limits  
- Graceful error handling for AI and Telegram API errors  
- PostgreSQL for session and data persistence  
- Dockerized for easy deployment  

---

## Prerequisites

- Node.js 20+  
- PostgreSQL 16+  
- Docker & Docker Compose (optional but recommended)  
- Telegram bot token from [BotFather](https://t.me/BotFather)  
- OpenAI API key  


## Project Structure
```bash
src/
├─ app/
│  ├─ bot.ts             # Telegram bot setup and handlers
│  ├─ handlers/
│  │  └─ inputHandler.ts # Handles free-text AI requests
│  └─ utils/
│     └─ sendSafeReply.ts
├─ domain/
│  ├─ services/
│  │  ├─ LengthFilter.ts
│  │  ├─ SpamFilter.ts
│  │  └─ SemanticSimilarityFilter.ts
│  └─ usecases/
│     └─ FilterPipeline.ts
└─ infrastructure/
   └─ ai/
      └─ aiService.ts     # OpenAI API interaction
```

## SQL to make db work (for now)
```bash
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    telegram_id BIGINT UNIQUE,
    username TEXT,
    language TEXT DEFAULT 'en',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    message TEXT,
    response TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```



## Setup

### 1. Clone repository

```bash
git clone https://github.com/yourusername/ua-legal-bot.git
cd ua-legal-bot
```

### 2. Create .env file
```bash
APP_NAME=ua-pravo-bot
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
OPENAI_API_KEY=your_openai_api_key
```

### 3. Start PostgreSQL (Docker)
```bash
docker compose up -d
```


DB will run with name ua-pravo-bot-db

Default password: 12345 (see docker-compose.yml)

### 4. Install dependencies
```bash
npm install
```

### 5. Start the bot
```bash
npm run start
```

## Usage

1. Open Telegram and start your bot: /start

2. Choose one of the main menu options

3. If the advice doesn’t help, click:

Мені не допомогло. Спитати поради в бота

4. Type your question — AI will respond with guidance

Note: Free-text input is only handled after clicking the “ask AI” option to prevent spam or unrelated messages.

## Error Handling

- Telegram 400 “message too long” → bot automatically splits AI responses into multiple messages.

- OpenAI rate limit (429) → bot replies:

“Бот тимчасово недоступний через обмеження по запитах. Спробуйте пізніше або зверніться до адміністратора.”

