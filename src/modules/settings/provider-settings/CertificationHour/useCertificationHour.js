import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddCertificateHoursMutation } from "../../../../services/settings";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../../redux/reducers/authSlice";
import Swal from 'sweetalert2';
import { useState } from "react";

const schema = yup.object().shape({
  certification: yup.string().required("Certification is required"),
  certification_expiry: yup.string().required("Expiry date is required"),
  certification_file: yup.mixed(),
  insurance_document: yup.mixed(),
  insurance_expiry: yup.string().required("Insurance expiry date is required"),
  working_hours_from: yup.string().required("Working hours from is required"),
  working_hours_to: yup.string().required("Working hours to is required"),
  days_available: yup.array().min(1, "Please select at least one working day"),
});

export const useCertificationHour = ({ handleTabChange }) => {
  const [updateCertification, { isLoading }] = useAddCertificateHoursMutation();
  const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      certification: userData?.certification || "",
      certification_expiry: userData?.certification_expiry || "",
      certification_file: userData?.certification_file || "",
      insurance_document: userData?.insurance_document || "",
      insurance_expiry: userData?.insurance_expiry || "",
      working_hours_from: userData?.working_hours_from || "",
      working_hours_to: userData?.working_hours_to || "",
      days_available: userData?.days_available?.split(',') || [],
    },
  });

  const [schedule, setSchedule] = useState([
    { day: "Monday", closed: false, slots: [{ start: "", end: "" }] },
    { day: "Tuesday", closed: false, slots: [{ start: "", end: "" }] },
    { day: "Wednesday", closed: false, slots: [{ start: "", end: "" }] },
    { day: "Thursday", closed: false, slots: [{ start: "", end: "" }] },
    { day: "Friday", closed: false, slots: [{ start: "", end: "" }] },
    { day: "Saturday", closed: false, slots: [{ start: "", end: "" }] },
    { day: "Sunday", closed: false, slots: [{ start: "", end: "" }] },
  ]);

  const [specialSchedule, setSpecialSchedule] = useState([
    {
      text: "",
      date: "",
      closed: false,
      Open24Hours: false,
      hour: [{ start: "", end: "" }],
    },
  ]);

  const updateSchedule = (dayIndex, updates) => {
    setSchedule((prev) => {
      const newSchedule = [...prev];
      newSchedule[dayIndex] = {
        ...newSchedule[dayIndex],
        ...updates,
      };
      return newSchedule;
    });
  };

  const updatespecialSchedule = (dayIndex, updates) => {
    setSpecialSchedule((prev) => {
      const newSchedule = [...prev];
      newSchedule[dayIndex] = {
        ...newSchedule[dayIndex],
        ...updates,
      };
      return newSchedule;
    });
  };

  const closeSpecificData = (dayIndex) => {
    setSpecialSchedule((prev) => {
      const newSchedule = [...prev];
      newSchedule[dayIndex] = {
        ...newSchedule[dayIndex],
        closed: !newSchedule[dayIndex].closed,
      };
      return newSchedule;
    });
  };

  const deleteSlot = (index) => {
    setSpecialSchedule((prev) => prev.filter((_, i) => i !== index));
  };

  const addNewEntry = () => {
    setSpecialSchedule((prev) => [
      ...prev,
      {
        text: "",
        date: "",
        closed: false,
        Open24Hours: false,
        hour: [{ start: "", end: "" }],
      },
    ]);
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Please upload a valid file (PDF, JPG, JPEG, PNG)',
        });
        return;
      }

      if (file.size > maxSize) {
        Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: 'File size should be less than 5MB',
        });
        return;
      }

      setValue(fieldName, file);
    }
  };

  const handleReset = () => {
    reset();
  };

  const onSubmit = async (data) => {
    try {
        console.log("data>>>>>>", data);
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'days_available') {
          formData.append(key, data[key].join(','));
        } else if ((key === 'certification_file' || key === 'insurance_document') && data[key] instanceof File) {
          formData.append(key, data[key]);
        } else {
          formData.append(key, data[key]);
        }
      });
      formData.append('user_id', userData?.id);

      // Add schedule data
      formData.append('schedule', JSON.stringify(schedule));
      formData.append('special_schedule', JSON.stringify(specialSchedule));

      const response = await updateCertification(formData).unwrap();

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Certification hours updated successfully',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        handleTabChange(4);
        dispatch(setUser({
          ...userData,
          ...response.data,
        }));
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.data?.message || 'Failed to update certification hours',
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    handleReset,
    handleFileChange,
    onSubmit,
    watch,
    setValue,
    schedule,
    specialSchedule,
    updateSchedule,
    updatespecialSchedule,
    closeSpecificData,
    deleteSlot,
    addNewEntry,
  };
};
