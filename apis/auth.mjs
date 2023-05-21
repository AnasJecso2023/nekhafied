import express from 'express';
import { userModel, productModel } from './../dbRepo/models.mjs'
import {
    stringToHash,
    varifyHash,
} from "bcrypt-inzi"
import jwt from 'jsonwebtoken';
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';

const SECRET = process.env.SECRET || "topsecret";


const router = express.Router()


router.post('/signup', (req, res) => {

    let body = req.body;

    if (!body.firstName
        || !body.lastName
        || !body.email
        || !body.password
        || !body.user
        || !body.age
        || !body.dateOfBirth
        || !body.martialStatus
        || !body.height
        || !body.grewUpIn
        || !body.deit
        || !body.personalValues
        || !body.sunSign
        || !body.bloogGroup
        || !body.health
        || !body.disability
        || !body.religion
        || !body.community
        || !body.subCommunity
        || !body.motherTough
        || !body.canSpeak
        || !body.fatherStatus
        || !body.motherStatus
        || !body.nativePlace
        || !body.numberOfBrother
        || !body.numberOfSister
        || !body.familyType
        || !body.familyValue
        || !body.familyAffluence
        || !body.lastQualification
        || !body.collageAttendence
        || !body.income
        || !body.workingWith
        || !body.workingAs
        || !body.employerName
        || !body.currentResidence
        || !body.stateResidence
        || !body.resideny
        || !body.zipCode
        || !body.Hobbies
        || !body.interests
        || !body.likeMusic
        || !body.likeReads
        || !body.prefreMovie
        || !body.sport
        || !body.likeCuisine
        || !body.dressStyle
        || !body.wifeAge
        || !body.wifeHeight
        || !body.wifeReligion
        || !body.wifetongue
        || !body.wifeMaritalstatus
        || !body.wifeCountry
        || !body.wifeState
        || !body.wifeCity
        || !body.wifeEducation
        || !body.wifeWorkingWith
        || !body.wifeWorkingAs
        || !body.wifeProfession
        || !body.wifeincome
        || !body.wifeDiet
        || !body.createdBy
        || !body.country
        || !body.city
        || !body.isVerifi
        || !body.gender
        || !body.profession
        || !body.discription
    ) {
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "abc@abc.com",
                    "password": "12345",
                    "user" : "abc123'
                }`
        );
        return;
    }

    req.body.email = req.body.email.toLowerCase();

    // check if user already exist // query email user
    userModel.findOne({ email: body.email }, (err, user) => {
        if (!err) {
            console.log("user: ", user);

            if (user) { // user already exist
                console.log("user already exist: ", user);
                res.status(400).send({ message: "user already exist,, please try a different email" });
                return;

            } else { // user not already exist

                // bcrypt hash
                stringToHash(body.password).then(hashString => {

                    userModel.create({
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email,
                        gender: body.gender,
                        profession: body.profession,
                        password: hashString,
                        user: body.user,
                        age: body.age,
                        dateOfBirth: body.dateOfBirth,
                        martialStatus: body.martialStatus,
                        height: body.height,
                        grewUpIn: body.grewUpIn,
                        deit: body.deit,
                        personalValues: body.personalValues,
                        sunSign: body.sunSign,
                        bloogGroup: body.bloogGroup,
                        health: body.health,
                        disability: body.disability,
                        religion: body.religion,
                        community: body.community,
                        subCommunity: body.subCommunity,
                        motherTough: body.motherTough,
                        canSpeak: body.canSpeak,
                        discription: body.discription,
                        fatherStatus: body.fatherStatus,
                        motherStatus: body.motherStatus,
                        nativePlace: body.nativePlace,
                        numberOfBrother: body.numberOfBrother,
                        numberOfSister: body.numberOfSister,
                        familyType: body.familyType,
                        familyValue: body.familyValue,
                        familyAffluence: body.familyAffluence,
                        lastQualification: body.lastQualification,
                        collageAttendence: body.collageAttendence,
                        income: body.income,
                        workingWith: body.workingWith,
                        workingAs: body.workingAs,
                        employerName: body.employerName,
                        currentResidence: body.currentResidence,
                        stateResidence: body.stateResidence,
                        city: body.city,
                        country: body.country,
                        resideny: body.resideny,
                        zipCode: body.zipCode,
                        Hobbies: body.Hobbies,
                        interests: body.interests,
                        likeMusic: body.likeMusic,
                        likeReads: body.likeReads,
                        prefreMovie: body.prefreMovie,
                        sport: body.sport,
                        likeCuisine: body.likeCuisine,
                        dressStyle: body.dressStyle,
                        wifeAge: body.wifeAge,
                        isVerifi: body.isVerifi,
                        wifeHeight: body.wifeHeight,
                        wifeReligion: body.wifeReligion,
                        wifetongue: body.wifetongue,
                        wifeMaritalstatus: body.wifeMartialStatus,
                        wifeCountry: body.wifeCountry,
                        wifeState: body.wifeState,
                        wifeCity: body.wifeCity,
                        wifeEducation: body.wifeEducation,
                        wifeWorkingWith: body.wifeWorkingWith,
                        wifeWorkingAs: body.wifeWorkingAs,
                        wifeProfession: body.wifeProfession,
                        wifeincome: body.wifeincome,
                        wifeDiet: body.wifeDiet,
                        createdBy: body.createdBy
                    },
                        (err, result) => {
                            if (!err) {
                                console.log("data saved: ", result);
                                res.status(201).send({ message: "user is created" , data: result});
                            } else {
                                console.log("db error: ", err);
                                res.status(500).send({ message: "internal server error" });
                            }
                        });
                })

            }
        } else {
            console.log("db error: ", err);
            res.status(500).send({ message: "db error in query" });
            return;
        }
    })
});

router.post('/login', (req, res) => {

    let body = req.body;
    body.email = body.email.toLowerCase();

    if (!body.email || !body.password) { // null check - undefined, "", 0 , false, null , NaN
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }

    // check if user exist
    userModel.findOne(
        { email: body.email },
        (err, data) => {
            if (!err) {
                console.log("data: ", data);

                if (data) { // user found
                    varifyHash(body.password, data.password).then(isMatched => {

                        console.log("isMatched: ", isMatched);

                        if (isMatched) {

                            const token = jwt.sign({
                                _id: data._id,
                                email: data.email,
                                iat: Math.floor(Date.now() / 1000) - 30,
                                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                            }, SECRET);

                            console.log("token: ", token);

                            res.cookie('Token', token, {
                                maxAge: 86_400_000,
                                httpOnly: true,
                                sameSite: 'none',
                                secure: true
                            });

                            res.send({
                                message: "login successful",
                                profile: {
                                    email: data.email,
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    _id: data._id,
                                    height: data.height,
                                    motherTough: data.motherTough,

                                }
                            });
                            return;
                        } else {
                            console.log("password did not match");
                            res.status(401).send({ message: "Incorrect email or password" });
                            return;
                        }
                    })

                } else { // user not already exist
                    console.log("user not found");
                    res.status(401).send({ message: "Incorrect email or password" });
                    return;
                }
            } else {
                console.log("db error: ", err);
                res.status(500).send({ message: "login failed, please try later" });
                return;
            }
        })
})

router.post('/logout', (req, res) => {

    res.clearCookie('Token', {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    })
    res.send({ message: "Logout successful" });
})


router.get('/Maleusers', (req, res) => {
        userModel.find({"gender" : "male"}, (err, data) => {
            if (!err) {
                res.send({
                    message: "g3ot all user",
                    data: data
                })
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        });
})

router.get('/Femaleusers', (req, res) => {
    userModel.find({"gender" : "female"}, (err, data) => {
        if (!err) {
            res.send({
                message: "g3ot all user",
                data: data
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

router.get('/users', (req, res) => {
    userModel.find({}, (err, data) => {
        if (!err) {
            res.send({
                message: "g3ot all user",
                data: data
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

router.get('/user/:id', (req, res) => {
    let body = req.params.id
    console.log(body)
userModel.findOne({ _id: body }, (err, data) => {
    if (!err) {
        if (data) {
            res.send({
                message: `get product by id: ${data._id} success`,
                data: data
            });
        } else {
            res.status(404).send({
                message: "product not found",
            })
        }
    } else {
        res.status(500).send({
            message: "server error"
        })
    }
});
})

router.put('/users/:id', async (req, res) => {

    const body = req.body;
    const id = req.params.id;

    console.log(body.myId)
    console.log(body.type)
    if(body.type === 'mes'){
        try {
        let data = await userModel.findByIdAndUpdate(body.myId,
            {
                $push:{userM:  body.userId},
            },
            { new: true }
        ).exec();

        console.log('updated: ', data);

        res.send({
            message: "product modified successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: "server error"
        })
        console.log('error')
    }
    }
    else if(body.type === 'fav'){
        try {
        let data = await userModel.findByIdAndUpdate(body.myId,
            {
                $push:{fav:  body.userId},
            },
            { new: true }
        ).exec();

        console.log('updated: ', data);

        res.send({
            message: "product modified successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: "server error"
        })
        console.log('error')
    }
    }
    // try {
    //     let data = await userModel.findByIdAndUpdate(id,
    //         {
    //             fav: [
    //                 body.userId
    //             ],
    //         },
    //         { new: true }
    //     ).exec();

    //     console.log('updated: ', data);

    //     res.send({
    //         message: "product modified successfully"
    //     });

    // } catch (error) {
    //     res.status(500).send({
    //         message: "server error"
    //     })
    // }

    
})

router.get('/usersMes/:id', (req, res) => {
    let body = req.params.id
    console.log(body)
    var mesarray = []
    body.userId.map((eachid) => {
        userModel.findOne({_id : eachid}, (err ,data) => {
            if (!err) {
        if (data) {
            mesarray.push(data)
        } else {
            res.status(404).send({
                message: "product not found",
            })
        }
    } else {
        res.status(500).send({
            message: "server error"
        })
    }

        } )
    })
    res.send({
            message: "server not an error",
            data: mesarray
        })
})


export default router