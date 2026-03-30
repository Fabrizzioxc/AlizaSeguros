'use client';

import { useState } from 'react';
import FAQItem from '../components/ui/FAQItem';

const FAQ = () => {
  const [openId, setOpenId] = useState<string | null>('01');

  const faqs = [
    {
      number: "01",
      question: "¿Cuánto tiempo tarda en activarse mi SCTR?",
      answer: "La activación puede realizarse el mismo día, dependiendo de la información proporcionada. En la mayoría de casos, recibirás tu certificado en pocas horas para que puedas ingresar a obra sin retrasos."
    },
    {
      number: "02",
      question: "¿El SCTR es válido para ingresar a obras y proyectos en Perú?",
      answer: "Sí. El SCTR que gestionamos cumple con todos los requisitos exigidos por empresas, contratistas y supervisiones en sectores como construcción, minería e industria, permitiéndote ingresar a obra sin inconvenientes."
    },
    {
      number: "03",
      question: "¿Qué sucede si SUNAFIL realiza una inspección y no tengo el seguro activo?",
      answer: "Podrías enfrentar multas elevadas, paralización de actividades e incluso problemas legales. Además, asumirías todos los costos en caso de accidente laboral. Tener el SCTR activo evita estos riesgos."
    },
    {
      number: "04",
      question: "¿Puedo contratar el SCTR si soy trabajador independiente?",
      answer: "Sí. Si eres técnico, contratista o trabajas por tu cuenta, puedes contratar tu SCTR para cumplir con los requisitos de empresas y acceder a proyectos sin restricciones."
    },
    {
      number: "05",
      question: "¿Qué cubre el SCTR y por qué es importante tenerlo?",
      answer: "El SCTR cubre accidentes de trabajo y enfermedades ocupacionales. Incluye atención médica, hospitalización y, en casos graves, indemnizaciones o pensiones. Es clave para proteger al trabajador y cumplir con la normativa."
    },
    {
      number: "06",
      question: "¿Qué información necesito para cotizar mi SCTR?",
      answer: "Solo necesitas datos básicos como tipo de actividad, Planilla total de los trabajadores, remuneración de cada trabajador y documento de identidad o RUC. Con eso podemos enviarte una cotización rápida."
    }
  ];

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="space-y-4">
        {faqs.map((faq) => (
          <FAQItem
            key={faq.number}
            number={faq.number}
            question={faq.question}
            answer={faq.answer}
            isOpen={openId === faq.number}
            onToggle={() => toggleFAQ(faq.number)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;