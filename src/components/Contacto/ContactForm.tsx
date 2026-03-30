"use client";

import { useState } from "react";
import { CustomTabs } from "../CustomTabs";
import { Building2, User, Send, FileText, Hash, Mail, Phone } from "lucide-react";

type TabType = "empresa" | "empleado";

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState<TabType>("empresa");

  const tabs = [
    { key: "empresa", label: "Empresa", icon: <Building2 size={18} /> },
    { key: "empleado", label: "Independiente", icon: <User size={18} /> },
  ] as const;

  return (
    <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-2xl shadow-black/5 border border-gray-100 w-full max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-black mb-2 tracking-tight">
          ¡Obtén una cotización ahora!
        </h3>
        <p className="text-sm text-gray-500">
          Completa tus datos y recibe tu SCTR rápidamente.
        </p>
      </div>

      <CustomTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onChange={(key) => setActiveTab(key as TabType)}
        className="mb-8"
      />

      <form className="space-y-5 font-['Inter']">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Tipo de Documento */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500 ml-1">Tipo de documento</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-[#B61F1F] transition-colors">
                <FileText size={18} strokeWidth={1.5} />
              </div>
              <select className="w-full bg-gray-50 border border-gray-100 text-sm rounded-2xl focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F] block p-3.5 pl-11 appearance-none outline-none transition-all cursor-pointer">
                {activeTab === "empresa" ? (
                  <option value="ruc">RUC</option>
                ) : (
                  <>
                    <option value="dni">DNI</option>
                    <option value="ce">Carné de Extranjería</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Número de Documento */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500 ml-1">Número de documento</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-[#B61F1F] transition-colors">
                <Hash size={18} strokeWidth={1.5} />
              </div>
              <input 
                type="text" 
                placeholder={activeTab === "empresa" ? "Ej. 20123456789" : "Ej. 70123456"}
                className="w-full bg-gray-50 border border-gray-100 text-sm rounded-2xl focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F] block p-3.5 pl-11 outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Campos Dinámicos según Tab */}
        {activeTab === "empresa" ? (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500 ml-1">Razón social</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-[#B61F1F] transition-colors">
                <Building2 size={18} strokeWidth={1.5} />
              </div>
              <input type="text" placeholder="Nombre de tu empresa" className="w-full bg-gray-50 border border-gray-100 text-sm rounded-2xl p-3.5 pl-11 outline-none transition-all focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F]" />
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-500 ml-1">Nombres completos</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-[#B61F1F] transition-colors">
                  <User size={18} strokeWidth={1.5} />
                </div>
                <input type="text" placeholder="Tus nombres" className="w-full bg-gray-50 border border-gray-100 text-sm rounded-2xl p-3.5 pl-11 outline-none transition-all focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F]" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-500 ml-1">Apellido paterno</label>
                <input type="text" placeholder="Ej. Pérez" className="w-full bg-gray-50 border border-gray-100 text-sm rounded-2xl p-3.5 outline-none transition-all focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F]" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-500 ml-1">Apellido materno</label>
                <input type="text" placeholder="Ej. Gómez" className="w-full bg-gray-50 border border-gray-100 text-sm rounded-2xl p-3.5 outline-none transition-all focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F]" />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Correo */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500 ml-1">Correo electrónico</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-[#B61F1F] transition-colors">
                <Mail size={18} strokeWidth={1.5} />
              </div>
              <input type="email" placeholder="tu@correo.com" className="w-full bg-gray-50 border border-gray-100 text-sm rounded-2xl p-3.5 pl-11 outline-none transition-all focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F]" />
            </div>
          </div>

          {/* Teléfono con Prefijo */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500 ml-1">Teléfono</label>
            <div className="relative group flex items-center">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-[#B61F1F] transition-colors">
                <Phone size={18} strokeWidth={1.5} />
              </div>
              <div className="absolute left-11 flex items-center pointer-events-none">
                <span className="text-sm text-gray-400 font-medium">+51</span>
                <div className="h-4 w-px bg-gray-200 ml-2"></div>
              </div>
              <input type="tel" placeholder="999 999 999" className="w-full bg-gray-50 border border-gray-100 text-sm rounded-2xl p-3.5 pl-24 outline-none transition-all focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F]" />
            </div>
          </div>
        </div>

        {/* Políticas de Privacidad */}
        <div className="space-y-3 pt-4 border-t border-gray-50">
          <label className="flex items-start gap-3 group cursor-pointer">
            <input type="checkbox" className=" w-5 h-5 rounded border-gray-200 text-[#B61F1F] focus:ring-[#B61F1F]/20" />
            <span className="text-sm text-gray-500 leading-tight">He leído y acepto la <a href="/politicas-privacidad" className="text-[#B61F1F] font-semibold hover:underline">política de privacidad</a> y el tratamiento de mis datos.</span>
          </label>
        </div>

        <button className="w-full bg-[#B61F1F] text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all group shadow-lg shadow-[#B61F1F]/10 hover:shadow-black/10">
          Continuar
          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}