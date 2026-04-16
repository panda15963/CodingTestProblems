/*
[테이블] : ANIMAL_OUTS
[컬럼명] : DATETIME(열 이름 'HOUR'), 열 이름 'COUNT'
[조건] : DATETIME을 시간대 별로 자른 뒤 9시 ~ 19시까지의 데이터 개수가 몇 개인지 조회. 단, DATETIME 기준 ASC 정렬.

HOUR(컬럼명) : 해당 컬럼의 시간을 추출
*/

SELECT HOUR(DATETIME) HOUR, COUNT(DATETIME) COUNT
FROM ANIMAL_OUTS
GROUP BY HOUR(DATETIME)
HAVING HOUR >= 9 and HOUR <= 19
ORDER BY HOUR(DATETIME) ASC;