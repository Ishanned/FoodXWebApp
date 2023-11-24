const mongoose = require("mongoose");

// Encode the password with special characters using encodeURIComponent
const password = encodeURIComponent("Mern@2023");

// Create the MongoDB connection URI
const mongoURI = `mongodb+srv://sukhda0911:${password}@foodx.xqi2cp1.mongodb.net/FoodX?retryWrites=true&w=majority`;

const mongoDB = async () => {
    try {
        const connection = await mongoose.connect(mongoURI, { useNewUrlParser: true });

        if (connection) {
            console.log("Connected");

            const fetched_data = await mongoose.connection.collection("Food_Items");
            const data = await fetched_data.find({}).toArray();

            const foodCategory = await mongoose.connection.collection("Food_category");
            const catData = await foodCategory.find({}).toArray();

            // Assign the data to global.Food_Items
            global.Food_Items = data;
            global.Food_category = catData;
            // You can also assign catData to global if needed
            // global.Food_Category = catData;
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = mongoDB;
