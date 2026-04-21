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


function DepartmentCard({ dept, apiCall }) {
  const [open, setOpen] = useState(false);
  const issues = dept.issues ?? [];
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth);

  const [modalData, setModalData] = useState(null);

  // ✏️ Write your create-issue logic here
  const handleCreateIssue = () => {
    navigate(`/creationBoard/${3}`);
  };

  function onUpdateIssue(issueId){
    // console.log(issueId);
    
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

  return ( 
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 overflow-hidden">
      {/* header row */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-700/30 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400/80" />
          <span className="text-sm font-semibold text-slate-200">{dept.title}</span>
          <span className="text-[11px] text-slate-500 bg-slate-700/60 border border-slate-600/40 px-2 py-0.5 rounded-full">
            {issues.length} issue{issues.length !== 1 ? "s" : ""}
          </span>
          {dept.privacy === "Public" ? (
            <HiOutlineGlobe className="text-slate-500 text-xs" />
          ) : (
            <HiOutlineLockClosed className="text-slate-500 text-xs" />
          )}
        </div>
        {open ? (
          <HiOutlineChevronUp className="text-slate-500 text-sm" />
        ) : (
          <HiOutlineChevronDown className="text-slate-500 text-sm" />
        )}
      </button>

      {/* issues list */}
      {open && (
        <div className="border-t border-slate-700/50 divide-y divide-slate-700/30">
          {issues.length === 0 ? (
            <p className="text-slate-600 text-xs text-center py-4">No issues in this department</p>
          ) : (
            issues.map((issue) => (
              <div
                key={issue._id}
                className="flex items-start justify-between gap-4 px-4 py-4 rounded-lg hover:bg-slate-800/40 transition"
              >
                {/* LEFT — Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-100 truncate">
                      {issue.title}
                    </p>
                    <StatusBadge status={issue.status} />
                  </div>

                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {issue.description}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
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
                      <span className="text-slate-600">Unassigned</span>
                    )}
                  </div>
                </div>

                {/* RIGHT — Actions (Hover Reveal) */}
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={() => onUpdateIssue(issue._id)}
                    className="text-xs text-blue-400 hover:scale-95 border-[1px] rounded-full border-blue-400 px-2 py-1 transition-all duration-200"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => onDeleteIssue(issue._id)}
                    className="text-xs text-red-400 hover:scale-95 border-[1px] rounded-full border-red-400 px-2 py-1 transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

          {/* create issue button — only visible when expanded */}
          <div className="px-4 py-3">
            <button
              onClick={handleCreateIssue}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                     border border-white text-white text-sm
                     transition-all duration-200 cursor-pointer bg-indigo-600
                     hover:bg-indigo-700 hover:scale-95"
            >
              <HiOutlinePlusSm className="text-sm" />
              Create Issue
            </button>
          </div>
        </div>
      )}
      {
        modalData && 
        <Modal 
          text1={modalData.text1}
          text2={modalData.text2}
          button1text={modalData.button1text}
          button2text={modalData.button2text}
          button1handler={modalData.button1handler}
          button2handler={modalData.button2handler}
        />
      }
    </div>
    
  );
}


export default DepartmentCard;