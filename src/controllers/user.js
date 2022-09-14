const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('../services/jwt');
const fs = require('fs');
const path = require('path');


async function register(req,res) {
    const {email, password, name} = req.body;

    const user = new User(req.body);

    try {
        if(!email) {
            return res.status(500).send({msg: "Email is required"});
        }
        if(!password) {
            return  res.status(500).send({msg: "Password is required"});
        }

        // Email is in used?
        const foundEmail = await User.findOne({email: email});
        if(foundEmail) return res.status(500).send({ msg: "Email is in used"}); //throw {msg: "Email is in used"}; 

        const salt = bcryptjs.genSaltSync(10);
        user.password = await bcryptjs.hash(password, salt);
    } catch (error) {
        res.status(500).send(error);
    }

    user.save();

    res.status(201).send({User: user});

}

async function login(req,res) {
    const {email, password} = req.body;

   try {
     const user = await User.findOne({email: email});
     if(!user) {
        return res.status(500).send({msg: "Error in user or password"});
     }
     const password_success = await bcryptjs.compare(password, user.password);
     if(!password_success) {
        return res.status(500).send({msg: "Error in user or password"});
     }

     res.status(200).send({token: jwt.createToken(user, "12h")});
     
   } catch (error) {
    res.status(500).send(error);
   }

}


function protected(req,res) {
    res.status(200).send({msg: "Endpoint protected"});
}

function uploadAvatar(req,res) {
    const params = req.params;

    User.findById({_id: params.id}, (err,userData)=> {
        if(err) {
            res.status(500).send({msg: "Server Error"});
        }
        else {
            if(!userData){
                res.status(404).send({msg: "User doesn't find"});
            }
            else {
                let user = userData;
                
                if(req.files) {
                    const filePath = req.files.avatar.path;
                    const fileSplit = filePath.split("/");
                    
                    const fileName = fileSplit[fileSplit.length -1];
                    const extSplit = fileName.split(".");
                    const fileExt = extSplit[1];

                    if(fileExt !=="png" && fileExt !== "jpg") {
                        res.status(400).send({msg: "Extension is not valid. Only png or jpg."})
                    }
                    else {
                        user.avatar = fileName;

                        User.findByIdAndUpdate({_id: params.id}, user, (err, userResult) => {
                            if(err) {
                                res.status(500).send({msg: "Internal Error"});
                            }
                            else {
                                if(!userResult) {
                                    res.status(404).send({msg: "User not found"});
                                }
                                else {
                                    fs.copyFile(__dirname+'/../uploads/' + fileName, __dirname + '/../avatar/'+fileName, (err,result) => {
                                        if(err) {
                                            console.log("Error");
                                        }
                                    } );
                                    fs.unlink(__dirname+'/../uploads/' + fileName, (err,result) => {

                                    });
                                    res.status(200).send({msg: "Avatar updated!"})
                                }
                            }
                        });

                    }

                }
            }
        }
    });
}

function getAvatar(req,res) {
    const avatarName = req.params.avatarName;
    const filePath = `${__dirname}/../avatar/${avatarName}`;


    fs.stat(filePath, (err,stat) => {
        if(err) {
            res.status(404).send({msg:"Avatar not found"});
        } else {
            res.sendFile(path.resolve(filePath));
        }
    })
}


module.exports = {
    register,
    login,
    protected,
    uploadAvatar,
    getAvatar
};