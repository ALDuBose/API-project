// npx sequelize-cli model:generate --name Spot --attributes ownerId:INTEGER,address:INTEGER,city:INTEGER,country:INTEGER,lat:INTEGER,lng:INTEGER,name:STRING,description:STRING

// npx sequelize-cli model:generate --name SpotImage --attributes spotId:INTEGER,url:STRING,preview:BOOLEAN

// npx sequelize-cli model:generate --name Booking --attributes spotId:INTEGER,userID:INTEGER,startDate:DATE,endDate:DATE

// npx sequelize-cli model:generate --name Review --attributes spotId:INTEGER,userId:INTEGER,review:STRING,stars:INTEGER

// npx sequelize-cli model:generate --name ReviewImage --attributes reviewId:INTEGER,url:STRING

// npx sequelize-cli seed:generate --name spot-data
// npx sequelize-cli seed:generate --name spot-image-data
// npx sequelize-cli seed:generate --name booking-data
// npx sequelize-cli seed:generate --name review-data
// npx sequelize-cli seed:generate --name review-image-data
