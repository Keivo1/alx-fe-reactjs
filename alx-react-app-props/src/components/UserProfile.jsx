import React from "react";
import UserInfo from "./UserInfo";
import UserContext from "./UserContext";

function ProfilePage() {
  const userData = React.useContext(UserContext);
  return <UserInfo userData={userData} />;
}

export default ProfilePage;
