import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState, useEffect } from "react";
import CustomSelect from "../commonComponents/customSelect";
import Button from "../commonComponents/button";
import TableView from "./components/tableView";
import RightViewModal from "../commonComponents/rightViewModal";
import AddEditUser from "./components/addEditUser";
import { fetchUserDetails } from "@/utils/apiHandler/request";
import DeleteConfirmation from "../commonComponents/deleteConfirmation";
import { toast } from "react-toastify";

const MyTeamView = (props) => {
  const { userDetails, fetchCountries } = props;
  const { travel_Customers = [], meta = {} } = userDetails || {};

  const [travelCustomerValues, setTravelCustomerValues] =
    useState(travel_Customers);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const selectOptions = {
    options: [
      { value: "today", label: "Today" },
      { value: "yesterday", label: "Yesterday" },
    ],
    selectedOption: "today",
    onChange: () => {},
  };

  const [userViewPopup, setUserViewPopup] = useState({
    show: false,
    type: "",
  });
  const [editUserValues, setEditUserValues] = useState("");

  const [currentPage, setCurrentPage] = useState(meta.current_page);
  const [itemsPerPage, setItemsPerPage] = useState(meta.per_page);
  const [totalPages, setTotalPages] = useState(meta.last_page);
  const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const viewOptions = {
    options: [
      { value: "10", label: "10" },
      { value: "20", label: "20" },
      { value: "50", label: "50" },
    ],
    selectedOption: itemsPerPage?.toString(),
    onChange: (value) => {
      setItemsPerPage(parseInt(value));
      setCurrentPage(1);
    },
  };

  useEffect(() => {
    setTotalPages(meta.last_page);
    setCurrentPage(meta.current_page);
  }, [meta.last_page, meta.current_page]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageInputChange = (e) => {
    const page = parseInt(e.target.value) || 1;
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    } else if (page > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(1);
    }
  };

  const handleClosePopup = async (submit) => {
    if (submit?.submit) {
      const response = await fetchUserDetails();
      setTravelCustomerValues(response?.travel_Customers);
    }
    setUserViewPopup({ show: false, type: "" });
    setEditUserValues();
  };

  const handleEditClick = async (item) => {
    const response = await fetchUserDetails("", item?.id);
    setEditUserValues({ id: item?.id, ...response[0] });
    setUserViewPopup({
      show: true,
      type: "edit",
    });
  };

  const handleDeleteClick = async (item) => {
    setDeleteId(item?.id);
    setDeleteConfirmPopup(true);
  };

  const handleDeleteCall = async () => {
    setDeleteLoader(true);
    await fetchUserDetails("", deleteId, "DELETE");
    toast.success("User deleted successfully");
    const response = await fetchUserDetails();
    setTravelCustomerValues(response?.travel_Customers);
    setDeleteConfirmPopup(false);
    setDeleteLoader(false);
  };

  const headerClassName =
    "px-2 sm:px-4 py-2 border-b border-r border-[#eaeaf1] text-xs sm:text-sm font-medium text-[#323A70]";

  const rowClassName =
    "px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b border-r border-[#eaeaf1]";

  return (
    <div className="w-full h-full">
      <p className="pb-2 sm:pb-4 text-base sm:text-lg md:text-xl p-3 sm:p-4 font-semibold">
        My Team
      </p>
      <div className="bg-white p-3 sm:p-4 border-[1px] flex flex-col gap-3 sm:gap-4 border-[#eaeaf1] w-full h-full">
        <div className="border-[1px] border-[#eaeaf1] rounded-md">
          {/* Search and filter area */}
          {/* <div className="p-3 sm:p-4 border-b-[1px] border-[#eaeaf1] flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="border-[1px] flex gap-2 items-center px-1 py-[4px] w-full sm:w-[40%] border-[#eaeaf1] rounded-md">
              <IconStore.search className="size-4 stroke-[#130061] stroke-4" />
              <input
                type="text"
                placeholder="Search"
                className="outline-none placeholder:text-[#130061] text-xs sm:text-sm text-[#130061] w-full"
              />
            </div>
            <CustomSelect
              selectedValue={selectOptions.selectedOption}
              options={selectOptions.options}
              onSelect={selectOptions.onChange}
              textSize="text-xs sm:text-sm"
              buttonPadding="px-[10px] py-[4px]"
              dropdownItemPadding="py-1 pl-2 pr-6"
            />
          </div> */}

          {/* User count and pagination controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <p className="p-3 sm:p-4 text-xs sm:text-sm text-[#323A70] border-b-[1px] sm:border-b-0 sm:border-r-[1px] border-[#eaeaf1] font-medium w-full sm:w-auto">
              {meta.total} users
            </p>

            <div className="flex flex-wrap sm:flex-nowrap justify-between w-full sm:w-auto border-t-[1px] sm:border-t-0 sm:border-l-[1px] p-3 sm:pl-4 border-[#eaeaf1] items-center text-[#323A70] text-xs sm:text-sm">
              <div className="flex items-center mb-2 sm:mb-0 mr-0 sm:mr-4">
                <span className="mr-2">View</span>
                <CustomSelect
                  selectedValue={viewOptions.selectedOption}
                  options={viewOptions.options}
                  onSelect={viewOptions.onChange}
                  textSize="text-xs sm:text-sm"
                  buttonPadding="px-[10px] py-[4px]"
                  dropdownItemPadding="py-1 pl-2 pr-6"
                />
              </div>

              <div className="flex items-center mb-2 sm:mb-0 mr-0 sm:mr-4">
                <span className="mr-2">Page</span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={handlePageInputChange}
                  className="w-8 h-8 text-center border border-[#eaeaf1] rounded mx-1"
                />
                <span>of {totalPages}</span>
              </div>

              <div className="flex items-center sm:border-l border-[#eaeaf1] sm:pl-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-1 ${
                    currentPage === 1 ? "text-gray-300" : "hover:bg-gray-100"
                  }`}
                >
                  <IconStore.chevronLeft />
                </button>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-1 ${
                    currentPage === totalPages
                      ? "text-gray-300"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <IconStore.chevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4">
          <TableView
            headerClassName={headerClassName}
            rowClassName={rowClassName}
            currentUsers={travelCustomerValues}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
          <Button
            label="Invite User"
            onClick={() => {
              setUserViewPopup({
                show: true,
                type: "add",
              });
            }}
            classNames={{
              root: "bg-[#130061] text-white w-fit px-4 py-2 text-xs sm:text-sm",
            }}
          />
        </div>
      </div>
      <RightViewModal
        show={userViewPopup?.show}
        onClose={handleClosePopup}
        className={"w-[600px]"}
        outSideClickClose={true}
      >
        <AddEditUser
          type={userViewPopup?.type}
          userDetails={editUserValues}
          onClose={handleClosePopup}
          fetchCountries={fetchCountries}
        />
      </RightViewModal>

      {deleteConfirmPopup && (
        <DeleteConfirmation
          content="Are you sure you want to delete this user"
          handleClose={() => setDeleteConfirmPopup(false)}
          handleDelete={() => handleDeleteCall()}
          loader={deleteLoader}
        />
      )}
    </div>
  );
};

export default MyTeamView;
