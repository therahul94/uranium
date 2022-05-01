fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }



Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6IjYyNjgzM2EyMzZlNzE4OWJjOTQ0NDljYyIsImlhdCI6MTY1MTEzMzE4N30.wA_1uUf-HuTmLVrgMPIVyu4DPH8zveexrgyA1wrT88E
{
    "email": "chetan@gmail.com",
    "password": "password345"
}




eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6IjYyNjgzM2ZiMzZlNzE4OWJjOTQ0NDlkMiIsImlhdCI6MTY1MTQzMzkwMX0.QoqAC-SQ2xEUdMheM79TSeuRtJnTfTurWbCnRphdPKM
{
    "email": "sirla@gmail.com",
    "password": "password789"
}