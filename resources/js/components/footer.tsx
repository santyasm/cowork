import AppLogo from '@/components/app-logo';
import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0a0a0a]">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3 md:px-12 lg:px-20">
                {/* Logo + Descrição */}
                <div className="flex flex-col gap-4">
                    <AppLogo />
                    <p className="max-w-xs text-sm text-gray-600 dark:text-gray-400">
                        Simplifique a gestão do seu coworking e ofereça uma experiência única para sua comunidade 🚀
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-3 text-sm">
                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Navegação</h3>
                    <Link href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                        Home
                    </Link>
                    <Link href="#about" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                        Sobre
                    </Link>
                    <Link href="#prices" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                        Planos
                    </Link>
                    <Link href="#feedbacks" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                        Feedbacks
                    </Link>
                </div>

                {/* Redes sociais */}
                <div className="flex flex-col gap-3">
                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Conecte-se</h3>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/yasmin-santana-santos/"
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                            target="_blank"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200 py-6 dark:border-gray-800">
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} Cowork. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}
