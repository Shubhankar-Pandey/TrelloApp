// components/SendRequestForm.jsx
import { useState } from "react";

function SendRequestFormForOwner({ employees, ownerData, onSendRequest }) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [selectedIssueId, setSelectedIssueId] = useState("");
  const [message, setMessage] = useState("");

  // Derived data based on selections
  const selectedOrg = ownerData?.organisations?.find(
    (org) => org._id === selectedOrgId
  );

  const departments = selectedOrg?.departments ?? [];

  const selectedDept = departments.find((d) => d._id === selectedDeptId);

  const openIssues =
    selectedDept?.issues?.filter((i) => i.status === "Open") ?? [];

  function handleOrgChange(orgId) {
    setSelectedOrgId(orgId);
    setSelectedDeptId("");
    setSelectedIssueId("");
  }

  function handleDeptChange(deptId) {
    setSelectedDeptId(deptId);
    setSelectedIssueId("");
  }

  function handleSubmit() {
    // TODO: implement send request logic
    onSendRequest({
      to: selectedEmployeeId,
      issueId: selectedIssueId,
      message,
      organisationId: selectedOrgId,
      departmentId: selectedDeptId,
    });
  }

  const isFormValid =
    selectedEmployeeId && selectedOrgId && selectedDeptId && selectedIssueId;

  const selectClass =
    "w-full bg-[#0e0e16] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-colors appearance-none cursor-pointer";

  return (
    <div className="flex flex-col gap-5">
      {/* To: Employee */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-slate-500 font-medium">To</label>
        <div className="relative">
          <select
            value={selectedEmployeeId}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
            className={selectClass}
          >
            <option value="" disabled>
              — Search Employee —
            </option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.firstName} {emp.lastName}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]">
            ▼
          </span>
        </div>
      </div>

      {/* Select Issue section */}
      <div className="flex flex-col gap-3">
        <p className="text-xs text-slate-400 font-semibold tracking-wide border-b border-white/5 pb-2">
          Select Issue
        </p>

        {/* Organisation */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-500 w-24 shrink-0">
            Organisation
          </label>
          <div className="relative flex-1">
            <select
              value={selectedOrgId}
              onChange={(e) => handleOrgChange(e.target.value)}
              className={selectClass}
            >
              <option value="" disabled>
                Select Organisation
              </option>
              {ownerData?.organisations?.map((org) => (
                <option key={org._id} value={org._id}>
                  {org.title}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]">
              ▼
            </span>
          </div>
        </div>

        {/* Department */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-500 w-24 shrink-0">
            Department
          </label>
          <div className="relative flex-1">
            <select
              value={selectedDeptId}
              onChange={(e) => handleDeptChange(e.target.value)}
              disabled={!selectedOrgId}
              className={`${selectClass} disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.title}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]">
              ▼
            </span>
          </div>
        </div>

        {/* Issue */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-500 w-24 shrink-0">Issue</label>
          <div className="relative flex-1">
            <select
              value={selectedIssueId}
              onChange={(e) => setSelectedIssueId(e.target.value)}
              disabled={!selectedDeptId}
              className={`${selectClass} disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <option value="" disabled>
                Search Issue
              </option>
              {openIssues.length === 0 && selectedDeptId ? (
                <option disabled>No open issues</option>
              ) : (
                openIssues.map((issue) => (
                  <option key={issue._id} value={issue._id}>
                    {issue.title}
                  </option>
                ))
              )}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]">
              ▼
            </span>
          </div>
        </div>

        {/* Message */}
        <div className="flex items-start gap-3">
          <label className="text-xs text-slate-500 w-24 shrink-0 pt-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
            rows={4}
            className="flex-1 bg-[#0e0e16] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
          />
        </div>
      </div>

      {/* Send Button */}
      <button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className="w-full py-2.5 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500 hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Send Request
      </button>
    </div>
  );
}

export default SendRequestFormForOwner;
