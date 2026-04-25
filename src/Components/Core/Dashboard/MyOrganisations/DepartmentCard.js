import StatusBadge from "../StatusBadge";
import { useState } from "react";
import {
  HiOutlineLockClosed,
  HiOutlineGlobe,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlinePlusSm,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Modal from "../../../Common/Modal";
import { deleteIssue } from "../../../../Services/Operations/issueAPI";
import { useSelector } from "react-redux";
import {toast} from "react-hot-toast";
import UpdateModal from "./UpdateModal";
import { deleteDepartment } from "../../../../Services/Operations/departmentAPI";
import { updateIssue } from "../../../../Services/Operations/issueAPI";
import { updateDepartment } from "../../../../Services/Operations/departmentAPI"


function DepartmentCard({ dept, apiCall }) {
  const [open, setOpen] = useState(false);
  const issues = dept.issues ?? [];
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth);

  const [modalData, setModalData] = useState(null);
  const [updateModal, setUpdateModal] = useState(null);


  const handleCreateIssue = () => {
    navigate("/creationBoard", {state : {step : 3}});
  };

  function onUpdateIssue(issue){
    setUpdateModal({
      heading : "Update Issue",
      title : issue.title, 
      description : issue.description, 
      privacy : issue.privacy,
      makeChanges : async(title, description, privacy) => {
        try{
            const response = await updateIssue(token, issue._id, title, description, privacy);
            if(!response){
                toast.error("Request failed");
                return;
            }
            toast.success(response.message);
            setUpdateModal(null);
            apiCall();
        }
        catch(error){
            console.log(error);
            toast.error(error.message);
        }
      }
    })
  }

  function onUpdateDepartment(){
    setUpdateModal({
      heading : "Update Department",
      title : dept.title, 
      description : dept.description, 
      privacy : dept.privacy,
      makeChanges : async(title, description, privacy) => {
        try{
            const response = await updateDepartment(token, dept._id, title, description, privacy);
            if(!response){
                toast.error("Request failed");
                return;
            }
            toast.success(response.message);
            setUpdateModal(null);
            apiCall();
        }
        catch(error){
          console.log(error);
          toast.error(error.message);
        }
      }
    })
  }

  async function handleDeleteIssue(issueId){
    try{
      const response = await deleteIssue(issueId, token);
      if(!response || !response.data.success){
        toast.error("Request failed");
      }
      apiCall();
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  function onDeleteIssue(issueId){
    setModalData({
      text1 : "Delete Issue",
      text2 : "Are you sure to delete this issue",
      button1text : "Cancel",
      button2text : "Delete",
      button1handler : () => {setModalData(null)},
      button2handler : () => {handleDeleteIssue(issueId)},
    })
  }

  async function handleDeleteDepartment(){
    try{
      const departmentId = dept._id;
      const response = await deleteDepartment(token, departmentId);
      if(!response){
        toast.error("Request failed");
        return;
      }
      toast.success("Department deleted successfully");
      apiCall();
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  function onDeleteDepartment(){
    setModalData({
      text1 : "Delete Department",
      text2 : "Are you sure to delete this department",
      button1text : "Cancel",
      button2text : "Delete",
      button1handler : () => {setModalData(null)},
      button2handler : () => {handleDeleteDepartment()},
    })
  }


  return ( 
  <>
    <div className="rounded-2xl border border-slate-700/40 bg-slate-900/60 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* HEADER */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-800/60 transition-all"
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm" />

          <span className="text-sm font-semibold text-slate-100 tracking-wide">
            {dept.title}
          </span>

          <span className="text-[11px] text-slate-400 bg-slate-800 border border-slate-600/40 px-2 py-0.5 rounded-full">
            {issues.length} issue{issues.length !== 1 ? "s" : ""}
          </span>

          {dept.privacy === "Public" ? (
            <HiOutlineGlobe className="text-slate-400 text-sm" />
          ) : (
            <HiOutlineLockClosed className="text-slate-400 text-sm" />
          )}
        </div>

        {open ? (
          <HiOutlineChevronUp className="text-slate-400 text-lg" />
        ) : (
          <HiOutlineChevronDown className="text-slate-400 text-lg" />
        )}
      </button>

      {/* BODY */}
      {open && (
        <div className="border-t border-slate-700/40 divide-y divide-slate-800">
          
          {issues.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-6">
              No issues in this department
            </p>
          ) : (
            issues.map((issue) => (
              <div
                key={issue._id}
                className="group flex items-start justify-between gap-4 px-5 py-4 hover:bg-slate-800/40 transition-all"
              >
                
                {/* LEFT */}
                <div className="flex-1 min-w-0">
                  
                  {/* TITLE */}
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white truncate">
                      {issue.title}
                    </p>
                    <StatusBadge status={issue.status} />
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {issue.description}
                  </p>

                  {/* META */}
                  <div className="flex items-center flex-wrap gap-2 mt-2 text-[11px] text-slate-500">
                    <span>
                      {new Date(issue.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                    {issue.assignedTo ? (
                      <span className="text-green-400 bg-green-500/10 border border-green-700 px-2 py-0.5 rounded-full">
                        {issue.assignedTo.firstName} {issue.assignedTo.lastName}
                      </span>
                    ) : (
                      <span className="text-slate-600 italic">Unassigned</span>
                    )}
                  </div>

                  {/* PRIVACY BADGE */}
                  <span
                    className={`inline-block mt-3 text-[11px] px-2 py-1 rounded-md border ${
                      issue.privacy === "public" || issue.privacy === "Public"
                        ? "border-blue-500 text-blue-400 bg-blue-500/10 capitalize"
                        : "border-red-500 text-red-400 bg-red-500/10 capitalize"
                    }`}
                  >
                    {issue.privacy}
                  </span>
                </div>

                {/* RIGHT ACTIONS */}
                <div className="flex flex-col gap-2 transition-all duration-200">
                  
                  <button
                    onClick={() => onUpdateIssue(issue)}
                    className="px-3 py-1 text-xs rounded-lg border border-blue-500/60 text-blue-400 
                              hover:bg-blue-500/20 hover:scale-95 transition"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => onDeleteIssue(issue._id)}
                    className="px-3 py-1 text-xs rounded-lg border border-red-500/60 text-red-400 
                              hover:bg-red-500/20 hover:scale-95 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

          {/* CREATE BUTTON */}
          <div className="px-5 py-4 flex justify-end gap-x-4">
            <button onClick={() => onUpdateDepartment()}
             className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                        text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600
                        hover:from-indigo-600 hover:to-indigo-700
                        transition-all duration-200 shadow-sm hover:shadow-md">
              Update Department
            </button>
            <button onClick={() => onDeleteDepartment()}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                        text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600
                        hover:from-indigo-600 hover:to-indigo-700
                        transition-all duration-200 shadow-sm hover:shadow-md">
              Delete Department
            </button>
            <button
              onClick={handleCreateIssue}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                        text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700
                        transition-all duration-200 shadow-sm hover:shadow-md border border-white"
            >
              <HiOutlinePlusSm className="text-base" />
              New Issue
            </button>
          </div>
        </div>
      )}
    </div>
    {/* MODALS */}
      {modalData && <Modal {...modalData} />}
      {
        updateModal && <UpdateModal updateModal = {updateModal} setUpdateModal = {setUpdateModal}/>
      }
  </>
);
}


export default DepartmentCard;