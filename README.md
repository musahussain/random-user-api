# This is a Random user generator api 


## There are multiple endpoints in this api

### GET api/user/random 

    Get a random user from server

### GET api/user/all A list of random users

    Get all the users from server. To get all the users limit must be given when calling. Example: api/user/all?limit=5

### POST api/user/save Save a random user

    Save a user in the database. User must be given as a object

### PATCH api/user/update/:id Update a random user

    Update a user's information in the database using its id

### PATCH api/user/bulkupdate update multiple users

    Update multiple users' information in the database
    Take an array of users.

### DELETE api/user/ delete/:id

    Delete a user from the database using its id

