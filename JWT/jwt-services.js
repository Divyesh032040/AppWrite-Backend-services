//install required pkg
//npm install jsonwebtoken bcryptjs dotenv


//.env
// JWT_SECRET=your_jwt_secret_key
// JWT_EXPIRES_IN=1h
// REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
// REFRESH_TOKEN_EXPIRES_IN=7d



const jwt = require('jsonwebtoken');

//generate accessToken 
 function generateAccessTokens (payload) {

    if(!payload){
        throw new Error("payload is required")
    }
    try {
        console.log(process.env.JWT_SECRET
        )
        const accessTokens =  jwt.sign(payload , process.env.JWT_SECRET, {  expiresIn: '2d' });
        return accessTokens;
    } catch (error) {
        console.log(error);
    }
}

//generate refreshToken
function generateRefreshToken(payload){
    if(!payload){
        throw new Error("payload is required")
    }
    try {
        const refreshToken =  jwt.sign(payload ,process.env.JWT_SECRET , {expiresIn:'1y'});
        return refreshToken;
    } catch (error) {
        console.log(error);
    }
}

//verify tokens and return payload
function verifyToken (userToken){
    if(!userToken){
        throw new Error("Invalid input : token is required");
    }
    try {
        const payload = jwt.verify(userToken , process.env.JWT_SECRET);
       
        return payload;
    } catch (error) {
        console.log(error);
    }
}

//deleteToken from database 
async function deleteToken(collection , token){
    if(!collection || !token){
        throw new Error("Invalid input : collection and token both are required");
    }
        try {
            const response = await collection.deleteOne({token:token});
            return response;
        } catch (error) {
            console.log(error);
        }
}


 // Update Refresh Token in Database
 async function updateRefreshToken(userId, refreshToken){
    if(!userId || !refreshToken){
        throw new Error("Invalid input : userId and refreshToken both are required");
    }
    try {
        const updatedToken = await Token.updateOne(
            { userId },
            { refreshToken: refreshToken }
        );
        return updatedToken.nModified > 0 ? "Token updated successfully" : "No token updated";
    } catch (error) {
        console.error("Error updating token:", error.message);
        throw new Error("Could not update token");
    }
}


//assign new accessToken to user after verify refresh token 
async function newAccessToken(collection, refreshToken, payload){

    if (!refreshToken || !payload) {
        throw new Error("Invalid input: Refresh token or payload is missing.");
    }

    try {
        const response = await collection.findOne({ refreshToken });
        if (!response) {
            throw new Error("Refresh token not found.");
        }

        const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2d' });
        return accessToken;
    } catch (error) {
        console.error("Error in newAccessToken:", error.message || error);
        throw error; 
    }
};



module.exports = {
    generateAccessTokens , 
    generateRefreshToken , 
    verifyToken , 
    deleteToken , 
    updateRefreshToken , 
    newAccessToken
}









