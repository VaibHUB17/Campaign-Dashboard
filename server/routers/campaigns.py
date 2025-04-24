from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import List, Optional

from db.connection import get_db
from db.schema import campaigns, Campaign

router = APIRouter()

@router.get("/campaigns", response_model=List[Campaign])
async def get_campaigns(
    status: Optional[str] = Query(None, description="Filter by status (Active/Paused)"),
    db: Session = Depends(get_db)
):
    """
    Get all campaigns with optional filtering by status
    """
    # Construct the query using SQLAlchemy Core (functional style)
    query = select(campaigns)
    
    # Apply filter if status is provided
    if status:
        query = query.where(campaigns.c.status == status)
    
    # Execute query and fetch results
    result = db.execute(query)
    campaign_data = result.fetchall()
    
    # Convert SQLAlchemy Row objects to dictionaries
    # Fixed: Use _mapping attribute to properly convert Row objects to dictionaries
    return [row._mapping for row in campaign_data]