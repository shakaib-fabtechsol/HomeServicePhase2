import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTermsUpdateMutation } from '../../../services/auth';
import Swal from 'sweetalert2';

export const usePrivacyPolicy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsUpdate, { isLoading }] = useTermsUpdateMutation();


  useEffect(() => {
    document.title = "Privacy Policy";
  }, []);

  const handleTermsAccept = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      Swal.fire({
        icon: "error",
        title: "Terms Not Accepted",
        text: "You must accept the Terms of Service before continuing.",
      });
      return;
    }

    try {
      const response = await termsUpdate({
        id: userId, 
        terms: termsAccepted ? 1 : 0
      }).unwrap();

      
      if (response?.user) {
        Swal.fire({
          icon: "success",
          title: "User Created",
          text: "Your account has been created successfully.",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: response.message || "An error occurred while updating the user.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "An error occurred while updating the user.",
      });
    }
  };

  return {
    termsAccepted,
    handleTermsAccept,
    handleSubmit,
    userId,
    isLoading
  };
};