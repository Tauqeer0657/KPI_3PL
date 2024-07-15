Api for customer table

// getting all data of customer table
http://localhost:1433/api/customer

// Adding customers in customer table
http://localhost:1433/api/customer

Api for master table

// upload master excel sheet to database
http://localhost:1433/api/master/upload

// getting all data of master table
http://localhost:1433/api/master

// fetch Dashboard Statistics Based On CustomerID And Year Month with click functionality
http://localhost:1433/api/master/fetchDashboardStatisticsBasedOnCustomerAndMonth/:customerID/:yearMonth

// fetch Dashboard Statistics Based On CustomerID yearMonth and delivery plant with click functionality
http://localhost:1433/api/master/fetchDashboardStatisticsBasedOnCustomerMonthAndDeliveryPlant/:customerID/:yearMonth/:deliveryPlant

// fetch Planned DCGR Dashboard Statistics Based On CustomerID And Year Month with click functionality
http://localhost:1433/api/master/fetchPlannedDCGRDashboardBasedOnCustomerAndMonth/:customerID/:yearMonth

Api for dn Summary table

// upload dn Summary excel sheet to database
http://localhost:1433/api/dnSummary/upload

// getting all data of dn summary table
http://localhost:1433/api/dnSummary

// clicking functionality on dashboard's card statistics based on customer id and delivery plant
http://localhost:1433/api/dnSummary/fetchCardsStatisticsByDeliveryPlant/:customerID/:deliveryPlant

Api for dcgr table

// upload dcgr excel sheet to database
http://localhost:1433/api/dcgr/upload

// getting all data of dcgr table
http://localhost:1433/api/dcgr

Api for customer delivery plant table

//getting all Delivery Plant Based On Customer
http://localhost:1433/api/customerDeliveryPlant/:customerID

Api for planned dcgr table

// upload planned dcgr excel sheet to database
http://localhost:1433/api/plannedDcgr/upload

// fetch Dashboard Cards Statistics By CustomerID
http://localhost:1433/api/plannedDcgr/fetchDashboardCardsStatistics/:customerID

// fetching Graph Statistics Of Planned DCGR By Customer
http://localhost:1433/api/plannedDcgr/fetchGraphStatisticsOfPlannedDCGRByCustomer/:customerID

Api for user master table

// getting all users from user master table
http://localhost:1433/api/userMaster

// add user to user master table
http://localhost:1433/api/userMaster

// Update userDetails on user master table
http://localhost:1433/api/userMaster/update/:userID

//login functionality
http://localhost:1433/api/userMaster/login

Api for user type table

// getting all data from user type table
http://localhost:1433/api/userType