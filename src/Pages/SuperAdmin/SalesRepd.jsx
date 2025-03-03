import React, { useEffect } from "react";
import { IoLocationOutline, IoMailOutline } from "react-icons/io5";
import provider from "../../assets/img/provider.png";
import { LuPhone } from "react-icons/lu";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Components/MUI/Loader";
import Swal from "sweetalert2";
import { useGetsaleByIdQuery } from "../../services/sales";
const BASE_URL = import.meta.env.VITE_BASE_URL
export default function SalesRepd() {
  const location=useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetsaleByIdQuery(id);


    console.log(data,"this is data for the sales")


  if (isError) {
    Swal.fire({
      icon: 'error',
      title: 'Sale Not Found',
      text: data?.error?.message || 'Failed to get sales. Please try again.',
    }).then(() => {
      navigate('/superadmin/sales');
    })
  }



  useEffect(() => {
    document.title = "Sales Rep details";
  }, []);
  const permissions = ["Permissions 1", "Permissions 2", "Permissions 3"];
  if (isLoading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Sales Rep details</h2>
        <p className="text-gray-600">
          Track and manage your favorite services.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 justify-between  items-start">
        <div className="flex flex-wrap items-center">
          <img
            src={`${BASE_URL}/uploads/${data?.GetSalesReps?.personal_image}`}
            alt=""
            className="me-2 my-2 rounded-lg max-w-[120px]"
          />
          <div className="my-2">
            <div>
              <p className="font-semibold myhead">{data?.GetSalesReps?.name}</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-1">
              <div className="flex items-center gap-1">
                <IoMailOutline className="text-[#535862]" />
                <p className="text-[#535862]">{data?.GetSalesReps?.email}</p>
              </div>
              <div className="flex items-center gap-1">
                <LuPhone className="text-[#535862]" />
                <p className="text-[#535862]">{data?.GetSalesReps?.phone}</p>
              </div>
            </div>
            <div className="mt-1">
              <div className="flex items-center gap-1">
                <IoLocationOutline className="text-[#535862]" />
                <p className="text-[#535862]">{data?.GetSalesReps?.location || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
        <Link to="/superadmin/editsalesrep" className="flex py-3 justify-center items-center px-6 rounded-lg text-[#fff] bg-[#0F91D2] ms-auto">
          <FaRegPenToSquare className="me-2 text-[#fff]" />
          <span>Edit</span>
        </Link>
      </div>
      {/* <div className="mt-4 border-b border-[#00000033] pb-3">
        <h2 className="md:text-lg font-medium myhead">About Me</h2>
        <p className="myblack text-sm md:text-base mt-2">
          Donec pulvinar consequat metus eget cursus. Donec nec quam eu arcu
          elementum tempor eu pharetra mauris. Morbi et gravida purus, nec
          sagittis risus. Nulla placerat justo ut dui aliquam efficitur. Mauris
          aliquet mattis odio nec malesuada. Morbi at dui tristique, dignissim
          enim ac, varius nulla. Donec venenatis libero nec ligula laoreet
          laoreet. Sed quis lorem in mi suscipit dictum id nec diam. Orci varius
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nam at vehicula neque. Proin molestie venenatis sem, ut imperdiet
          leo efficitur vel. Vestibulum nec elementum lacus.
        </p>
      </div> */}
      <div>
           <div className="overflow-x-auto">
             <div className="flex flex-col gap-5 min-w-[400px]">
               <div className="grid grid-cols-12 gap-2">
                 <div className="col-span-8"></div>
                 <div className="col-span-2">
                   <p className="text-xs sm:text-sm font-semibold">All Clients</p>
                 </div>
                 <div className="col-span-2">
                   <p className="text-xs sm:text-sm font-semibold">Assigned Only</p>
                 </div>
               </div>
               {permissions.map((permission, index) => (
                 <div key={index} className="grid grid-cols-12 gap-2">
                   <div className="col-span-8">
                     <p className="text-sm sm:text-base md:text-lg font-semibold">{permission}</p>
                   </div>
                   <div className="col-span-2">
                     <input
                       className="accent-[#0F91D2] size-4"
                       type="checkbox"
                       name={`permission${index + 1}AllClients`}
                       id={`permission${index + 1}AllClients`}
                     />
                   </div>
                   <div className="col-span-2">
                     <input
                       className="accent-[#0F91D2] size-4"
                       type="checkbox"
                       name={`permission${index + 1}AssignedOnly`}
                       id={`permission${index + 1}AssignedOnly`}
                     />
                   </div>
                 </div>
               ))}
             </div>
           </div>

         </div>
    </div>
  );
}
