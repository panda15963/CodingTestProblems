# 아이스크림의 맛
SELECT FLAVOR
# 상반기에 판매된 
from FIRST_HALF

# 총주문량을 기준으로 내림차순 정렬하고 총주문량이 같다면 출하 번호를 기준으로 오름차순 정렬
order by TOTAL_ORDER desc , SHIPMENT_ID
