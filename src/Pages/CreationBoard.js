import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getAllDetailOfOwner } from "../Services/Operations/ownerAPI";
import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import {createOrganisation} from "../Services/Operations/organisationAPI";
import CardWrapper from "../Components/Core/CreationBoard/CardWrapper";
import PrivacyRadio from "../Components/Core/CreationBoard/PrivacyRadio";
import {createDepartment} from "../Services/Operations/departmentAPI";
import {createIssue} from "../Services/Operations/issueAPI"



// ── Moved OUTSIDE to prevent remount on every render ──────────
const inputCls =
  "w-full bg-black text-white placeholder-gray-400 border border-[#2a5a7a] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelCls = "block text-sm font-medium text-gray-300 mb-1";
const errorCls = "text-red-400 text-xs mt-1";


// ─────────────────────────────────────────────────────────────

function CreationBoard() {

    const location = useLocation();
    const step = location.state?.step || 1;
    const [currentStep, setCurrentStep] = useState(step);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const [result, setResult] = useState(null);
    const navigate = useNavigate();
    


    // ── React Hook Forms ────────────────────────────────────────
    const {
        register: registerOrg,
        handleSubmit: handleSubmitOrg,
        watch: watchOrg,
        setValue: setValueOrg,
        formState: { errors: errorsOrg },
    } = useForm({ defaultValues: { title: "", description: "", privacy: "Public" } });

    const {
        register: registerDept,
        handleSubmit: handleSubmitDept,
        watch: watchDept,
        setValue: setValueDept,
        formState: { errors: errorsDept },
    } = useForm({ defaultValues: { title: "", description: "", privacy: "Public", organisationId: "" } });

    const {
        register: registerIssue,
        handleSubmit: handleSubmitIssue,
        watch: watchIssue,
        setValue: setValueIssue,
        formState: { errors: errorsIssue },
    } = useForm({ defaultValues: { title: "", description: "", privacy: "Public", organisationId: "", departmentId: "" } });

    // Watch values needed for controlled/derived UI
    const orgPrivacy = watchOrg("privacy");
    const deptPrivacy = watchDept("privacy");
    const issuePrivacy = watchIssue("privacy");
    const issueOrgId = watchIssue("organisationId");

    // Departments filtered by selected org in issue form
    const selectedOrgDepts =
        result?.organisations?.find((org) => org._id === issueOrgId)?.departments || [];

    // ── Fetch Data ──────────────────────────────────────────────
    async function fetchData() {
        setLoading(true);
        try {
        const response = await getAllDetailOfOwner(token);
        if (!response) {
            toast.error("Not able to fetch data");
            return;
        }
        setResult(response.data);
        } catch (error) {
        console.log("error in creation board in fetchData : ", error);
        toast.error("Something went wrong");
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        if (currentStep === 1) return;
        fetchData();
    }, [currentStep]);


    // ── Submit Handlers ─────────────────────────────────────────
    async function handleOrgSubmit(data) {
        // console.log("Org Form Data:", data);
        setLoading(true);
        try{
            const response = await createOrganisation(token, data.title, data.description, data.privacy);
            if(!response){
                toast.error("Failed to create organisation");
                return;
            }
            toast.success("Organisation created successfully");
            setCurrentStep(2);
        }
        catch(error){
            console.log(error);
            toast.error("Failed to create organisation");
        }
        finally{
            setLoading(false);
        }
    }

    async function handleDeptSubmit(data) {
        // console.log("Dept Form Data:", data);
        setLoading(true);
        try{
            const response = await createDepartment(token, data.title, data.description, data.privacy, data.organisationId);
            if(!response){
                toast.error("Failed to create department");
                return;
            }
            toast.success("Department created successfully");
            setCurrentStep(3);
        }
        catch(error){
            console.log(error);
            toast.error("Failed to create department");
        }
        finally{
            setLoading(false);
        }
    }



    async function handleIssueSubmit(data) {
        // console.log("Issue Form Data:", data);
        setLoading(true);
        try{
            const response = await createIssue(token, data.title, data.description, data.privacy, data.departmentId, data.organisationId);
            if(!response){
                toast.error("Failed to create issue");
                return;
            }
            toast.success("Issue created successfully");
            navigate(`/myOrganisations`);
        }
        catch(error){
            console.log(error);
            toast.error("Failed to create issue");
        }
        finally{
            setLoading(false);
        }
    }



    // ── Stepper config ──────────────────────────────────────────
    const steps = [
        { number: 1, label: "Create Organisation" },
        { number: 2, label: "Create Department" },
        { number: 3, label: "Create Issues" },
    ];

    return (
        <div className="min-h-screen bg-black text-white py-12 px-8">
        <h1 className="text-3xl ml-2 mb-2">Creation Board</h1>
        <div className="mb-8 h-px w-full bg-gradient-to-r from-indigo-700 via-indigo-500 to-transparent" />
        <div className="flex justify-evenly mb-10">
            <button className={currentStep === 1 ? "bg-yellow-300 text-black border-2 border-yellow-600 p-2 rounded-full text-yellow font-bold"
             : "border-[1px] border-gray-500 text-gray-300 p-2 rounded-full hover:scale-95 transition-all duration-200"}
                    onClick={() => setCurrentStep(1)}>
                Create Organisation
            </button>
            <button className={currentStep === 2 ? "bg-yellow-300 text-black border-2 border-yellow-600 p-2 rounded-full text-yellow font-bold"
             : "border-[1px] border-gray-500 text-gray-300 p-2 rounded-full hover:scale-95 transition-all duration-200"}
                    onClick={() => setCurrentStep(2)}>
                Create Department
            </button>
            <button className={currentStep === 3 ? "bg-yellow-300 text-black border-2 border-yellow-600 p-2 rounded-full text-yellow font-bold"
             : "border-[1px] border-gray-500 text-gray-300 p-2 rounded-full hover:scale-95 transition-all duration-200"}
                    onClick={() => setCurrentStep(3)}>
                Create Issue
            </button>
        </div>
        <div className="mb-8 h-px w-full bg-gradient-to-r from-indigo-700 via-indigo-500 to-transparent" />

        {/* ── Stepper ── */}
        <div className="flex items-center justify-center gap-0 mb-10 mt-10">
            {steps.map((s, i) => (
            <div key={s.number} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-bold transition-all
                    ${currentStep === s.number
                        ? "border-yellow-300 bg-transparent text-yellow-300"
                        : "border-gray-600 text-gray-600"
                    }`}
                >
                    {s.number}
                </div>
                <span className={`text-xs text-center w-24 transition-all ${currentStep === s.number ? "text-white" : "text-gray-600"}`}>
                    {s.label}
                </span>
                </div>
                {i < steps.length - 1 && (
                <div className="w-24 border-t-2 border-dashed border-gray-600 mb-5 mx-1" />
                )}
            </div>
            ))}
        </div>

        {loading && <p className="text-center text-gray-400 mb-4 text-sm">Loading data...</p>}

        {/* ── Three Forms ── */}
        <div className="flex gap-4 items-start">

            {/* Step 1 — Create Organisation */}
            <CardWrapper stepNum={1} currentStep={currentStep}>
            <h2 className="text-base font-semibold text-gray-200">Create Organisation</h2>
            <div>
                <label className={labelCls}>title</label>
                <input
                className={inputCls}
                placeholder="Organisation title"
                {...registerOrg("title", { required: "Title is required" })}
                />
                {errorsOrg.title && <p className={errorCls}>{errorsOrg.title.message}</p>}
            </div>
            <div>
                <label className={labelCls}>description</label>
                <textarea
                className={`${inputCls} resize-none h-16`}
                placeholder="Description"
                {...registerOrg("description", { required: "Description is required" })}
                />
                {errorsOrg.description && <p className={errorCls}>{errorsOrg.description.message}</p>}
            </div>
            <div>
                <label className={labelCls}>Privacy</label>
                <PrivacyRadio
                name="privacy-org"
                value={orgPrivacy}
                onChange={(val) => setValueOrg("privacy", val)}
                />
            </div>
            <button
                onClick={handleSubmitOrg(handleOrgSubmit)}
                className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 border border-white text-white font-semibold py-2 rounded-lg transition-colors"
            >
                Submit
            </button>
            </CardWrapper>

            {/* Step 2 — Create Department */}
            <CardWrapper stepNum={2} currentStep={currentStep}>
            <h2 className="text-base font-semibold text-gray-200">Create Department</h2>
            <div>
                <label className={labelCls}>title</label>
                <input
                className={inputCls}
                placeholder="Department title"
                {...registerDept("title", { required: "Title is required" })}
                />
                {errorsDept.title && <p className={errorCls}>{errorsDept.title.message}</p>}
            </div>
            <div>
                <label className={labelCls}>description</label>
                <textarea
                className={`${inputCls} resize-none h-16`}
                placeholder="Description"
                {...registerDept("description", { required: "Description is required" })}
                />
                {errorsDept.description && <p className={errorCls}>{errorsDept.description.message}</p>}
            </div>
            <div>
                <label className={labelCls}>Privacy</label>
                <PrivacyRadio
                name="privacy-dept"
                value={deptPrivacy}
                onChange={(val) => setValueDept("privacy", val)}
                />
            </div>
            <div>
                <label className={labelCls}>Organisation</label>
                <select
                className={inputCls}
                {...registerDept("organisationId", { required: "Please select an organisation" })}
                >
                <option value="">-- Select Organisation --</option>
                {result?.organisations?.map((org) => (
                    <option key={org._id} value={org._id}>{org.title}</option>
                ))}
                </select>
                {errorsDept.organisationId && <p className={errorCls}>{errorsDept.organisationId.message}</p>}
            </div>
            <button
                onClick={handleSubmitDept(handleDeptSubmit)}
                className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 border border-white text-white font-semibold py-2 rounded-lg transition-colors"
            >
                Submit
            </button>
            </CardWrapper>

            {/* Step 3 — Create Issues */}
            <CardWrapper stepNum={3} currentStep={currentStep}>
            <h2 className="text-base font-semibold text-gray-200">Create Issues</h2>
            <div>
                <label className={labelCls}>title</label>
                <input
                className={inputCls}
                placeholder="Issue title"
                {...registerIssue("title", { required: "Title is required" })}
                />
                {errorsIssue.title && <p className={errorCls}>{errorsIssue.title.message}</p>}
            </div>
            <div>
                <label className={labelCls}>description</label>
                <textarea
                className={`${inputCls} resize-none h-16`}
                placeholder="Description"
                {...registerIssue("description", { required: "Description is required" })}
                />
                {errorsIssue.description && <p className={errorCls}>{errorsIssue.description.message}</p>}
            </div>
            <div>
                <label className={labelCls}>Privacy</label>
                <PrivacyRadio
                name="privacy-issue"
                value={issuePrivacy}
                onChange={(val) => setValueIssue("privacy", val)}
                />
            </div>
            <div>
                <label className={labelCls}>Select Organisation</label>
                <select
                className={inputCls}
                {...registerIssue("organisationId", { required: "Please select an organisation" })}
                onChange={(e) => {
                    setValueIssue("organisationId", e.target.value);
                    setValueIssue("departmentId", "");
                }}
                >
                <option value="">-- Select Organisation --</option>
                {result?.organisations?.map((org) => (
                    <option key={org._id} value={org._id}>{org.title}</option>
                ))}
                </select>
                {errorsIssue.organisationId && <p className={errorCls}>{errorsIssue.organisationId.message}</p>}
            </div>
            <div>
                <label className={labelCls}>Select Department</label>
                <select
                className={inputCls}
                disabled={!issueOrgId}
                {...registerIssue("departmentId", { required: "Please select a department" })}
                >
                <option value="">-- Select Department --</option>
                {selectedOrgDepts.map((dept) => (
                    <option key={dept._id} value={dept._id}>{dept.title}</option>
                ))}
                </select>
                {errorsIssue.departmentId && <p className={errorCls}>{errorsIssue.departmentId.message}</p>}
            </div>
            <button
                onClick={handleSubmitIssue(handleIssueSubmit)}
                className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 border border-white text-white font-semibold py-2 rounded-lg transition-colors"
            >
                Submit
            </button>
            </CardWrapper>

        </div>
        </div>
    );
}

export default CreationBoard;