from typing import List, Optional
from models.chat import FDRate

class FDService:
    @staticmethod
    def calculate_maturity(amount: float, rate: float, tenor_days: int, compounding_frequency: str = "quarterly") -> dict:
        """
        Calculates FD maturity amount and TDS.
        Formula: A = P(1 + r/n)^(nt)
        """
        # Simplified calculation
        # n = number of times interest compounded per year
        n = 4 # Default quarterly
        t = tenor_days / 365
        r = rate / 100
        
        maturity_amount = amount * (1 + r/n)**(n*t)
        interest_earned = maturity_amount - amount
        
        # TDS Calculation (Simplified: 10% if interest > 40,000)
        tds_threshold = 40000
        tds_amount = 0
        if interest_earned > tds_threshold:
            tds_amount = interest_earned * 0.10
        
        net_maturity = maturity_amount - tds_amount
        
        return {
            "principal": round(amount, 2),
            "maturity_amount": round(maturity_amount, 2),
            "interest_earned": round(interest_earned, 2),
            "tds_amount": round(tds_amount, 2),
            "net_maturity": round(net_maturity, 2),
            "rate": rate,
            "tenor_days": tenor_days
        }

    @staticmethod
    def compare_rates(rates: List[FDRate], tenor_days: int) -> List[dict]:
        """
        Filters and sorts rates for a specific tenor.
        """
        # Find closest tenor match or filter within a range
        filtered = [r for r in rates if abs(r.tenor_days - tenor_days) <= 30]
        sorted_rates = sorted(filtered, key=lambda x: x.rate_general, reverse=True)
        return [r.dict() for r in sorted_rates]
