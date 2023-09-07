import React from "react";
import { useMatch } from "react-router-dom";
import Navigation from "./navigation.component";
import { HomeLink, HomeLinks, NavLinks, NavLink } from "./navigation.styles";

const NavigationSwitch = () => {
  const isHomeRoute = useMatch("/");

  if (isHomeRoute) {
    return <Navigation container={HomeLinks} links={HomeLink} color='white' />;
  } else {
    return <Navigation container={NavLinks} links={NavLink} color='black'/>;
  }
}

export default NavigationSwitch;