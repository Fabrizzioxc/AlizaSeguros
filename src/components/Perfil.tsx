"use client";

import { useState } from "react";
import { CustomTabs } from "../components/CustomTabs";
import { Building2, UserCircle, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Badge } from "./Badge";

const tabs = [
  {
    key: "empresas",
    label: "Empresas",
    icon: <Building2 size={20} />,
  },
  {
    key: "independientes",
    label: "Independiente",
    icon: <UserCircle size={20} />,
  },
] as const;

const tabContent = {
  empresas: {
    badge: "Elección de Perfil",
    title: "Gestión Corporativa de Alto Rendimiento",
    description:
      "Simplificamos la protección de todo tu capital humano. Centraliza tus pólizas en una sola plataforma y cumple con las exigencias de tus clientes más rigurosos.",
    image: "/img/gestion-sctr-corporativo-empresas-peru.webp",
    alt: "Gestión de SCTR corporativo",
    cta: "Obtener SCTR Corporativo",
    benefits: [
      {
        bold: "Emisión Masiva:",
        text: "Afiliación de toda tu planilla en un solo proceso digital.",
      },
      {
        bold: "Control de Vigencias:",
        text: "Alertas automáticas para evitar vacíos de cobertura y multas.",
      },
      {
        bold: "Soporte en Licitaciones:",
        text: "Documentación lista para presentar ante contratistas y SUNAFIL.",
      },
    ],
  },
  independientes: {
    badge: "Elección de Perfil",
    title: "Protección Individual Instantánea",
    description:
      "Tu tiempo es dinero. No permitas que un trámite administrativo te detenga en la puerta de la obra. Obtén tu certificado y asegura tu ingreso hoy mismo.",
    image: "/img/sctr-individual-para-profesionales-independientes.webp",
    alt: "SCTR individual para independientes",
    cta: "Obtener mi SCTR Individual",
    benefits: [
      {
        bold: "Costo-Beneficio:",
        text: "Paga solo por el tiempo que necesitas, optimizando tu inversión.",
      },
      {
        bold: "Inmediatez:",
        text: "Recibe tu certificado digital en minutos, listo para descargar.",
      },
      {
        bold: "Acceso Garantizado:",
        text: "Pólizas válidas en todo el Perú para ingreso a cualquier proyecto.",
      },
    ],
  },
};

export default function Perfil() {
  const [activeTab, setActiveTab] = useState<"empresas" | "independientes">("empresas");

  const content = tabContent[activeTab];

  return (
    <section className="bg-white py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Tabs personalizados */}
        <CustomTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(key) => setActiveTab(key)}
          className="mb-10 sm:mb-12 md:mb-16 lg:mb-20"
        />

        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-center min-h-145">
          
          {/* Imagen SIN bordes redondeados */}
          <div className="md:col-span-5 h-112.5 md:h-145 overflow-hidden bg-slate-100">
            <img
              src={content.image}
              alt={content.alt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenido */}
          <div className="md:col-span-7">

            {/* Badge negro */}
            <div className="flex items-center gap-3 mb-6">
              <Badge text={content.badge} />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-[60px] font-extrabold text-slate-950 leading-[1.05] tracking-[-0.04em] mb-8">
              {content.title}
            </h2>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light mb-10 max-w-xl">
              {content.description}
            </p>

            <ul className="space-y-6 mb-12">
              {content.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-4">
                  {/* Check verde */}
                  <CheckCircle2 className="text-green-600 shrink-0 mt-1" size={24} />
                  <p className="text-lg text-slate-900 leading-snug">
                    <strong className="font-bold">{benefit.bold}</strong>{" "}
                    {benefit.text}
                  </p>
                </li>
              ))}
            </ul>

            <a
              href="/Contacto"
              className="inline-flex items-center gap-3 bg-[#B61F1F] hover:bg-slate-950 text-white px-10 py-5 font-bold text-base rounded-[5px]"
            >
              {content.cta}
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}