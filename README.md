# Healthcare AI Platform

A comprehensive healthcare platform that combines AI-powered symptom checking, insurance guidance, first aid assistance, and emergency medicine delivery for rural India.

## Components

1. AI Symptom Checker
   - Analyzes symptoms using AI
   - Provides preliminary health diagnoses
   - Suggests nearby healthcare options

2. Healthcare Insurance Chatbot
   - Helps understand insurance plans
   - Guides through premiums and coverage
   - Simplifies insurance-related paperwork

3. First Aid Guidance Chatbot
   - Provides immediate first-aid advice
   - Emergency response guidance
   - Step-by-step instructions for common emergencies

4. Emergency Medicine Delivery
   - Connects rural clinics with pharmacies
   - Real-time delivery tracking
   - Efficient supply chain management

## Setup Instructions

1. Install Python 3.8 or higher
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configurations
   ```
4. Run the application:
   ```bash
   uvicorn main:app --reload
   ```

## Tech Stack

- Backend: Python (FastAPI)
- Frontend: React
- Database: SQLite (development) / PostgreSQL (production)
- AI/ML: PyTorch, Transformers
- Authentication: JWT

## Project Structure

```
├── backend/
│   ├── api/
│   ├── core/
│   ├── models/
│   └── services/
├── frontend/
│   ├── public/
│   └── src/
├── requirements.txt
└── README.md
```
