import { useMemo } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import type { IconConfig } from '../types';

export function useIconsConfig(): IconConfig[] {
    return useMemo(() => [
        { href: "https://www.github.com/ParthGadekar0631", icon: FaGithub, bg: "bg-gray-900", hover: "hover:bg-gray-700", label: "GitHub" },
        { href: "https://www.linkedin.com/in/parthgadekar622/", icon: FaLinkedin, bg: "bg-blue-500", hover: "hover:bg-blue-700", label: "LinkedIn" },
        { href: "mailto:parthgadekar060202@gmail.com", icon: FaEnvelope, bg: "bg-red-600", hover: "hover:bg-red-500", label: "Email" },
        { href: "tel:+15512605658", icon: FaPhone, bg: "bg-emerald-600", hover: "hover:bg-emerald-500", label: "Phone" },
        { href: "https://risksray.vercel.app", icon: FaGlobe, bg: "bg-purple-600", hover: "hover:bg-purple-500", label: "Website" },
    ], []);
}
