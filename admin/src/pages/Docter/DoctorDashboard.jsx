import React, { useContext, useEffect } from "react";
import { DocterContext } from "../../context/DocterContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const {
    dashdata,
    getDashdData,
    setDashData,
    dtoken,
    cancelAppointment,
    completeAppointment,
  } = useContext(DocterContext);
  const { currency, slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (dtoken) {
      getDashdData();
    }
  }, [dtoken]);

  return (
    dashdata && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-150 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-500">
                {currency}
                {dashdata.earning}
              </p>
              <p className="text-gray-400">doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-150 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-500">
                {dashdata.appointments}
              </p>
              <p className="text-gray-400">appointment</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-150 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-500">
                {dashdata.patients}
              </p>
              <p className="text-gray-400">patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white ">
          <div className="flex items-center gap-2.5 px-4 py-10 mt-10 rounded-t border ">
            <img src={assets.list_icon} alt="" />
            <p>latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0 ">
            {dashdata.latestAppointment.map((item, index) => (
              <div
                className="flex items-center px-3 py-6 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-700 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-500">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-sm font-bold"> Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-600  test-sm font-bold">Completed</p>
                ) : (
                  <div className="flex">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
