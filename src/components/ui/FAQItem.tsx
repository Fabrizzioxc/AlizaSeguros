'use client';


interface FAQItemProps {
  number: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ number, question, answer, isOpen, onToggle }: FAQItemProps) => {
  return (
    <button
      onClick={onToggle}
      className={`w-full text-left transition-all duration-300 ${
        isOpen
          ? 'bg-[#B61F1F] text-white'
          : 'bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-400'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between p-10 gap-4">
        {/* Número y pregunta */}
        <div className="flex items-start gap-6 flex-1">
          <span className={`text-3xl font-bold shrink-0 ${
            isOpen ? 'text-white' : 'text-gray-900'
          }`}>
            {number}
          </span>
          <h3 className={`text-lg font-semibold leading-tight pt-1 ${
            isOpen ? 'text-white' : 'text-gray-900'
          }`}>
            {question}
          </h3>
        </div>

        {/* Icono + y - */}
        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-white text-[#B61F1F]'
            : 'bg-transparent border-2 border-gray-300 text-gray-600'
        }`}>
          <span className="text-2xl font-light">
            {isOpen ? '−' : '+'}
          </span>
        </div>
      </div>

        {/* Contenido expandible */}
        <div
        className={`grid transition-all duration-300 ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
        >
        <div className="overflow-hidden">
            <div className={`px-10 pb-12 pt-0 ${isOpen ? 'text-white' : ''}`}>
            <p
                className={`leading-relaxed text-base ${
                isOpen ? 'text-white opacity-95' : 'text-gray-700'
                }`}
            >
                {answer}
            </p>
            </div>
        </div>
        </div>
    </button>
  );
};

export default FAQItem;