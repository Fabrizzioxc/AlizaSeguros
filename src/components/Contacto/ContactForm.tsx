"use client";

import { useState } from "react";
import { CustomTabs } from "../CustomTabs";
import { Building2, User, Send, FileText, Hash, Mail, Phone, AlertCircle, CheckCircle } from "lucide-react";

type TabType = "empresa" | "empleado";

interface FormData {
  tipoLead: TabType;
  tipoDocumento: string;
  numeroDocumento: string;
  razonSocial?: string;
  nombres?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  email: string;
  phone: string;
}

interface FormErrors {
  tipoDocumento?: string;
  numeroDocumento?: string;
  razonSocial?: string;
  nombres?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  email?: string;
  phone?: string;
  privacidad?: string;
}

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxR-tF8UJbeWX-Y8QoOeyRSGfLN6kOJxv7u07bYcSzH7kDiDdGBYEJEGhY44z4uBnu5cw/exec"; // Reemplaza con tu URL

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState<TabType>("empresa");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<FormData>({
    tipoLead: "empresa",
    tipoDocumento: "ruc",
    numeroDocumento: "",
    razonSocial: "",
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    email: "",
    phone: "",
  });

  const tabs = [
    { key: "empresa", label: "Empresa", icon: <Building2 size={18} /> },
    { key: "empleado", label: "Independiente", icon: <User size={18} /> },
  ] as const;

  const handleTabChange = (key: string) => {
    const newTab = key as TabType;
    setActiveTab(newTab);
    setFormData(prev => ({
      ...prev,
      tipoLead: newTab,
      tipoDocumento: newTab === "empresa" ? "ruc" : "dni",
    }));
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo al escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Validaciones
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar documento
    if (!formData.numeroDocumento.trim()) {
      newErrors.numeroDocumento = "El número de documento es requerido";
    } else if (activeTab === "empresa") {
      if (!/^\d{11}$/.test(formData.numeroDocumento)) {
        newErrors.numeroDocumento = "RUC debe tener 11 dígitos";
      }
    } else {
      if (formData.tipoDocumento === "dni" && !/^\d{8}$/.test(formData.numeroDocumento)) {
        newErrors.numeroDocumento = "DNI debe tener 8 dígitos";
      } else if (formData.tipoDocumento === "ce" && !/^\d{9}$/.test(formData.numeroDocumento)) {
        newErrors.numeroDocumento = "Carné de Extranjería debe tener 9 dígitos";
      }
    }

    // Validar campos dinámicos
    if (activeTab === "empresa") {
      if (!formData.razonSocial?.trim()) {
        newErrors.razonSocial = "La razón social es requerida";
      }
    } else {
      if (!formData.nombres?.trim()) {
        newErrors.nombres = "Los nombres completos son requeridos";
      }
      if (!formData.apellidoPaterno?.trim()) {
        newErrors.apellidoPaterno = "El apellido paterno es requerido";
      }
      if (!formData.apellidoMaterno?.trim()) {
        newErrors.apellidoMaterno = "El apellido materno es requerido";
      }
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    // Validar teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!/^\d{9}$/.test(formData.phone)) {
      newErrors.phone = "El teléfono debe tener 9 dígitos";
    }

    // Validar privacidad
    if (!privacyAccepted) {
      newErrors.privacidad = "Debes aceptar la política de privacidad";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Preparar datos para enviar
      const dataToSend = {
        secret: "ALIZA_SECRET_123",
        tipoLead: formData.tipoLead,
        tipoDocumento: formData.tipoDocumento,
        numeroDocumento: formData.numeroDocumento.replace(/\D/g, ""),
        ...(formData.tipoLead === "empresa" && { razonSocial: formData.razonSocial }),
        ...(formData.tipoLead === "empleado" && {
          nombres: formData.nombres,
          apellidoPaterno: formData.apellidoPaterno,
          apellidoMaterno: formData.apellidoMaterno,
        }),
        email: formData.email,
        phone: formData.phone,
      };

      // Enviar a Google Apps Script
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(dataToSend as Record<string, string>).toString(),
      });

      // Como usamos no-cors, no podemos leer la respuesta
      // Asumimos éxito si no hay error
      setSuccessMessage("¡Cotización enviada correctamente! Nos pondremos en contacto pronto.");
      setSubmitted(true);

      // Limpiar formulario
      setFormData({
        tipoLead: "empresa",
        tipoDocumento: "ruc",
        numeroDocumento: "",
        razonSocial: "",
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        email: "",
        phone: "",
      });
      setPrivacyAccepted(false);

      // Resetear mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSuccessMessage("");
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error al enviar:", error);
      setErrorMessage("Error al enviar la cotización. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

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
        onChange={handleTabChange}
        className="mb-8"
      />

      {/* Mensaje de Éxito */}
      {submitted && successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3">
          <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      )}

      {/* Mensaje de Error */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 font-['Inter']">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Tipo de Documento */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500 ml-1">Tipo de documento</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-[#B61F1F] transition-colors">
                <FileText size={18} strokeWidth={1.5} />
              </div>
              <select 
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-100 text-sm rounded-2xl focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F] block p-3.5 pl-11 appearance-none outline-none transition-all cursor-pointer"
              >
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
            {errors.tipoDocumento && (
              <p className="text-xs text-red-600 ml-1 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.tipoDocumento}
              </p>
            )}
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
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleInputChange}
                placeholder={activeTab === "empresa" ? "Ej. 20123456789" : "Ej. 70123456"}
                className={`w-full bg-gray-50 border text-sm rounded-2xl focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F] block p-3.5 pl-11 outline-none transition-all placeholder:text-gray-400 ${
                  errors.numeroDocumento ? "border-red-300" : "border-gray-100"
                }`}
              />
            </div>
            {errors.numeroDocumento && (
              <p className="text-xs text-red-600 ml-1 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.numeroDocumento}
              </p>
            )}
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
              <input 
                type="text" 
                name="razonSocial"
                value={formData.razonSocial || ""}
                onChange={handleInputChange}
                placeholder="Nombre de tu empresa" 
                className={`w-full bg-gray-50 border text-sm rounded-2xl p-3.5 pl-11 outline-none transition-all focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F] ${
                  errors.razonSocial ? "border-red-300" : "border-gray-100"
                }`}
              />
            </div>
            {errors.razonSocial && (
              <p className="text-xs text-red-600 ml-1 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.razonSocial}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-500 ml-1">Nombres completos</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-[#B61F1F] transition-colors">
                  <User size={18} strokeWidth={1.5} />
                </div>
                <input 
                  type="text" 
                  name="nombres"
                  value={formData.nombres || ""}
                  onChange={handleInputChange}
                  placeholder="Tus nombres" 
                  className={`w-full bg-gray-50 border text-sm rounded-2xl p-3.5 pl-11 outline-none transition-all focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F] ${
                    errors.nombres ? "border-red-300" : "border-gray-100"
                  }`}
                />
              </div>
              {errors.nombres && (
                <p className="text-xs text-red-600 ml-1 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.nombres}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-500 ml-1">Apellido paterno</label>
                <input 
                  type="text" 
                  name="apellidoPaterno"
                  value={formData.apellidoPaterno || ""}
                  onChange={handleInputChange}
                  placeholder="Ej. Pérez" 
                  className={`w-full bg-gray-50 border text-sm rounded-2xl p-3.5 outline-none transition-all focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F] ${
                    errors.apellidoPaterno ? "border-red-300" : "border-gray-100"
                  }`}
                />
                {errors.apellidoPaterno && (
                  <p className="text-xs text-red-600 ml-1 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.apellidoPaterno}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-500 ml-1">Apellido materno</label>
                <input 
                  type="text" 
                  name="apellidoMaterno"
                  value={formData.apellidoMaterno || ""}
                  onChange={handleInputChange}
                  placeholder="Ej. Gómez" 
                  className={`w-full bg-gray-50 border text-sm rounded-2xl p-3.5 outline-none transition-all focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F] ${
                    errors.apellidoMaterno ? "border-red-300" : "border-gray-100"
                  }`}
                />
                {errors.apellidoMaterno && (
                  <p className="text-xs text-red-600 ml-1 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.apellidoMaterno}
                  </p>
                )}
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
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@correo.com" 
                className={`w-full bg-gray-50 border text-sm rounded-2xl p-3.5 pl-11 outline-none transition-all focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F] ${
                  errors.email ? "border-red-300" : "border-gray-100"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 ml-1 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.email}
              </p>
            )}
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
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="999 999 999" 
                className={`w-full bg-gray-50 border text-sm rounded-2xl p-3.5 pl-24 outline-none transition-all focus:ring-4 focus:ring-[#B61F1F]/10 focus:border-[#B61F1F] ${
                  errors.phone ? "border-red-300" : "border-gray-100"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-600 ml-1 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Políticas de Privacidad */}
        <div className="space-y-3 pt-4 border-t border-gray-50">
          <label className="flex items-start gap-3 group cursor-pointer">
            <input 
              type="checkbox" 
              checked={privacyAccepted}
              onChange={(e) => {
                setPrivacyAccepted(e.target.checked);
                if (e.target.checked && errors.privacidad) {
                  setErrors(prev => ({ ...prev, privacidad: undefined }));
                }
              }}
              className="w-5 h-5 rounded border-gray-200 text-[#B61F1F] focus:ring-[#B61F1F]/20 mt-0.5" 
            />
            <span className="text-sm text-gray-500 leading-tight">He leído y acepto la <a href="/politicas-privacidad" className="text-[#B61F1F] font-semibold hover:underline">política de privacidad</a> y el tratamiento de mis datos.</span>
          </label>
          {errors.privacidad && (
            <p className="text-xs text-red-600 ml-1 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.privacidad}
            </p>
          )}
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-[#B61F1F] text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all group shadow-lg shadow-[#B61F1F]/10 hover:shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando..." : "Continuar"}
          {!loading && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
        </button>
      </form>
    </div>
  );
}