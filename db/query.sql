\c database

--what if article has no comments
--LEFT JOIN
--GROUP BY houses.house_name condense all rows of each house-name into one

SELECT houses.*, COUNT(wizard_id) AS no_of_wizards FROM houses 
LEFT JOIN wizards ON houses.house.name = wizards.house
GROUP BY houses.house_name