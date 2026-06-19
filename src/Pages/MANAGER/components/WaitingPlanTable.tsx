import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Popconfirm, Space, Table, Tag, message } from "antd";
import Highlighter from "react-highlight-words";
import CareGiverSelectingModel from './CareGiverSelectingModel';
import CareTakerShowingModel from './CareTakerShowingModel';




interface WaitingPlanTableProps {
  reservationResult: any[];
  fetchPendingTasks: () => void;
}

const WaitingPlanTable = ({reservationResult,fetchPendingTasks }: WaitingPlanTableProps) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<any>(null);
  const [openCareGiverSelectingModel,setOpenCareGiverSelectingModel]=useState(false);
  const [selectedRequirment,setSelectedRequirment]=useState<any>(null);
  const [careTakerShowingModelOpen,setCareTakerShowingModelOpen]=useState(false);
  const [selectedCareTaker,setSelectedCareTaker]=useState<any>(null);




  const handleOpenModel=(rowData: any)=>{
    setSelectedRequirment(rowData?.requirementId)
      setOpenCareGiverSelectingModel(true);
  }


  const handleOpenCaretakerModel=(rowData: any)=>{
    setSelectedCareTaker(rowData?.caretakerId)
    setCareTakerShowingModelOpen(true);
  }


  





  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }: any) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Requirment ID",
      dataIndex: "requirementId",
      key: "resultID",
      width: "10%",
    },
    {
      title: "Requirment",
      dataIndex: "requirement",
      key: "requirement",
      width: "20%",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: "10%",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      width: "10%",
    },
    {
        title: "preffGender",
        dataIndex: "preffGender",
        key: "preffGender",
        width: "10%",
    },
    {
        title: "Care taker Info",
        dataIndex: "caretakerId",
        key: "caretakerId",
        width: "10%",
        render:(pic: any, rowdata: any)=>{
            return (
                <button onClick={()=>handleOpenCaretakerModel(rowdata)}>
                    View CareTaker
                </button>
            )
        }
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "10%",
        render:(pic: any)=>{
            return(
                <p>{pic=="assigned"?"Assigned/Not Accepted":pic}</p>
            )
        }
    },
    {
        title: "Assigned CareGiver",
        dataIndex: "assignee",
        key: "assignee",
        width: "10%",
    },
    {
      title: "Action",
      dataIndex: "userStatus",
      key: "userStatus",
      render: (pic: any, rowData: any) => {
        return (
            <div className="w-full  flex flex-row justify-between">
                <button onClick={()=>handleOpenModel(rowData)}>Reassign Care Giver</button>
            </div>
        );
      },
    },
  ];
  return (
    <>
    <CareTakerShowingModel selectedCareTaker={selectedCareTaker} careTakerShowingModelOpen={careTakerShowingModelOpen} setCareTakerShowingModelOpen={setCareTakerShowingModelOpen}/>
    <CareGiverSelectingModel fetchPendingTasks={fetchPendingTasks} selectedRequirment={selectedRequirment} openCareGiverSelectingModel={openCareGiverSelectingModel} setOpenCareGiverSelectingModel={setOpenCareGiverSelectingModel}/>
      <Table pagination={{pageSize:5}} columns={columns} dataSource={reservationResult} />
    </>
  );
};



export default WaitingPlanTable