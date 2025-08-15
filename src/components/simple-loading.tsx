'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SimpleLoading({ isLoading = true }: { isLoading?: boolean }) {
    const { t } = useTranslation();
    // Array de claves de frases
    const fraseKeys = [
        'frase1', 'frase2', 'frase3', 'frase4', 'frase5',
        'frase6', 'frase7', 'frase8', 'frase9', 'frase10'
    ];
    const [quote, setQuote] = useState(t(fraseKeys[0]));

    useEffect(() => {
        // Selecciona una frase aleatoria solo en el cliente
        const randomKey = fraseKeys[Math.floor(Math.random() * fraseKeys.length)];
        setQuote(t(randomKey));
    }, [t]);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="text-center space-y-4">
                <div className="relative">
                    <div className="w-16 h-16 mx-auto border-4 border-gray-700 rounded-full">
                        <div className="w-full h-full border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-white text-lg font-medium">{t('cargar')}</p>
                    <p className="text-cyan-400 text-sm">{quote}</p>
                </div>
            </div>
        </div>
    );
}