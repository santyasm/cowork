const feedbacks = [
    { name: 'João Santana', text: 'Facilitou muito a rotina do meu time, recomendo demais 🚀', avatar: '/images/feedbacks/joao.jpg' },
    { name: 'Carlos Silva', text: 'O Cowork mudou a forma como administro meu espaço. Simples e eficiente!', avatar: '/images/feedbacks/carlos.jpg' },
    { name: 'Larissa Lima', text: 'Adorei a praticidade e o suporte rápido!', avatar: '/images/feedbacks/larissa.jpg' },
    { name: 'Elis Braga', text: 'Conectou minha comunidade de forma incrível.', avatar: '/images/feedbacks/maria.jpg' },
    { name: 'Liam Souza', text: 'Finalmente uma solução pensada para coworkings de verdade.', avatar: '/images/feedbacks/liam.jpg' },
];

const colors = [
    'bg-[#D3F985] dark:bg-[#D3F985]/40',
    'bg-gray-100 dark:bg-gray-500/40',
    'bg-blue-100 dark:bg-blue-300/40',
    'bg-pink-200 dark:bg-pink-400/40',
    'bg-orange-100 dark:bg-orange-400/40',
];

export function FeedbacksSection() {
    return (
        <section className="my-20 flex min-h-screen w-full items-center justify-center px-6 md:px-12 lg:px-20 dark:bg-[#0a0a0a]" id="feedbacks">
            <div className="w-full max-w-7xl text-center">
                <span className="text-sm tracking-tight text-gray-900 dark:text-gray-400">Cowork em palavras</span>
                <h2 className="mt-6 mb-20 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">O que dizem nossos clientes</h2>

                <div className="hidden md:grid md:grid-cols-3 md:gap-8">
                    {feedbacks.slice(0, 3).map((fb, i) => (
                        <div
                            key={i}
                            className={`item-center flex h-[300px] flex-col justify-center gap-4 rounded-2xl p-6 shadow-sm dark:border-gray-700 ${colors[i % colors.length]}`}
                        >
                            <img src={fb.avatar} alt={fb.name} className="h-14 w-14 self-center rounded-full object-cover" />

                            <p className="w-[82%] self-center text-gray-700 italic dark:text-gray-300">“{fb.text}”</p>
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{fb.name}</span>
                        </div>
                    ))}

                    <div className="col-span-3 mt-8 flex h-[300px] justify-center gap-8">
                        {feedbacks.slice(3).map((fb, i) => (
                            <div
                                key={i}
                                className={`flex flex-col justify-center gap-4 rounded-2xl p-6 shadow-sm dark:border-gray-700 ${colors[(i + 3) % colors.length]}`}
                            >
                                <img src={fb.avatar} alt={fb.name} className="h-14 w-14 self-center rounded-full object-cover" />
                                <p className="w-[82%] self-center text-gray-700 italic dark:text-gray-300">“{fb.text}”</p>
                                <span className="font-semibold text-gray-900 dark:text-gray-100">{fb.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:hidden">
                    {feedbacks.map((fb, i) => (
                        <div
                            key={i}
                            className={`flex h-[300px] w-[80%] flex-shrink-0 snap-center flex-col justify-center gap-4 rounded-2xl p-6 shadow-sm ${colors[i % colors.length]}`}
                        >
                            <img src={fb.avatar} alt={fb.name} className="h-24 w-24 self-center rounded-full object-cover" />
                            <p className="text-gray-700 italic dark:text-gray-300">“{fb.text}”</p>
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{fb.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
