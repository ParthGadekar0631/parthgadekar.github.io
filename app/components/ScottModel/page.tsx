"use client";

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Html, OrbitControls } from '@react-three/drei';
import { Lights } from './Lights';
import { useTheme } from 'next-themes';

function FloatingModel({ children }: { children: React.ReactNode }) {
    return (
        <group position={[0, -1, 1]}>
            {children}
        </group>
    );
}

function ProfilePhotoScene({ currentAzimuth }: { currentAzimuth: number }) {
    const normalized = Math.max(-1, Math.min(1, currentAzimuth / Math.PI));
    const glowX = normalized * 0.7;
    const tilt = normalized * 10;
    const scale = 1 + Math.abs(normalized) * 0.04;

    return (
        <FloatingModel>
            <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.65}>
                <group>
                    <mesh position={[glowX, 0.15, -0.5]} scale={[4.4, 4.4, 1]}>
                        <circleGeometry args={[1, 64]} />
                        <meshStandardMaterial color="#7c3aed" transparent opacity={0.18} />
                    </mesh>
                    <mesh position={[-glowX * 0.55, -0.1, -0.35]} scale={[3.55, 3.55, 1]}>
                        <circleGeometry args={[1, 64]} />
                        <meshStandardMaterial color="#2563eb" transparent opacity={0.14} />
                    </mesh>
                    <Html transform sprite position={[0, -0.05, 0.25]} distanceFactor={1.55}>
                        <div
                            style={{
                                width: 320,
                                height: 410,
                                borderRadius: 36,
                                overflow: "hidden",
                                transform: `rotate(${tilt}deg) scale(${scale})`,
                                transition: "transform 280ms ease, box-shadow 280ms ease",
                                boxShadow: "0 28px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.14)",
                                background:
                                    "linear-gradient(180deg, rgba(17,24,39,0.95), rgba(9,9,11,0.98))",
                                border: "1px solid rgba(255,255,255,0.12)",
                                position: "relative",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "radial-gradient(circle at 20% 18%, rgba(59,130,246,0.22), transparent 36%), radial-gradient(circle at 80% 82%, rgba(168,85,247,0.22), transparent 34%)",
                                    pointerEvents: "none",
                                }}
                            />
                            <img
                                src="/parth-profile.jpg"
                                alt="Parth Gadekar"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center 18%",
                                    filter: "saturate(1.04) contrast(1.02)",
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    left: 18,
                                    right: 18,
                                    bottom: 18,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 12,
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    style={{
                                        borderRadius: 999,
                                        padding: "8px 12px",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: "white",
                                        background: "rgba(9,9,11,0.7)",
                                        border: "1px solid rgba(255,255,255,0.14)",
                                        backdropFilter: "blur(10px)",
                                    }}
                                >
                                    Parth Gadekar
                                </div>
                                <div
                                    style={{
                                        borderRadius: 999,
                                        padding: "8px 12px",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: "#bfdbfe",
                                        background: "rgba(17,24,39,0.72)",
                                        border: "1px solid rgba(96,165,250,0.28)",
                                        backdropFilter: "blur(10px)",
                                    }}
                                >
                                    Software + Data + AI
                                </div>
                            </div>
                        </div>
                    </Html>
                </group>
            </Float>
        </FloatingModel>
    );
}

