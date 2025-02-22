import React from "react";
import UserDetails from "./UserDetails";
import UserContext from "./UserContext";

function UserInfo() {
  const userData = React.useContext(UserContext);
  return <UserDetails userData={userData} />;
}

export default UserInfo;
