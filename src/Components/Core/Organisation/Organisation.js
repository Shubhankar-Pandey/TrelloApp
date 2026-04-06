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

        el.scrollBy({
            left: direction === 'left' ? -cardWidth : cardWidth,
            behavior: 'smooth',
        });
    };

    return (
        <div className='flex flex-col gap-4 p-5 rounded-2xl border border-gray-200 bg-white hover:shadow-md transition-all'>

            {/* Top */}
            <div className='flex items-start justify-between gap-4'>

                <div className='flex flex-col gap-1 min-w-0'>
                    <h3 className='text-base font-semibold text-gray-900'>
                        {organisation.title}
                    </h3>

                    {organisation.description && (
                        <p className='text-sm text-gray-500 line-clamp-1'>
                            {organisation.description}
                        </p>
                    )}

                    {/* Owner */}
                    <div className='flex items-center gap-2 mt-1'>
                        <div className='w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white font-bold'>
                            {organisation.ownerId?.firstName?.[0]?.toUpperCase()}
                        </div>
                        <span className='text-xs text-gray-500'>
                            {organisation.ownerId?.firstName} {organisation.ownerId?.lastName}
                        </span>
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={() => navigate(`/organisations/${organisation._id}`)}
                    className='px-4 py-2 text-xs font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition'
                >
                    View
                </button>
            </div>

            {/* Divider */}
            <div className='h-px bg-gray-200' />

            {/* Departments */}
            {organisation.departments.length === 0 ? (
                <p className='text-xs text-gray-400'>No departments yet.</p>
            ) : (
                <div className='flex items-stretch gap-2'>

                    {/* Left */}
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={`w-8 flex items-center justify-center rounded-xl border transition
                        ${canScrollLeft
                                ? 'border-gray-300 hover:bg-gray-100'
                                : 'border-gray-100 text-gray-300 cursor-not-allowed'
                            }`}
                    >
                        ←
                    </button>

                    {/* Scroll */}
                    <div
                        ref={sliderRef}
                        className='flex-1 overflow-x-auto flex gap-3'
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {organisation.departments.map((department, index) => (
                            <div key={index} className='flex-shrink-0 w-[250px]'>
                                <Department department={department} />
                            </div>
                        ))}
                    </div>

                    {/* Right */}
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={`w-8 flex items-center justify-center rounded-xl border transition
                        ${canScrollRight
                                ? 'border-gray-300 hover:bg-gray-100'
                                : 'border-gray-100 text-gray-300 cursor-not-allowed'
                            }`}
                    >
                        →
                    </button>

                </div>
            )}

        </div>
    );
}

export default Organisation;