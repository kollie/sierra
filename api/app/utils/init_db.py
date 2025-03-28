from ..database import Base, engine

def init_db():
    """
    Initialize the database by creating all tables.
    Call this function when starting the application to ensure all tables exist.
    """
    Base.metadata.create_all(bind=engine) 