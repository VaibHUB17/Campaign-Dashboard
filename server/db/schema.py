from sqlalchemy import Table, Column, Integer, String, Float, MetaData
from pydantic import BaseModel
from typing import Optional
from .connection import metadata

# Define campaigns table using SQLAlchemy Core (functional approach)
campaigns = Table(
    "campaigns",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("name", String, index=True),
    Column("status", String),  # "Active" or "Paused"
    Column("clicks", Integer),
    Column("cost", Float),
    Column("impressions", Integer),
)

# Pydantic model for API response validation
class Campaign(BaseModel):
    id: int
    name: str
    status: str
    clicks: int
    cost: float
    impressions: int
    
    class Config:
        # Use from_attributes instead of orm_mode for Pydantic v2
        from_attributes = True