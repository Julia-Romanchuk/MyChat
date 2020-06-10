import { Handler } from "express";
import Users from "../../models/user";
import { createResponse, responseStatus } from "../../helpers/ResponseCreator";

const SearchController: Handler = async (req, res) => {
    const usernameParam = req.params.usernameParam
    const users = await Users.find({"username" : {$regex : new RegExp(usernameParam)}})
    .select('image firstname lastname username')
    .limit(10)

    console.log(createResponse(responseStatus.success, '' , {users}))

    res.status(200).json(createResponse(responseStatus.success, '' , {users}))
} 

export default SearchController