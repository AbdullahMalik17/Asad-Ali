"use client";

import Image from "next/image";
import Stats from "./Stats";
import TrialForm from "./TrialForm";
import { useLanguage } from "./LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-800 to-green-600">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full bg-amber-400 px-5 py-2 font-bold text-emerald-950 shadow-lg">
            {t("hero.welcome")}
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight text-white lg:text-6xl">
            {t("hero.titleFirst")}
            <span className="block text-amber-400">
              {t("hero.titleSecond")}
            </span>
          </h1>

          <p className="mt-6 text-xl leading-8 text-emerald-50">
            {t("hero.description")}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#admissions"
              className="rounded-xl bg-amber-400 px-8 py-4 font-bold text-emerald-950 shadow-lg transition hover:bg-amber-300"
            >
              {t("hero.trial")}
            </a>

            <a
              href="#courses"
              className="rounded-xl border-2 border-white px-8 py-4 font-bold text-white transition hover:bg-white hover:text-emerald-900"
            >
              {t("hero.courses")}
            </a>
          </div>

          <Stats />
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-2xl">
          <div className="mb-6 flex justify-center">
            <Image
              src="/logo.png"
              alt="Maqsad-e-Quran Academy"
              width={220}
              height={130}
              priority
              className="h-auto w-auto object-contain"
            />
          </div>

          <TrialForm />
        </div>
      </div>
    </section>
  );
}