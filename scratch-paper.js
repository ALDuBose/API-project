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

{
    "Bookings": [
        {
            "User": {
                "id": 6,
                "firstName": "Camilla",
                "lastName": "The Chicken"
            }
        },
        [
            {
                "id": 6,
                "spotId": 6,
                "userId": 6,
                "startDate": "2025-02-19T00:00:00.000Z",
                "endDate": "2025-02-20T00:00:00.000Z"
            }
        ]
    ]
}
