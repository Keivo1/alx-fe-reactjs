const useAuth = () => {

    return localStorage.getItem("auth") === "true";
  };
  
  export default useAuth;