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
            "id": 6,
            "spotId": 6,
            "userId": 6,
            "startDate": "2025-02-19T00:00:00.000Z",
            "endDate": "2025-02-20T00:00:00.000Z"
        },
        {
            "Spot": {
                "id": 6,
                "ownerId": 6,
                "address": "123 McCouty Rd ",
                "city": "McCity",
                "state": "McState",
                "country": "McCountry",
                "name": "McTrip",
                "description": "TEST -Edit a Spot",
                "lat": 37.7645358,
                "lng": -122.4730327,
                "price": 20,
                "previewImage": [
                    {
                        "id": 6,
                        "spotId": 6,
                        "url": "TEST -McImage url",
                        "preview": true
                    },
                    {
                        "id": 7,
                        "spotId": 6,
                        "url": "TEST -McImage url",
                        "preview": true
                    }
                ]
            }
        },
        "There are no bookings at this time",
        {
            "Spot": {
                "id": 7,
                "ownerId": 6,
                "address": "123 McCouty Rd",
                "city": "McCity",
                "state": "McState",
                "country": "McCountry",
                "name": "McTrip",
                "description": "You deserve a break today",
                "lat": 37.7645358,
                "lng": -122.4730327,
                "price": 20,
                "previewImage": []
            }
        }
    ]
}
