SELECT 
    LEFT(PRODUCT_CODE, 2) AS CATEGORY, -- 1. 앞 2자리 카테고리 추출
    COUNT(*) AS PRODUCTS              -- 2. 카테고리별 상품 수 집계
FROM 
    PRODUCT
GROUP BY 
    CATEGORY                          -- 3. 카테고리 기준 그룹화
ORDER BY 
    CATEGORY;             