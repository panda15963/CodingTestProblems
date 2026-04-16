SELECT EXTRACT(MONTH FROM start_date) AS month,
       car_id,
       COUNT(history_id) AS records
FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
WHERE start_date >= DATE '2022-08-01'
  AND start_date < DATE '2022-11-01'
  AND car_id IN (
      SELECT car_id
      FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
      WHERE start_date >= DATE '2022-08-01'
        AND start_date < DATE '2022-11-01'
      GROUP BY car_id
      HAVING COUNT(history_id) > 4
  )
GROUP BY EXTRACT(MONTH FROM start_date), car_id
HAVING COUNT(history_id) > 0  -- 별칭 대신 COUNT(history_id) 사용
ORDER BY month, car_id DESC;