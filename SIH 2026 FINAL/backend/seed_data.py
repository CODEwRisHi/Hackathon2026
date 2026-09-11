from database import engine, SessionLocal, Base, User
from security import get_password_hash

def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    if not db.query(User).first():
        db.add(User(email="admin@cyberintel.gov.in", hashed_password=get_password_hash("admin123")))
        db.commit()
    print("Database Ready! Admin Created.")
    db.close()

if __name__ == "__main__":
    seed()