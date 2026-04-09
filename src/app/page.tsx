import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const sections = [
  {
    title: "Carte Interactive",
    description:
      "Visualisez les 18 schémas, les domaines, les modes et les stratégies de coping sur une carte interactive. Explorez les liens entre les concepts.",
    href: "/carte",
    accent: "bg-sky-50 border-sky-200 hover:border-sky-300",
  },
  {
    title: "Fiches Détaillées",
    description:
      "Consultez les fiches descriptives de chaque schéma, mode, trouble de la personnalité et technique avec exemples cliniques.",
    href: "/fiches",
    accent: "bg-emerald-50 border-emerald-200 hover:border-emerald-300",
  },
  {
    title: "Prise en charge",
    description:
      "Guide clinique interactif : phases de thérapie, protocoles pas-à-pas, parcours EV → Adulte Sain, travail par mode et 25 techniques.",
    href: "/prise-en-charge",
    accent: "bg-violet-50 border-violet-200 hover:border-violet-300",
  },
  {
    title: "Outils & Questionnaires",
    description:
      "Questionnaires interactifs (YSQ-L3, DES-II) et diagramme de conceptualisation de cas à remplir et télécharger en PDF.",
    href: "/outils",
    accent: "bg-amber-50 border-amber-200 hover:border-amber-300",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      {/* Hero */}
      <section className="max-w-2xl text-center mb-14">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">
          SchemaExplorer
        </h1>
        <p className="text-lg text-slate-500 mb-4">
          Explorez le modèle de Jeffrey Young de manière interactive
        </p>
        <p className="text-base text-slate-600 leading-relaxed">
          SchemaExplorer est un outil pédagogique conçu pour aider les
          thérapeutes, les étudiants et les patients à comprendre la thérapie
          des schémas. Naviguez entre les 18 schémas précoces inadaptés, les
          modes de fonctionnement et les stratégies de coping, et découvrez
          comment ils interagissent au sein du modèle de Young.
        </p>
      </section>

      {/* Section cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="group">
            <Card
              className={`h-full border transition-colors ${section.accent}`}
            >
              <CardHeader>
                <CardTitle className="text-slate-800 text-lg">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-sm leading-relaxed">
                  {section.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
}
