import { SearchUserItem } from '../../Redux/Types/usersReduser.type'
import { APIMethodReturn } from "../api.type";

type UsersAPI = {
    searchUsers: (usernameParam: string) => APIMethodReturn<{ users: Array<SearchUserItem> }>
}

export default UsersAPI