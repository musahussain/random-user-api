const fs = require('fs');


// get all users 
const getAllUser = (req, res, next) => {
    const limit = req.query.limit;
    const data = fs.readFileSync('./users.json');
    const users = JSON.parse(data);
    let limitedUsers = [];
    if(!limit) {
      return res.status(500).send({
        error: "Api call error",
        message: "limit must be given"
      });
    }
    if(limit > users.length || limit <= 0) {
      res.status(500).send({
        error: "Api call error",
        message: "limit must be less than user and bigger than 0"
      });
    } else {
        for(let i = 0; i < parseInt(limit); i++) {
            limitedUsers.push(users[i]);
        }   
    }

    if(limitedUsers) {
      res.status(200).send({
        success: true,
        messages: "Successfully got the data",
        data: limitedUsers
      });
    } else {
        res.status(500).send({
        success: false,
        error: "Could not get the data"
      });
    } 
};

// save a user 
const saveAnUser = (req, res) => {
  const user = req.body;
    if(user.hasOwnProperty('name') && user.hasOwnProperty('_id') && user.hasOwnProperty('gender') && user.hasOwnProperty('contact') && user.hasOwnProperty('address') && user.hasOwnProperty('photoUrl')) {
        const data = fs.readFileSync('users.json');
        let allUser = JSON.parse(data);
        allUser.push(user);
        const newUser = fs.writeFileSync('users.json', `${JSON.stringify(allUser)}`);
        if(allUser) {
          res.status(200).send({
            success: true,
            messages: "Successfully inserted the data",
            data: allUser
          });
        } else {
            res.status(500).send({
            success: false,
            error: "Cannot insert data"
          });
        } 
    } else {
        return res.status(500).send({
          error: "Api call error",
          message: "one or more property missing"
        });
    }
};

// get a random user 
const getRandomUser = (req, res) => {
    const data = fs.readFileSync('./users.json');
    const users = JSON.parse(data);
    const randomUser = users[Math.floor(Math.random() * 6)];

    if(randomUser) {
      res.status(200).send({
        success: true,
        messages: "Successfully got the data",
        data: randomUser
      });
    } else {
        res.status(500).send({
        success: false,
        error: "Could not get data"
      });
    } 
};

// update an user 
const updateAnUser = (req, res) => {
    const {id} = req.params;
    const newUser = req.body;
    const number = 1;
    if(isNaN(parseInt(id))) {
        return res.status(500).send({
          error: "Api call error",
          message: "id must be a number"
        });
    } else{
        const data = fs.readFileSync('users.json');
        let allUsers = JSON.parse(data);
        const user = allUsers.find(u => u._id == id);
        if(!user) {
          res.status(500).send({
            error: "Api call error",
            message: "id not found"
          });
        }
        const filteredUsers = allUsers.filter(u => u._id != id);
        const updatedUser = {
            _id: parseInt(id),
            name: newUser?.name || user.name,
            gender: newUser?.gender || user.gender,
            contact: newUser?.contact || user.contact,
            address: newUser?.address || user.address,
            photoUrl: newUser?.photoUrl || user.photoUrl
        };
        filteredUsers.push(updatedUser);
        const result = fs.writeFileSync('users.json', `${JSON.stringify(filteredUsers)}`);
        if(filteredUsers) {
          res.status(200).send({
            success: true,
            messages: "Successfully updated the user",
            data: updatedUser
          });

        } else {
            res.status(500).send({
            success: false,
            error: "Cannot update user"
          });
        } 
    }
};

// update multiple users 
const bulkUpdate = (req, res) => {
    const newUsers = req.body;
    const data = fs.readFileSync('users.json');
    let allUsers = JSON.parse(data);
    let updated = false;
    for(let i = 0; i < allUsers.length; i++) {
        for(let j = 0; j < newUsers.length; j++) {
            if(allUsers[i]._id == newUsers[j]?._id) {
                allUsers[i].name = newUsers[j]?.name || allUsers[i]?.name;
                allUsers[i].gender = newUsers[j]?.gender || allUsers[i]?.gender;
                allUsers[i].contact = newUsers[j]?.contact || allUsers[i]?.contact;
                allUsers[i].address = newUsers[j]?.address || allUsers[i]?.address;
                allUsers[i].photoUrl = newUsers[j]?.photoUrl || allUsers[i]?.photoUrl;
            }
        }
        updated = true;
    }
    fs.writeFileSync('users.json', `${JSON.stringify(allUsers)}`);
    if(updated) {
      res.status(200).send({
        success: true,
        messages: "Successfully updated users",
        data: allUsers
      });
    } else {
        res.status(500).send({
        success: false,
        error: "Could not update users"
      });
    } 
}

// delete an user 
const deleteUser = (req, res) => {
    const {id} = req.params;
    const convertedId = parseInt(id);
    if(isNaN(id)) {
        return res.status(500).send({
          error: "Api call error",
          message: "id missing"
        });
    } else {
        const data = fs.readFileSync('users.json');
        let allUsers = JSON.parse(data);
        const deleteUser = allUsers.find(u => u._id == id);
        if(!deleteUser) {
          res.status(500).send({
            error: "Api call error",
            message: "user not found"
          });
        }
        const filteredUsers = allUsers.filter(u => u._id != id);
        fs.writeFileSync('users.json', `${JSON.stringify(filteredUsers)}`);
        if(filteredUsers) {
          res.status(200).send({
            success: true,
            messages: "Successfully deleted the user",
            data: deleteUser
          });
        } else {
            res.status(500).send({
            success: false,
            error: "Could not delete user"
          });
        } 
    }
};

module.exports = {
  getAllUser,
  saveAnUser,
  getRandomUser,
  updateAnUser,
  deleteUser,
  bulkUpdate
};