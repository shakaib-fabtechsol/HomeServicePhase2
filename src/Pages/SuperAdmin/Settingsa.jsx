import React, { useEffect } from "react";
import TabComponent from "../../Components/TabComponent";
import { FaUser } from "react-icons/fa";
import { SlLock } from "react-icons/sl";
import PersonalInfo from "../../Components/SuperAdmin/settings/PersonalInfo";
import Security from "../../Components/SuperAdmin/settings/Security";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/reducers/authSlice";
import { useUpdateAdminMutation, useUpdatePasswordMutation } from "../../services/auth";
import Loader from "../../Components/MUI/Loader";

export default function Settingsa() {
  const [updateAmin, { isLoading: updateLoading }] = useUpdateAdminMutation();
  const [updatePassword,{isLoading}] = useUpdatePasswordMutation();
  const Admin = useSelector(selectCurrentUser);
  const [value, setValue] = React.useState(0);
  const changetab = (value) => {

    setValue(value);

  }
  useEffect(() => {
    document.title = "Settings";
  }, []);
  const tabData = [
    {
      label: (
        <div className="flex items-baseline gap-1">
          <FaUser />
          <p>Personal Information</p>
        </div>
      ),
      content: <PersonalInfo Admin={Admin} updateAdmin={updateAmin} />,
    },
    {
      label: (
        <div className="flex items-baseline gap-1">
          <SlLock />
          <p>Security</p>
        </div>
      ),

      content: <Security Admin={Admin} updatePassword={updatePassword} />,
    },
  ];
  if (updateLoading || isLoading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Settings</h2>
        <p className="text-gray-600">
          Manage your account preferences and settings.
        </p>
      </div>
      <div className="border border-[#A2A1A833] rounded-[10px] p-3">
        <TabComponent tabs={tabData} onChange={changetab} value={value} />
      </div>
    </>
  );
}
