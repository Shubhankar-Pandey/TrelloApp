



function CardWrapper({ stepNum, currentStep, children }) {
  const active = currentStep === stepNum;
  return (
    <div
      className={`flex-1 rounded-2xl border-2 p-5 flex flex-col gap-4 transition-all duration-300
        ${active
          ? "border-white bg-slate-900/70 shadow-lg shadow-red-900/30"
          : "border-transparent bg-[#0d1f2d]/40 opacity-40 pointer-events-none select-none"
        }`}
    >
      {children}
    </div>
  );
}


export default CardWrapper;