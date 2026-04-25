import { useState } from "react";

function UpdateModal({ updateModal, setUpdateModal }) {
    const [fields, setFields] = useState({
        title: updateModal.title || "",
        description: updateModal.description || "",
        privacy: updateModal.privacy || "public",
    });

    async function handleMakeChanges() {
        await updateModal.makeChanges(fields.title, fields.description, fields.privacy);
    }

    function handleClose() {
        setUpdateModal(null);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
        <div className="relative w-full max-w-lg bg-black border border-white rounded-2xl p-8 shadow-2xl animate-slide-up">

            {/* Header */}
            <div className="flex items-start justify-between mb-5">
            <div>
                <h2 className="text-lg font-semibold text-[#f0f0f5] tracking-tight">
                {updateModal.heading}
                </h2>
            </div>

            {/* Close Button */}
            <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2a2a32] bg-[#1e1e26] text-[#888898] hover:bg-[#2a2a36] hover:border-[#3a3a48] hover:text-[#f0f0f5] transition-all text-sm"
            >
                ✕
            </button>
            </div>

            {/* Title */}
            <div className="mb-5">
            <label className="block text-[11px] font-medium text-[#888898] uppercase tracking-widest mb-2">
                Title
            </label>
            <input
                type="text"
                value={fields.title}
                onChange={(e) => setFields((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Issue title..."
                className="w-full bg-[#1e1e26] border border-[#2a2a32] rounded-xl text-[#e8e8f0] text-sm px-4 py-3 outline-none focus:border-[#5b5bef] focus:ring-2 focus:ring-[#5b5bef]/20 transition-all placeholder:text-[#444455]"
            />
            </div>

            {/* Description */}
            <div className="mb-5">
            <label className="block text-[11px] font-medium text-[#888898] uppercase tracking-widest mb-2">
                Description
            </label>
            <textarea
                value={fields.description}
                onChange={(e) => setFields((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the issue..."
                rows={4}
                className="w-full bg-[#1e1e26] border border-[#2a2a32] rounded-xl text-[#e8e8f0] text-sm px-4 py-3 outline-none focus:border-[#5b5bef] focus:ring-2 focus:ring-[#5b5bef]/20 transition-all resize-none placeholder:text-[#444455] leading-relaxed"
            />
            </div>

            {/* Privacy */}
            <div className="mb-7">
            <label className="block text-[11px] font-medium text-[#888898] uppercase tracking-widest mb-2">
                Privacy
            </label>
            <select
                value={fields.privacy}
                onChange={(e) => setFields((prev) => ({ ...prev, privacy: e.target.value }))}
                className="w-full bg-[#1e1e26] border border-[#2a2a32] rounded-xl text-[#e8e8f0] text-sm px-4 py-3 outline-none focus:border-[#5b5bef] focus:ring-2 focus:ring-[#5b5bef]/20 transition-all"
            >
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>
            </div>

            {/* Footer */}
            <div className="flex justify-end">
            <button
                onClick={handleMakeChanges}
                className="bg-[#5b5bef] hover:bg-[#4a4adc] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-[#5b5bef]/30 hover:shadow-[#5b5bef]/45 hover:-translate-y-0.5 active:translate-y-0"
            >
                Make Changes
            </button>
            </div>
        </div>
        </div>
    );
}

export default UpdateModal;