const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://swezalmanhas:HoxpqFUXelLhP6BD@cluster0.fr1e5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports=connectDB;