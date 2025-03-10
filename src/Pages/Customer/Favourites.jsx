import React, { useEffect, useState } from "react";
import CommonFavorites from "../../Components/Common/CommonFavorites";

function Favourites() {
  useEffect(() => {
    document.title = "Favourites";
  }, []);
  return <CommonFavorites serviceDetailTo="/customer/dealDetails" />;
}

export default Favourites;
