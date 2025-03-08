import React, { useEffect, useState } from "react";
import CommonFavorites2 from "../../Components/Common/CommonFavorites2";

function Favourites1() {
  useEffect(() => {
    document.title = "Favourites";
  }, []);
  return <CommonFavorites2 />;
}

export default Favourites1;
