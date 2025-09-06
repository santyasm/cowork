export function AboutSection() {
    return (
        <section className="mt-20 flex min-h-screen w-full items-center justify-center px-6 md:px-12 lg:px-20 dark:bg-[#0a0a0a]" id="about">
            <div className="grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
                <div className="z-10 flex flex-col gap-6 text-center lg:text-left">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Sobre o Cowork</h2>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                        Nosso SaaS nasceu para simplificar a gestão de espaços de coworking 🚀. Oferecemos ferramentas que conectam pessoas, otimizam
                        a administração e criam uma experiência única para sua comunidade.
                    </p>
                </div>

                <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl md:h-auto">
                    <img src="/images/cowork-room.png" alt="" className="w-full object-contain" />
                </div>
            </div>
        </section>
    );
}
