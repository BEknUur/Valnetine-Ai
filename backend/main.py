from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
import uuid
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from langdetect import detect
from openai.error import OpenAIError
import uvicorn


app = FastAPI()


origins = [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
    "https://valentine-ai-mu.vercel.app",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is not set in environment variables!")

openai.api_key = OPENAI_API_KEY


valentines = {}


class LoveLetterRequest(BaseModel):
    recipient_name: str
    preferences: str
    tone: str
    language: str = "ru"


@app.get("/")
async def root():
    return {"message": "FastAPI backend is running!"}


@app.post("/generate_letter/")
async def generate_letter(request: LoveLetterRequest):
    """Генерация короткого любовного письма (максимум 5 предложений)"""
    try:
       
        language = request.language
        if not language or language not in ["en", "ru", "kk"]:
            detected_lang = detect(f"{request.recipient_name} {request.preferences}")
            if detected_lang.startswith("ru"):
                language = "ru"
            elif detected_lang.startswith("kk"):
                language = "kk"
            else:
                language = "en"

        
        prompt = (
            f"Write a {request.tone} love letter to {request.recipient_name or 'your beloved'} "
            f"in no more than 5 sentences, based on their interests: {request.preferences or 'romantic moments'}. "
            f"Language: {language}."
        )

       
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a romantic poet."},
                    {"role": "user", "content": prompt}
                ]
            )
            letter_text = response['choices'][0]['message']['content']
        except OpenAIError as e:
            raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")

       
        letter_id = str(uuid.uuid4())
        valentines[letter_id] = letter_text

        return {"letter_id": letter_id, "letter": letter_text, "language": language}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/valentine/{letter_id}")
def get_letter(letter_id: str):
    """Получение сгенерированной валентинки по ID"""
    if letter_id in valentines:
        return {"letter": valentines[letter_id]}
    raise HTTPException(status_code=404, detail="Letter not found")


@app.get("/supported_languages")
def get_supported_languages():
    return {
        "languages": [
            {"code": "en", "name": "English"},
            {"code": "ru", "name": "Русский"},
            {"code": "kk", "name": "Қазақша"}
        ]
    }


def start():
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

if __name__ == "__main__":
    start()
