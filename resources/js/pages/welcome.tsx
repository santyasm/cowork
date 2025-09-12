import AppLogo from '@/components/app-logo';
import { Footer } from '@/components/footer';
import { AboutSection } from '@/components/sections/about-section';
import { FeedbacksSection } from '@/components/sections/feedbacks-section';
import { PricesSection } from '@/components/sections/prices-section';
import { Button } from '@/components/ui/button';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Plan {
    id: number;
    name: string;
    price: number;
    description: string;
    hours_desk: number;
    hours_room: number;
    rooms: {
        id: number;
        name: string;
        description: string;
        type: string;
        capacity: number;
    }[];
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const { plans } = usePage<{ plans: Plan[] }>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[90%] text-sm not-has-[nav]:hidden md:max-w-4xl lg:max-w-7xl">
                    <nav className="flex items-center justify-between gap-4">
                        <span className="max-w-[25%] md:max-w-[200px]">
                            <AppLogo />
                        </span>
                        <div className="flex gap-2">
                            {auth.user ? (
                                <Link
                                    href={auth.user.role === 'admin' ? '/admin/dashboard' : dashboard()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[90%] flex-col items-center justify-between gap-10 md:max-w-[86%] lg:max-w-7xl lg:flex-row lg:gap-0">
                        <div className="flex flex-col items-center gap-10 lg:items-start">
                            <h1 className="text-center text-6xl leading-18 font-bold tracking-tighter lg:text-start lg:text-8xl lg:leading-28 dark:text-white">
                                Eleve seu <br />
                                espaço com <br />
                                <span className="relative inline-block">
                                    <span className="relative z-10">Cowork</span>
                                    <img src="/svgs/highlightWord.svg" className="absolute -bottom-3 left-0 z-0 w-full" alt="" />
                                </span>
                            </h1>
                            <p className="text-center leading-6 font-light text-gray-500 md:max-w-[70%] lg:text-start dark:text-gray-400">
                                Bem-vindo(a) ao Cowork – onde a inovação encontra a colaboração no coração da produtividade! Liberte 🚀 o seu
                                potencial em nossos espaços de coworking cuidadosamente projetados, personalizados para inspirar a criatividade e
                                promover conexões.
                            </p>
                            <span>
                                <Link href="/plans">
                                    <Button>Garanta seu lugar</Button>
                                </Link>
                            </span>
                        </div>
                        <img src="/images/hero.png" className="rounded-3xl md:max-w-[66vw] lg:max-w-[40vw]" alt="" />
                    </main>
                </div>

                <AboutSection />
                <PricesSection plans={plans} />
                <FeedbacksSection />

                <div className="hidden h-14.5 lg:block"></div>
                <Footer />
            </div>
        </>
    );
}
