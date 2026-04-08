import { useNavigate } from 'react-router-dom';
import Orb from '../../../ReactBitComponents/Orb';
import GradientText from '../../../ReactBitComponents/GradientText';
import Particles from '../../../ReactBitComponents/Particles';

function StatCard({ number, label }) {
    return (
        <div className="flex flex-col items-center px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm pointer-events-auto">
            <span className="text-xl font-semibold text-slate-100">{number}</span>
            <span className="text-xs text-gray-500 mt-0.5">{label}</span>
        </div>
    );
}

function HeroSection() {
    const navigate = useNavigate();

    return (
        <div className="relative w-full min-h-screen bg-black overflow-hidden py-10">

            {/* Particles (BOTTOM LAYER) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Particles
                    particleCount={600}
                    particleSpread={10}
                    speed={0.1}
                    particleColors={["#ffffff", "#a78bfa", "#818cf8"]}
                    moveParticlesOnHover={false}  // IMPORTANT
                    particleHoverFactor={0}
                    alphaParticles={true}
                    particleBaseSize={100}
                    sizeRandomness={1}
                    cameraDistance={20}
                />
            </div>

            {/* Orb (MIDDLE LAYER - INTERACTIVE) */}
            <div className="absolute inset-0 z-10">
                <Orb
                    hoverIntensity={1}
                    rotateOnHover
                    hue={0}
                    forceHoverState={false}
                    backgroundColor="transparent"
                />
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

            {/* Content */}
            <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4 text-center pointer-events-none">

                {/* Badge */}
                <div className="mb-6 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium tracking-wide uppercase">
                    Issue Tracking · Made Simple
                </div>

                {/* Heading */}
                <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-100 leading-tight max-w-3xl">
                    Raise issues.
                    <br />
                    <span className="text-gray-400 font-normal">Get them</span>{' '}
                    <GradientText
                        colors={["#818CF8", "#A78BFA", "#F472B6"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-4xl sm:text-5xl md:text-6xl font-semibold"
                    >
                        resolved.
                    </GradientText>
                </h1>

                {/* Subheading */}
                <p className="mt-6 text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
                    TrelloApp connects employees and owners in one place — raise workplace issues, track progress, and close them fast.
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-wrap gap-4 justify-center pointer-events-auto">
                    <button
                        onClick={() => navigate('/login')}
                        className="px-7 py-3 rounded-xl text-white font-medium bg-indigo-500 hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-900/40 ring-1 ring-indigo-500/30"
                    >
                        Get Started
                    </button>
                    <button
                        onClick={() => navigate('/issues')}
                        className="px-7 py-3 rounded-xl text-gray-300 font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm"
                    >
                        Browse Issues →
                    </button>
                </div>

                {/* Stats */}
                <div className="mt-16 flex flex-wrap gap-4 justify-center">
                    <StatCard number="2 Roles" label="Owner & Employee" />
                    <StatCard number="Any Org" label="College · Startup · Shop" />
                    <StatCard number="Real-time" label="Issue Tracking" />
                </div>

            </div>
        </div>
    );
}

export default HeroSection;