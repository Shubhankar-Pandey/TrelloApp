import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import Department from './Department';

function Organisation({ organisation }) {

    const navigate = useNavigate();
    const sliderRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        const el = sliderRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    useEffect(() => {
        checkScroll();
        const el = sliderRef.current;
        if (el) el.addEventListener('scroll', checkScroll, { passive: true });
        window.addEventListener('resize', checkScroll);
        return () => {
            if (el) el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, [organisation.departments]);

    const scroll = (direction) => {
        const el = sliderRef.current;
        if (!el) return;
        const cardWidth = el.clientWidth / 3;
        el.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
    };

    return (
        <div className='flex flex-col gap-4 p-5 rounded-2xl border border-teal-500/25 bg-[#0d0d0d] hover:border-teal-400/40 transition-all duration-300 shadow-lg shadow-black/40'>

            {/* Top row: org info + button */}
            <div className='flex items-start justify-between gap-4'>
                <div className='flex flex-col gap-1 min-w-0'>
                    <h3 className='text-base font-semibold text-white leading-snug'>
                        {organisation.title}
                    </h3>
                    {organisation.description && (
                        <p className='text-sm text-white/40 line-clamp-1'>
                            {organisation.description}
                        </p>
                    )}
                    {/* Owner */}
                    <div className='flex items-center gap-1.5 mt-1'>
                        <div className='w-5 h-5 rounded-full bg-gradient-to-br from-[#5227FF] to-[#B19EEF] flex items-center justify-center text-[9px] font-bold text-white shrink-0'>
                            {organisation.ownerId?.firstName?.[0]?.toUpperCase()}
                        </div>
                        <span className='text-xs text-white/40'>
                            {organisation.ownerId?.firstName} {organisation.ownerId?.lastName}
                        </span>
                    </div>
                </div>

                {/* Navigate button */}
                <button
                    onClick={() => navigate(`/organisations/${organisation._id}`)}
                    className='shrink-0 px-4 py-2 text-xs font-medium text-teal-300 border border-teal-500/30 rounded-xl bg-teal-500/8 hover:bg-teal-500/15 hover:border-teal-400/60 transition-all duration-200 cursor-pointer whitespace-nowrap'
                >
                    See full details of organisation
                </button>
            </div>

            {/* Thin divider */}
            <div className='h-px w-full bg-gradient-to-r from-teal-500/20 via-indigo-500/10 to-transparent' />

            {/* Department slider */}
            {organisation.departments.length === 0 ? (
                <p className='text-xs text-white/20 px-1'>No departments yet.</p>
            ) : (
                <div className='flex items-stretch gap-2'>

                    {/* Left arrow */}
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={`text-white shrink-0 w-8 flex items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer
                            ${canScrollLeft
                                ? 'border-teal-500/25 text-teal-400 hover:border-teal-400/50 hover:bg-teal-500/10'
                                : 'border-white/5 text-white/15 cursor-not-allowed'
                            }`}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    {/* Scrollable track */}
                    <div
                        ref={sliderRef}
                        className='flex-1 overflow-x-auto flex gap-3'
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {organisation.departments.map((department, index) => (
                            <div
                                key={index}
                                className='flex-shrink-0'
                                style={{ width: 'calc(33.333% - 8px)' }}
                            >
                                <Department department={department} />
                            </div>
                        ))}
                    </div>

                    {/* Right arrow */}
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={`text-white shrink-0 w-8 flex items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer
                            ${canScrollRight
                                ? 'border-teal-500/25 text-teal-400 hover:border-teal-400/50 hover:bg-teal-500/10'
                                : 'border-white/5 text-white/15 cursor-not-allowed'
                            }`}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                </div>
            )}
        </div>
    );
}

export default Organisation;
