select (
    CASE 
        WHEN (SKILL_CODE & (select sum(CODE) from SKILLCODES where CATEGORY like 'Front%')) 
            and SKILL_CODE & (select CODE from SKILLCODES where NAME = 'PYTHON') THEN 'A'
        WHEN SKILL_CODE & (select CODE from SKILLCODES where NAME = 'C#') THEN 'B'
        WHEN SKILL_CODE & (select sum(CODE) from SKILLCODES where CATEGORY like 'Front%') THEN 'C'
        ELSE NULL
    END) as GRADE, ID, EMAIL
from DEVELOPERS
group by GRADE, ID, EMAIL
having GRADE is not NULL
order by GRADE, ID
;