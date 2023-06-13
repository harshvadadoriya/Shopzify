import { Button } from "@chakra-ui/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { setLoggedOut } from "../../../redux/authSliceRedux/authSlice";
import { store, useAppDispatch } from "../../../redux/store";
import { api, useLogoutMutation } from "../../../redux/apiSliceRedux/apiSlice";

const Logout = () => {
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutMutation();
  const navigate = useNavigate();
  const logoutHandle = async () => {
    try {
      await logoutUser();
      dispatch(setLoggedOut());
      store.dispatch(api.util.resetApiState());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavLink to="/login">
        <Button
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"teal.400"}
          _hover={{
            bg: "teal.300",
          }}
          onClick={logoutHandle}
        >
          Logout
        </Button>
      </NavLink>
    </>
  );
};

export default Logout;
