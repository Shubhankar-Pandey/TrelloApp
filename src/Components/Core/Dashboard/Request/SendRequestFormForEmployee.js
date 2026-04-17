// components/SendRequestFormForEmployee.jsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

/**
 * Props:
 *  - issuesData: array from getAllPublicOpenIssues (organisations with departments & issues)
 *  - onSendRequest: ({ organisationId, departmentId, issueId, message }) => void
 */
function SendRequestFormForEmployee({ issuesData = [], onSendRequest }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const selectedOrgId = watch("organisationId");
  const selectedDeptId = watch("departmentId");

  const [departments, setDepartments] = useState([]);
  const [issues, setIssues] = useState([]);

  // ── Cascade: org → departments ───────────────────────────────────────────
  useEffect(() => {
    if (!selectedOrgId) {
      setDepartments([]);
      setIssues([]);
      setValue("departmentId", "");
      setValue("issueId", "");
      return;
    }
    const org = issuesData.find((o) => o._id === selectedOrgId);
    setDepartments(org?.departments || []);
    setIssues([]);
    setValue("departmentId", "");
    setValue("issueId", "");
  }, [selectedOrgId]);

  // ── Cascade: dept → issues ────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedDeptId) {
      setIssues([]);
      setValue("issueId", "");
      return;
    }
    const dept = departments.find((d) => d._id === selectedDeptId);
    setIssues(dept?.issues || []);
    setValue("issueId", "");
  }, [selectedDeptId, departments]);

  // ── Submit ────────────────────────────────────────────────────────────────
  async function onSubmit(data) {
    await onSendRequest({
      organisationId: data.organisationId,
      departmentId: data.departmentId,
      issueId: data.issueId,
      message: data.message,
    });
    reset();
    setDepartments([]);
    setIssues([]);
  }

  const selectClass =
    "w-full bg-slate-800/80 border border-white/10 text-slate-200 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 appearance-none disabled:opacity-40 disabled:cursor-not-allowed";

  const labelClass = "block text-xs font-medium text-slate-400 mb-1.5";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Organisation */}
      <div>
        <label className={labelClass}>Organisation</label>
        <div className="relative">
          <select
            {...register("organisationId", { required: "Please select an organisation" })}
            className={selectClass}
            defaultValue=""
          >
            <option value="" disabled>
              Select organisation…
            </option>
            {issuesData.map((org) => (
              <option key={org._id} value={org._id}>
                {org.title}
              </option>
            ))}
          </select>
          <ChevronIcon />
        </div>
        {errors.organisationId && (
          <p className="mt-1 text-xs text-red-400">{errors.organisationId.message}</p>
        )}
      </div>

      {/* Department */}
      <div>
        <label className={labelClass}>Department</label>
        <div className="relative">
          <select
            {...register("departmentId", { required: "Please select a department" })}
            className={selectClass}
            defaultValue=""
            disabled={departments.length === 0}
          >
            <option value="" disabled>
              {selectedOrgId ? "Select department…" : "Select organisation first"}
            </option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.title}
              </option>
            ))}
          </select>
          <ChevronIcon />
        </div>
        {errors.departmentId && (
          <p className="mt-1 text-xs text-red-400">{errors.departmentId.message}</p>
        )}
      </div>

      {/* Issue */}
      <div>
        <label className={labelClass}>Issue</label>
        <div className="relative">
          <select
            {...register("issueId", { required: "Please select an issue" })}
            className={selectClass}
            defaultValue=""
            disabled={issues.length === 0}
          >
            <option value="" disabled>
              {selectedDeptId
                ? issues.length === 0
                  ? "No issues in this department"
                  : "Select issue…"
                : "Select department first"}
            </option>
            {issues.map((issue) => (
              <option key={issue._id} value={issue._id}>
                {issue.title}
              </option>
            ))}
          </select>
          <ChevronIcon />
        </div>
        {errors.issueId && (
          <p className="mt-1 text-xs text-red-400">{errors.issueId.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>Message</label>
        <textarea
          {...register("message", { required: "Please enter a message" })}
          rows={3}
          placeholder="Describe your request…"
          className="w-full bg-slate-800/80 border border-white/10 text-slate-200 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 resize-none placeholder:text-slate-600"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-200"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send Request
          </>
        )}
      </button>
    </form>
  );
}

function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default SendRequestFormForEmployee;
