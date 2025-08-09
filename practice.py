from decimal import Decimal, getcontext 
  
getcontext().prec = 1
  
result = Decimal('1') / Decimal('200') 
print(result) 
