import mongoose from 'mongoose';

let productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    description: String,
    owner: { type: mongoose.ObjectId, required: true },
    isDeleted: { typeof: Boolean, default: false },
    createdOn: { type: Date, default: Date.now }
});
export const productModel = mongoose.model('products', productSchema);

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    user: { type: String, required: true },
    age : String,       
    discription : String,       
    gender : String,   
    profession : String,   
    isVerifi: String,      
    dateOfBirth  : String,
    martialStatus  : String,
    height  : String,
    grewUpIn  : String,
    deit : String,
    personalValues: String,
    sunSign  : String,
    bloogGroup : String,
    health : String,
    disability  : String,
    religion: String,
    community : String,
    subCommunity : String,
    motherTough : String,
    canSpeak : String,
    fatherStatus : String,
    motherStatus  : String,
    nativePlace  : String,
    numberOfBrother  : String,
    numberOfSister:String,
    familyType:String,
    familyValue:String,
    familyAffluence:String,
    lastQualification:String,
    collageAttendence:String,
    income:String,
    workingWith:String,
    workingAs:String,
    employerName:String,
    currentResidence:String,
    stateResidence:String,
    resideny:String,
    country:String,
    city:String,
    userT: { type: Array, default: []},
    userM: { type: Array, default: []},
    fav: { type: Array, default: []},
    Hobbies:String,
    interests:String,
    likeMusic:String,
    likeReads:String,
    prefreMovie:String,
    sport:String,
    likeCuisine:String,
    dressStyle:String,
    wifeAge:String,
    wifeHeight:String,
    wifeReligion:String,
    wifetongue:String,
    wifeMaritalstatus:String,
    wifeCountry:String,
    wifeState:String,
    wifeCity:String,
    wifeEducation:String,
    wifeWorkingWith:String,
    wifeWorkingAs:String,
    wifeProfession:String,
    wifeincome:String,
    wifeDiet:String,
    createdBy:String,
    createdOn: { type: Date, default: Date.now },
});
export const userModel = mongoose.model('Final-Look', userSchema);


const mongodbURI = process.env.mongodbURI || "mongodb+srv://dbuser:dbpassword@cluster0.gq9n2zr.mongodb.net/abcdatabase?retryWrites=true&w=majority";
/////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(mongodbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////