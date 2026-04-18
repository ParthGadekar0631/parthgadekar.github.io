
import { FaReact, FaNode, FaPython, FaGitAlt, FaDocker, FaAws, FaLinux, FaDatabase, FaWindows, FaApple, FaChartBar, FaChartArea, FaFileExcel, FaTerminal } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiFastapi, SiPandas, SiNumpy, SiScikitlearn, SiTensorflow, SiKubernetes, SiGnubash, SiSqlite, SiOracle } from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

// Icons that might not exist in older react-icons versions are commented with alternatives or generic icons reused.
// We'll use FaBrain for generic ML terms if specific icons are missing.

const skillSet = {
    'Languages & Databases': [
        { name: 'Python', icon: FaPython, bgColor: 'bg-[#3776ab]' },
        // SQL is generic, using FaDatabase
        { name: 'SQL', icon: FaDatabase, bgColor: 'bg-[#00758f]' },
        // PL/SQL is Oracle, using SiOracle if available, else generic. 
        { name: 'PL/SQL', icon: SiOracle, bgColor: 'bg-[#F80000]' },
        { name: 'TypeScript', icon: SiTypescript, bgColor: 'bg-[#3178c6]' },
        { name: 'JavaScript', icon: SiJavascript, bgColor: 'bg-[#f7df1e]' },
        { name: 'Java', icon: SiOracle, bgColor: 'bg-[#E76F00]' },
        { name: 'Bash', icon: SiGnubash, bgColor: 'bg-[#4EAA25]' },
        { name: 'SQLite', icon: SiSqlite, bgColor: 'bg-[#003B57]' },
    ],
    'Frameworks & Libraries': [
        { name: 'FastAPI', icon: SiFastapi, bgColor: 'bg-[#009688]' },
        { name: 'Pandas', icon: SiPandas, bgColor: 'bg-[#150458]' },
        { name: 'NumPy', icon: SiNumpy, bgColor: 'bg-[#013243]' },
        { name: 'Node.js', icon: FaNode, bgColor: 'bg-[#339933]' },
        { name: 'React', icon: FaReact, bgColor: 'bg-[#61dafb]' },
        { name: 'Spring Boot', icon: FaNode, bgColor: 'bg-[#6DB33F]' },
    ],
    'Machine Learning, Data & Analytics': [
        { name: 'TensorFlow', icon: SiTensorflow, bgColor: 'bg-[#FF6F00]' },
        { name: 'scikit-learn', icon: SiScikitlearn, bgColor: 'bg-[#F7931E]' },
        { name: 'OpenCV', icon: FaChartBar, bgColor: 'bg-[#5C3EE8]' },
        { name: 'Matplotlib', icon: FaChartBar, bgColor: 'bg-[#11557c]' },
        { name: 'Seaborn', icon: FaChartArea, bgColor: 'bg-[#ce4a4a]' },
        { name: 'Tableau', icon: FaChartArea, bgColor: 'bg-[#E97627]' },
        { name: 'Excel', icon: FaFileExcel, bgColor: 'bg-[#217346]' },
    ],
    'Cloud, DevOps & Systems': [
        { name: 'AWS', icon: FaAws, bgColor: 'bg-[#ff9900]' },
        { name: 'Azure', icon: VscAzure, bgColor: 'bg-[#0078D4]' },
        { name: 'Docker', icon: FaDocker, bgColor: 'bg-[#2496ed]' },
        { name: 'Kubernetes', icon: SiKubernetes, bgColor: 'bg-[#326ce5]' },
        { name: 'Linux', icon: FaLinux, bgColor: 'bg-[#fcc624]' },
        { name: 'Windows', icon: FaWindows, bgColor: 'bg-[#0078D6]' },
        { name: 'macOS', icon: FaApple, bgColor: 'bg-[#000000]' },
        { name: 'Git', icon: FaGitAlt, bgColor: 'bg-[#f1502f]' },
        { name: 'GitHub Actions', icon: FaTerminal, bgColor: 'bg-[#2088FF]' },
    ]
};

export default skillSet;
