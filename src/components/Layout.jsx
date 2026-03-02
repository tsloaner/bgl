import { NavLink, Outlet } from 'react-router-dom';
import { BookOpen, ChartPieSlice, Users, Fire } from '@phosphor-icons/react';

const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isActive
                ? 'bg-[#2C4B3B] text-[#F8F6F0]'
                : 'text-[#5C6359] hover:bg-[#2C4B3B]/10 hover:text-[#2C4B3B]'
            }`
        }
    >
        <Icon weight="bold" />
        <span className="font-semibold text-sm hidden sm:block">{label}</span>
    </NavLink>
);

export default function Layout() {
    return (
        <div className="min-h-[100dvh] flex flex-col pt-24 pb-12 px-4 sm:px-8 max-w-[1400px] mx-auto relative overflow-hidden">

            {/* Floating Navigation */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                <div className="liquid-glass flex items-center p-2 rounded-full gap-2 whitespace-nowrap">
                    <NavItem to="/" icon={Fire} label="Home" />
                    <NavItem to="/books" icon={BookOpen} label="Books" />
                    <NavItem to="/stats" icon={ChartPieSlice} label="Stats" />
                    <NavItem to="/members" icon={Users} label="Members" />
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 w-full flex flex-col items-center">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="mt-24 text-center text-[#5C6359]/60 text-sm">
                <p className="font-semibold text-[#2C4B3B]">Boulder Gets Lit &copy; {new Date().getFullYear()}</p>
                <p className="mt-1">16 books. 13 readers. Zero consensus.</p>
            </footer>
        </div>
    );
}
