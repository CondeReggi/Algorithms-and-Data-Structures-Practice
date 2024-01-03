SELECT 
    p.firstName,
    p.lastName,
    a.city,
    a.state
FROM Person p
LEFT JOIN Address a ON p.personId = a.personId 
ORDER BY 2 ASC

SELECT c.name AS Customers 
FROM Customers c
FULL OUTER JOIN Orders o ON o.customerId = c.id 
WHERE o.customerId IS NULL

