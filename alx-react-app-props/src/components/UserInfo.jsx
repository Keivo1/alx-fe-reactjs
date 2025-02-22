import UserDetails from "./UserDetails";
import UserContext from "./UserContext";

function UserInfo() {
  const userData = useContext(UserContext);
  return <UserDetails userData={userData} />;
}

export default UserInfo;
