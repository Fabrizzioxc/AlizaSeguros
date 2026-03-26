import React, { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const whyUsData = [
  {
    id: "01",
    title: "Emisión en tiempo récord",
    description: "Olvídate de trámites lentos. Generamos tu constancia SCTR de forma digital y la enviamos a tu correo en menos de 15 minutos para que tu operación nunca se detenga.",
    buttonText: "Obtener SCTR ahora",
    image: "/img/emision-sctr-rapida-peru.webp"
  },
  {
    id: "02",
    title: "Asesoría experta 24/7",
    description: "No somos solo una plataforma; somos tus aliados. Te guiamos paso a paso en la elección de la póliza correcta según tu actividad de riesgo para evitar rechazos en obra.",
    buttonText: "Hablar con un asesor",
    image: "/img/asesoria-especializada-seguros.webp"
  },
  {
    id: "03",
    title: "Gestión 100% Digital",
    description: "Administra tus pólizas, descarga certificados y gestiona inclusiones desde cualquier dispositivo. Un proceso sin papeles, diseñado para la agilidad del sector construcción.",
    buttonText: "Ver plataforma digital",
    image: "/img/gestion-digital-polizas-sctr.webp"
  },
  {
    id: "04",
    title: "Cumplimiento SUNAFIL garantizado",
    description: "Blindamos tu empresa ante auditorías. Nuestras pólizas cumplen estrictamente con la normativa vigente, asegurando que tu ingreso a cualquier unidad minera o proyecto sea impecable.",
    buttonText: "Validar cumplimiento",
    image: "/img/cumplimiento-normativa-sunafil.webp"
  }
];

export default function WhyUs() {
  const [activeTab, setActiveTab] = useState("01");

  return (
    <section className="bg-[#F4F4F4] py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera de Sección */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-black"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Por qué elegirnos</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] text-slate-950 max-w-3xl">
            Tu obra no puede esperar, <br className="hidden md:block" /> tu seguro tampoco.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Lógica del Acordeón */}
          <Accordion 
            type="single" 
            defaultValue="01" 
            onValueChange={(value) => value && setActiveTab(value)}
            className="w-full"
          >
            {whyUsData.map((item) => (
              <AccordionItem 
                key={item.id} 
                value={item.id}
                className={`border-b border-gray-300 transition-colors duration-500 ${activeTab === item.id ? 'bg-black text-white' : 'bg-transparent text-slate-950'}`}
              >
                <AccordionTrigger className="hover:no-underline py-8 px-6 group transition-all">
                  <div className="flex items-center gap-6 text-left">
                    <span className="text-xl font-bold opacity-50">{item.id}.</span>
                    <span className="text-xl md:text-2xl font-bold tracking-tight">{item.title}</span>
                  </div>
                  <div className="shrink-0">
                    {activeTab === item.id ? <Minus size={24} strokeWidth={2.5} /> : <Plus size={24} strokeWidth={2.5} />}
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-6 pb-10 md:pl-20">
                  <p className={`text-lg mb-8 leading-relaxed max-w-md ${activeTab === item.id ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.description}
                  </p>
                  <a 
                    href="#contacto" 
                    className="inline-flex items-center gap-2 bg-[#B61F1F] hover:bg-[#961a1a] text-white px-8 py-3.5 rounded-[5px] font-bold text-sm transition-all group shadow-lg shadow-red-900/20"
                  >
                    {item.buttonText}
                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Galería de Imágenes Dinámica */}
          <div className="sticky top-32 hidden lg:block h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
            {whyUsData.map((item) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                  activeTab === item.id ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-105 rotate-1"
                }`}
              />
            ))}
          </div>

          {/* Imagen para versión móvil (se muestra debajo del acordeón) */}
          <div className="lg:hidden h-[350px] w-full rounded-xl overflow-hidden shadow-xl mt-8 relative">
            {whyUsData.map((item) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  activeTab === item.id ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}