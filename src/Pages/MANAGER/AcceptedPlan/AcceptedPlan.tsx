import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import NavbarComponent from "../../../components/Navbar/Navbar";
import NewTaskTable from "../components/NewTaskTable";
import axios from "axios";
import dayjs from "dayjs";
import WaitingPlanTable from "../components/WaitingPlanTable";
import AcceptedTable from "../components/AcceptedTable";

const AcceptedPlan = () => {
  const [finalizedRequirments, setFinalizedRequirments] = useState<any[]>([]);

  useEffect(() => {
    fetchFinalizedPlans();
  }, []);

  const fetchFinalizedPlans = async () => {
    try {
      const results = await axios.get(
        "http://localhost:5000/api/manager/finalizedPlans",
      );
      console.log("results assigned finalized ", results);
      const finalTaskArray = results.data?.map((res: any) => ({
        ...res,
        assignee: res?.userId + "  " + res?.firstName + " " + res?.lastName,
        startDate: dayjs(res?.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(res?.endDate).format("YYYY-MM-DD"),
      }));

      setFinalizedRequirments(finalTaskArray);
    } catch (error) {
      console.log("pending tasks fetching error! ", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <AcceptedTable
          fetchPendingTasks={fetchFinalizedPlans}
          reservationResult={finalizedRequirments}
        />
        {/* <NavbarComponent /> */}
      </div>
    </div>
  );
};

export default AcceptedPlan;
