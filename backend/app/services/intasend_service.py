import logging
import os
from typing import Any, Dict

import requests
from fastapi import HTTPException

from ..schemas.payment import PaymentCreate

logger = logging.getLogger(__name__)

class IntaSendService:
    def __init__(self):
        self.base_url = "https://sandbox.intasend.com/api/v1"  # Use production URL for live
        self.publishable_key = os.getenv("INTASEND_PUBLISHABLE_KEY")
        self.secret_key = os.getenv("INTASEND_SECRET_KEY")
        
        if not self.publishable_key or not self.secret_key:
            raise ValueError("IntaSend API keys not found in environment variables")
    
    def _get_headers(self) -> Dict[str, str]:
        """Get headers for IntaSend API requests"""
        return {
            "Content-Type": "application/json",
            "X-IntaSend-Public-Key-Id": self.publishable_key,
            "Authorization": f"Bearer {self.secret_key}"
        }
    
    def create_payment_request(self, payment_data: PaymentCreate) -> Dict[str, Any]:
        """Create a payment request with IntaSend"""
        try:
            # Prepare payload for IntaSend
            payload = {
                "public_key": self.publishable_key,
                "amount": payment_data.amount,
                "currency": payment_data.currency,
                "narrative": payment_data.narrative,
                "payment_method": payment_data.payment_method,
                "redirect_url": payment_data.redirect_url or "https://codekenya.org/",
            }
            
            # Add customer details if provided
            if payment_data.customer:
                payload["customer"] = {
                    "email": payment_data.customer.email,
                    "phone_number": payment_data.customer.phone_number,
                    "first_name": payment_data.customer.first_name,
                    "last_name": payment_data.customer.last_name
                }
            
            # Add metadata if provided
            if payment_data.metadata:
                payload["metadata"] = payment_data.metadata
            
            # Make request to IntaSend
            response = requests.post(
                f"{self.base_url}/payment/",
                headers=self._get_headers(),
                json=payload,
                timeout=30
            )
            
            if response.status_code == 201:
                return response.json()
            else:
                logger.error(f"IntaSend API error: {response.status_code} - {response.text}")
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Payment creation failed: {response.text}"
                )
                
        except requests.exceptions.RequestException as e:
            logger.error(f"Network error creating payment: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail="Network error occurred while creating payment"
            )
        except Exception as e:
            logger.error(f"Unexpected error creating payment: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail="An unexpected error occurred while creating payment"
            )
    
    def verify_payment(self, invoice_id: str) -> Dict[str, Any]:
        """Verify payment status with IntaSend"""
        try:
            response = requests.get(
                f"{self.base_url}/payment/{invoice_id}/",
                headers=self._get_headers(),
                timeout=30
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                logger.error(f"Payment verification failed: {response.status_code} - {response.text}")
                raise HTTPException(
                    status_code=response.status_code,
                    detail="Payment verification failed"
                )
                
        except requests.exceptions.RequestException as e:
            logger.error(f"Network error verifying payment: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail="Network error occurred while verifying payment"
            )
        except Exception as e:
            logger.error(f"Unexpected error verifying payment: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail="An unexpected error occurred while verifying payment"
            )
    
    def handle_webhook(self, webhook_data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle IntaSend webhook notifications"""
        try:
            # Extract relevant data from webhook
            invoice_id = webhook_data.get("invoice_id")
            payment_id = webhook_data.get("id")
            status = webhook_data.get("status")
            
            if not invoice_id:
                raise ValueError("Invoice ID not found in webhook data")
            
            # Verify the payment with IntaSend to ensure authenticity
            verified_payment = self.verify_payment(invoice_id)
            
            return {
                "invoice_id": invoice_id,
                "payment_id": payment_id,
                "status": status,
                "verified_data": verified_payment
            }
            
        except Exception as e:
            logger.error(f"Error handling webhook: {str(e)}")
            raise HTTPException(
                status_code=400,
                detail="Invalid webhook data"
            )

    def get_supported_payment_methods(self) -> Dict[str, Any]:
        """Get supported payment methods from IntaSend"""
        try:
            response = requests.get(
                f"{self.base_url}/payment-methods/",
                headers=self._get_headers(),
                timeout=30
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                logger.error(f"Failed to fetch payment methods: {response.status_code}")
                # Return default methods if API call fails
                return {
                    "methods": ["MPESA", "CARD", "BANK"],
                    "default": "MPESA"
                }
                
        except Exception as e:
            logger.error(f"Error fetching payment methods: {str(e)}")
            return {
                "methods": ["MPESA", "CARD", "BANK"],
                "default": "MPESA"
            }