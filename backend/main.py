from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="Healthcare AI Platform")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Symptom(BaseModel):
    description: str
    severity: int
    duration: str

class InsuranceQuery(BaseModel):
    budget: float
    family_size: int
    pre_existing_conditions: List[str]
    location: str

class EmergencyRequest(BaseModel):
    condition: str
    location: str
    severity: str

class MedicineDelivery(BaseModel):
    medicine_name: str
    quantity: int
    delivery_address: str
    priority: str
    prescription: Optional[str]

# Routes
@app.get("/")
async def root():
    return {"message": "Welcome to Healthcare AI Platform"}

# Symptom Checker Routes
@app.post("/api/symptom-check")
async def check_symptoms(symptoms: List[Symptom]):
    try:
        # TODO: Implement AI-based symptom analysis
        return {
            "diagnosis": "Preliminary analysis based on symptoms",
            "severity": "moderate",
            "recommendations": [
                "Visit nearest healthcare center",
                "Monitor symptoms",
                "Take rest"
            ],
            "nearby_doctors": [
                {"name": "Dr. Example", "distance": "2km", "speciality": "General Medicine"}
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Insurance Chatbot Routes
@app.post("/api/insurance/recommend")
async def recommend_insurance(query: InsuranceQuery):
    try:
        # TODO: Implement insurance recommendation logic
        return {
            "recommendations": [
                {
                    "plan_name": "Basic Health Cover",
                    "premium": 5000,
                    "coverage": 500000,
                    "features": ["Hospitalization", "Medicine Coverage"]
                }
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# First Aid Chatbot Routes
@app.post("/api/emergency/firstaid")
async def get_first_aid(emergency: EmergencyRequest):
    try:
        # TODO: Implement first aid recommendation system
        return {
            "instructions": [
                "Keep the patient calm",
                "Check for breathing",
                "Apply pressure if bleeding"
            ],
            "emergency_contacts": [
                {"name": "Local Hospital", "phone": "108"}
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Medicine Delivery Routes
@app.post("/api/medicine/delivery")
async def request_delivery(delivery: MedicineDelivery):
    try:
        # TODO: Implement medicine delivery logic
        return {
            "order_id": "MED123",
            "estimated_delivery": "30 minutes",
            "tracking_url": "http://example.com/track/MED123",
            "status": "Processing"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
