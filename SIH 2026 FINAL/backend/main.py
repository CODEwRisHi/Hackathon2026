from fastapi import FastAPI, Depends, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from database import engine, Base, get_db, User, Complaint, Alert, ComplaintCreate
from security import verify_password, create_access_token
from pydantic import BaseModel
import os, uuid, random, json

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# Websocket Manager
active_connections = []

class LoginReq(BaseModel): email: str; password: str

@app.post("/api/auth/login")
def login(user: LoginReq, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password): raise HTTPException(401)
    return {"access_token": create_access_token({"sub": user.email})}

@app.post("/api/complaints")
async def create_complaint(comp: ComplaintCreate, db: Session = Depends(get_db)):
    c_id = f"CYB-{uuid.uuid4().hex[:6].upper()}"
    score = min(40 + random.uniform(10, 50), 99)
    level = "Critical" if score > 75 else "High" if score > 50 else "Medium"
    p_lat = comp.suspected_lat + random.uniform(0.01, 0.05)
    p_lon = comp.suspected_lon + random.uniform(0.01, 0.05)
    
    db_comp = Complaint(complaint_id=c_id, crime_category=comp.crime_category, transaction_amount=comp.transaction_amount, district=comp.district, risk_score=score, risk_level=level, predicted_lat=p_lat, predicted_lon=p_lon)
    db.add(db_comp)
    
    if level in ["High", "Critical"]:
        db.add(Alert(severity=level, message=f"Risk {level} detected in {comp.district} for {comp.crime_category}"))
    db.commit()
    
    for ws in active_connections:
        try: await ws.send_text(json.dumps({"type": "NEW", "msg": f"New Complaint: {c_id}"}))
        except: pass
    
    return {"complaint_id": c_id, "risk_score": score, "risk_level": level, "predicted_lat": p_lat, "predicted_lon": p_lon}

@app.get("/api/dashboard/stats")
def get_stats(db: Session = Depends(get_db)):
    return {"total_complaints": db.query(Complaint).count(), "active_alerts": db.query(Alert).count()}

@app.get("/api/risk-locations")
def risk_locs(db: Session = Depends(get_db)):
    return [{"lat": c.predicted_lat, "lng": c.predicted_lon, "risk_level": c.risk_level, "category": c.crime_category} for c in db.query(Complaint).all()]

@app.get("/api/alerts")
def get_alerts(db: Session = Depends(get_db)):
    return [{"id": a.id, "severity": a.severity, "message": a.message} for a in db.query(Alert).order_by(Alert.id.desc()).limit(10).all()]

@app.websocket("/api/ws/dashboard")
async def ws_endpoint(ws: WebSocket):
    await ws.accept()
    active_connections.append(ws)
    try:
        while True: await ws.receive_text()
    except WebSocketDisconnect: active_connections.remove(ws)

# Frontend Hosting Logic
frontend_dist = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "dist")
if os.path.isdir(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str): return FileResponse(os.path.join(frontend_dist, "index.html"))