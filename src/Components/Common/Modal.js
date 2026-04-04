function Modal({ text1, text2, button1text, button2text, button1handler, button2handler }) {

    return (
        <div
            className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm'
            onClick={button1handler}
        >
            <div
                className='relative w-full max-w-sm mx-4 bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/60'
                onClick={(e) => e.stopPropagation()}
            >
                {/* Heading */}
                <h2 className='text-lg font-semibold text-white mb-2'>
                    {text1}
                </h2>

                {/* Paragraph */}
                <p className='text-sm font-light text-white/50 mb-6'>
                    {text2}
                </p>

                {/* Actions */}
                <div className='flex items-center justify-end gap-3'>
                    <button
                        onClick={button1handler}
                        className='px-4 py-2 text-sm font-light text-white/60 hover:text-white border border-white/10 rounded-xl hover:border-white/25 hover:bg-white/5 transition-all duration-200 cursor-pointer'
                    >
                        {button1text}
                    </button>
                    <button
                        onClick={button2handler}
                        className='px-4 py-2 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:opacity-90 hover:scale-[0.98] active:scale-95 transition-all duration-200 shadow-md shadow-red-700/30 cursor-pointer'
                    >
                        {button2text}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
