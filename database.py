from sqlalchemy import create_engine
from sqlalchemy_utils import create_database, database_exists

def initialize_database(connection_string, Base):
    if not database_exists(connection_string):
        # If the database doesn't exist, create it.
        create_database(connection_string)
    engine = create_engine(connection_string)
    Base.metadata.create_all(engine)