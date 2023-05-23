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

// new Date('2021-05-16').toLocaleString('uk');
// // 16.05.2021, 03:00:00

// new Date('2021-05-16').toLocaleString('en', {
//   month: 'long',
// });
// // May

// new Date('2021-05-16').toLocaleString('en', {
//   month: 'long',
//   day: 'numeric',
//   year: 'numeric',
// });
// // May 16, 2021
