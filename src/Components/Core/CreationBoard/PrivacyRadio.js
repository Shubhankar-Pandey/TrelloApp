



function PrivacyRadio({ value, onChange, name }) {
  return (
    <div className="flex gap-6 bg-black border border-[#2a5a7a] rounded-lg px-4 py-2">
      {["Public", "Private"].map((opt) => (
        <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-white">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="accent-red-400"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}


export default PrivacyRadio;