export default function ScottModel() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [currentAzimuth, setCurrentAzimuth] = useState(-Math.PI);
    const [activeModel, setActiveModel] = useState('graduation');
    const [animateIn, setAnimateIn] = useState(true);
    const orbitControlsRef = useRef<unknown>(null);
    const prevModelRef = useRef('graduation');

    useEffect(() => {
        if (orbitControlsRef.current) {
            (orbitControlsRef.current as { reset?: () => void; target?: { set: (x: number, y: number, z: number) => void } }).reset?.();
            (orbitControlsRef.current as { reset?: () => void; target?: { set: (x: number, y: number, z: number) => void } }).target?.set(0, -1, 0);
        }
    }, [mounted]);

    if (!mounted) return null;

    const isDark = theme === 'dark';

    const handleOrbitChange = () => {
        if (orbitControlsRef.current) {
            const azimuth = (orbitControlsRef.current as { getAzimuthalAngle?: () => number }).getAzimuthalAngle?.();
            if (typeof azimuth === 'number') {
                setCurrentAzimuth(azimuth);

                let model = 'formal';
                if (azimuth > Math.PI / 3 && azimuth <= Math.PI) {
                    model = 'casual';
                } else if (azimuth < -Math.PI / 3 && azimuth >= -Math.PI) {
                    model = 'graduation';
                }

                if (model !== prevModelRef.current) {
                    setAnimateIn(false);
                    setTimeout(() => {
                        setActiveModel(model);
                        setAnimateIn(true);
                    }, 300);
                    prevModelRef.current = model;
                } else {
                    setActiveModel(model);
                }
            }
        }
    };

    const getContainerContent = () => {
        switch (activeModel) {
            case 'graduation':
                return {
                    title: "Stevens M.S. in Computer Science",
                    description: "Graduate work focused on databases, analytics, machine learning, and production-minded software systems.",
                    details: "Expected 2026 | Hoboken, NJ"
                };
            case 'casual':
                return {
                    title: "Open Source Contributions",
                    description: "Active GitHub portfolio across telemetry systems, ETL workflows, analytics dashboards, full-stack builds, and machine learning experiments.",
                    details: "42 Public Repositories | Live GitHub Portfolio"
                };
            case 'formal':
                return {
                    title: "Internship Experience",
                    description: "Experience across web development, data engineering, backend workflows, and information systems.",
                    details: "3 Internships | Systems + Data"
                };
            default:
                return {
                    title: "Portfolio",
                    description: "Select a model to view details",
                    details: ""
                };
        }
    };

    const content = getContainerContent();

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <Canvas
                camera={{ position: [0, 1, 8], fov: 30 }}
                style={{ height: '100vh', width: '100%', cursor: 'pointer' }}
            >
                <Lights />
                <OrbitControls
                    ref={(instance) => {
                        orbitControlsRef.current = instance;
                    }}
                    enablePan={false}
                    enableZoom={false}
                    autoRotate={true}
                    autoRotateSpeed={4}
                    maxDistance={20}
                    minDistance={3}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                    minAzimuthAngle={-Infinity}
                    maxAzimuthAngle={Infinity}
                    onChange={handleOrbitChange}
                />
                <Suspense fallback={null}>
                    <mesh position={[0, 0, 8]}>
                        <planeGeometry args={[6, 6]} />
                        <meshStandardMaterial
                            color="#ffffff"
                            metalness={0.3}
                            roughness={0.1}
                            transparent
                            opacity={0}
                        />
                    </mesh>
                    <ProfilePhotoScene currentAzimuth={currentAzimuth} />
                </Suspense>
            </Canvas>

            <div style={{ position: 'absolute', top: '2.5rem', left: 0, width: '100%', zIndex: 10 }}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-2">
                        <h1 className={`text-5xl md:text-6xl font-bold mb-3 ${isDark ? 'text-primary' : 'text-gray-900'}`}>About Me</h1>
                        <p className={`text-lg ${isDark ? 'text-secondary' : 'text-gray-700'}`}>Learn more about my background, projects, and engineering journey</p>
                    </div>
                </div>
            </div>

            <div
                className={`glass-container character-info-panel top-48 sm:top-64 md:top-80 ${animateIn ? 'animate-in' : 'animate-out'} ${isDark ? 'dark' : ''}`}
                style={{
                    position: 'absolute',
                    top: '350px',
                }}
            >
                <h2
                    className="info-panel-title"
                    style={{
                        color: 'rgb(255, 255, 255)',
                        textShadow: '1px 1px 4px rgba(0,0,0,0.3), 1px 1px 8px rgba(0,0,0,0.5)'
                    }}
                >
                    {content.title}
                </h2>
                <div className="info-panel-divider"></div>
                <p
                    className="info-panel-description"
                    style={{
                        color: 'rgb(255, 255, 255)',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3), 1px 1px 2px rgba(0,0,0,0.5)'
                    }}
                >
                    {content.description}
                </p>
                {content.details && (
                    <div
                        className="info-panel-details"
                        style={{
                            color: 'rgb(255, 255, 255)',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3), 1px 1px 2px rgba(0,0,0,0.5)'
                        }}
                    >
                        {content.details}
                    </div>
                )}
            </div>
        </div>
    );
}
