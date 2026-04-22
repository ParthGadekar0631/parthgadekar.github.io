'use client';

import React from 'react';
import Image from 'next/image';
import { Analytics } from "@vercel/analytics/next";
import Texts from './text/page';
import Showcase from './showcase/page';
import ImpactSection from './impactsection/page';
import ProjectPanel from '../components/ProjectPanel';
import workexperience from '@/data/workexperience';
import education from '@/data/education';
import dynamic from 'next/dynamic';
import { image as profileImage } from '@/data/images';

const ShowcaseIpad = dynamic(() => import('./showcase-sm/page'), { ssr: false });

function EducationPanel({
    item,
    position,
    scrollProgressRef,
}: {
    item: (typeof education)[number];
    position: 'bottom-left' | 'bottom-right';
    scrollProgressRef: React.RefObject<{ value: number }>;
}) {
    const panelRef = React.useRef<HTMLAnchorElement>(null);
    const isLeft = position === 'bottom-left';

    React.useEffect(() => {
        let rafId = 0;

        const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
        const easeInOut = (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const start = isLeft ? 0.1 : 0.16;
        const end = isLeft ? 0.5 : 0.58;
        const hiddenX = isLeft ? -110 : 110;

        const animate = () => {
            const el = panelRef.current;
            const sp = scrollProgressRef.current?.value ?? 0;

            if (!el) {
                rafId = requestAnimationFrame(animate);
                return;
            }

            const raw = clamp01((sp - start) / (end - start));
            const eased = easeInOut(raw);
            const x = hiddenX * (1 - eased);
            const opacity = raw;

            el.style.opacity = String(opacity);
            el.style.transform = `translate3d(${x}%, 0, 0)`;
            el.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto';

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, [isLeft, scrollProgressRef]);

    return (
        <a
            ref={panelRef}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-container"
            style={{
                position: 'absolute',
                ...(isLeft
                    ? {
                        top: '74%',
                        left: 'clamp(18px, 4vw, 64px)',
                    }
                    : {
                        top: '84%',
                        right: 'clamp(18px, 4vw, 64px)',
                    }),
                width: 'clamp(260px, 21vw, 320px)',
                maxWidth: '100%',
                padding: '14px 16px',
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                color: 'var(--foreground)',
                textDecoration: 'none',
                opacity: 0,
                transform: isLeft
                    ? 'translate3d(-110%, 0, 0)'
                    : 'translate3d(110%, 0, 0)',
                zIndex: 20,
                pointerEvents: 'none',
                willChange: 'transform, opacity',
                transition: 'none',
                backfaceVisibility: 'hidden',
                }}
            >
            <div
                style={{
                    width: 58,
                    height: 58,
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.92)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 6,
                    flexShrink: 0,
                }}
            >
                <img
                    src={item.logo}
                    alt={`${item.institution} logo`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                />
            </div>

            <div style={{ minWidth: 0 }}>
                <div
                    style={{
                        fontSize: 'clamp(12px,1.3vw,14px)',
                        opacity: 0.82,
                        marginBottom: 4,
                    }}
                >
                    Education
                </div>
                <h3
                    style={{
                        margin: 0,
                        fontWeight: 'bold',
                        fontSize: 'clamp(12px,1.35vw,14px)',
                        lineHeight: 1.3,
                    }}
                >
                    {item.institution}
                </h3>
                <div
                    style={{
                        height: 1,
                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.69), transparent)',
                        margin: '6px 0',
                    }}
                />
                <p
                    style={{
                        margin: 0,
                        fontSize: 'clamp(12px,1.35vw,14px)',
                        lineHeight: 1.45,
                    }}
                >
                    {item.degree}
                </p>
                <p
                    style={{
                        margin: '6px 0 0 0',
                        fontSize: 'clamp(12px,1.35vw,14px)',
                        opacity: 0.84,
                        lineHeight: 1.4,
                    }}
                >
                    {item.location} | {item.duration}
                </p>
            </div>
        </a>
    );
}

export default function Home() {
    const scrollProgressRef = React.useRef({ value: 0 });
    const [heroProgress, setHeroProgress] = React.useState(0);

    React.useEffect(() => {
        let frame = 0;

        const update = () => {
            const progress = Math.min(window.scrollY / (window.innerHeight * 0.82), 1);
            setHeroProgress(progress);
            scrollProgressRef.current.value = progress;
        };

        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    const imageTranslateY = heroProgress * -24;
    const imageScale = 1 - heroProgress * 0.05;
    const imageRotate = heroProgress * -2.2;

    return (
        <>
            <div className="min-h-screen mt-20 smooth-scroll w-screen overflow-x-hidden bg-[var(--background)]">
                <div className="text-[var(--foreground)] min-h-screen relative w-screen overflow-x-hidden">
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background:
                                'radial-gradient(circle at 50% 26%, rgba(115, 58, 255, 0.16), transparent 32%), radial-gradient(circle at 18% 74%, rgba(59, 130, 246, 0.12), transparent 26%), radial-gradient(circle at 82% 68%, rgba(251, 146, 60, 0.12), transparent 24%)',
                            pointerEvents: 'none',
                        }}
                    />

                    <div
                        style={{
                            minHeight: '100vh',
                            position: 'relative',
                            paddingTop: 16,
                            paddingBottom: 96,
                        }}
                    >
                        <h1
                            className="font-bold m-6 mb-0 text-center text-5xl sm:text-6xl mx-3 font-px-4 md:text-[4.5rem] md:text-center md:ml-0 md:mr-0 mr-0 text-[var(--foreground)]"
                            style={{
                                textShadow: '0 8px 24px rgba(0,0,0,0.18)',
                            }}
                        >
                            Welcome to Parth Gadekar&apos;s portfolio
                        </h1>
                        <p
                            className="mt-1 mb-0 text-center text-[1rem] md:text-[1.5rem] md:text-center md:ml-0 md:mr-0 ml-2 mr-0 text-[var(--foreground)]"
                            style={{
                                textShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            }}
                        >
                            Solve complex problems. Build reliable systems.
                        </p>

                        <div
                            style={{
                                position: 'relative',
                                height: 'calc(100vh - 176px)',
                                minHeight: 700,
                                width: '100%',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -44%) translateY(${imageTranslateY}px) rotate(${imageRotate}deg) scale(${imageScale})`,
                                    transition: 'transform 120ms linear',
                                    width: 'min(32vw, 420px)',
                                    minWidth: 250,
                                    aspectRatio: '0.74 / 1',
                                    zIndex: 8,
                                }}
                            >
                                <div
                                    className="glass-container"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 36,
                                        overflow: 'hidden',
                                        padding: 12,
                                        boxShadow:
                                            '0 28px 90px rgba(12, 14, 40, 0.42), 0 0 0 1px rgba(255,255,255,0.08)',
                                    }}
                                >
                                    <div
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 28,
                                            overflow: 'hidden',
                                            background:
                                                'linear-gradient(180deg, rgba(15,23,42,0.92), rgba(7,10,19,0.98))',
                                        }}
                                    >
                                        <Image
                                            src={profileImage}
                                            alt="Parth Gadekar"
                                            fill
                                            priority
                                            sizes="(max-width: 1024px) 70vw, 32vw"
                                            style={{
                                                objectFit: 'cover',
                                                objectPosition: 'center 18%',
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background:
                                                    'linear-gradient(180deg, rgba(15,23,42,0.04) 0%, rgba(2,6,23,0.28) 72%, rgba(2,6,23,0.72) 100%)',
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                left: 18,
                                                right: 18,
                                                bottom: 18,
                                                display: 'flex',
                                                gap: 10,
                                                flexWrap: 'wrap',
                                            }}
                                        >
                                            {['MS CS @ Stevens', 'University of Mumbai', 'Software + Data + AI'].map((pill) => (
                                                <span
                                                    key={pill}
                                                    style={{
                                                        borderRadius: 999,
                                                        padding: '8px 12px',
                                                        fontSize: 12,
                                                        fontWeight: 700,
                                                        color: '#eff6ff',
                                                        background: 'rgba(15, 23, 42, 0.62)',
                                                        border: '1px solid rgba(255,255,255,0.12)',
                                                        backdropFilter: 'blur(10px)',
                                                    }}
                                                >
                                                    {pill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {education[0] && (
                                <EducationPanel
                                    item={education[0]}
                                    position="bottom-left"
                                    scrollProgressRef={scrollProgressRef}
                                />
                            )}
                            {education[1] && (
                                <EducationPanel
                                    item={education[1]}
                                    position="bottom-right"
                                    scrollProgressRef={scrollProgressRef}
                                />
                            )}
                        </div>

                        {workexperience.length >= 1 && (
                            <ProjectPanel
                                project={workexperience[0]}
                                position="top-left"
                                scrollProgressRef={scrollProgressRef}
                            />
                        )}
                        {workexperience.length >= 2 && (
                            <ProjectPanel
                                project={workexperience[1]}
                                position="bottom-right"
                                scrollProgressRef={scrollProgressRef}
                            />
                        )}
                        {workexperience.length >= 3 && (
                            <ProjectPanel
                                project={workexperience[2]}
                                position="top-right"
                                scrollProgressRef={scrollProgressRef}
                            />
                        )}
                    </div>

                    <Texts />
                    <div className="block lg:hidden">
                        <ShowcaseIpad />
                    </div>
                    <div className="hidden lg:block">
                        <Showcase />
                    </div>
                    <ImpactSection />
                </div>
            </div>

            <Analytics />
        </>
    );
}
