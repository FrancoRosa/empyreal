"use client";

import { getLang } from "@/js/helpers";
import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

const text: any = {
  title: {
    en: "Support form",
    es: "Formulario de soporte tecnico y consultas",
  },
  success: {
    en: "Your message was successfully sent. A team member will reach you out shortly",
    es: "Tu mensaje fue enviado. Uno de nuestros colaboradores se pondra en contacto contigo a la brevedad",
  },
  submit: {
    en: "Submit",
    es: "Enviar",
  },
  label: {
    name: {
      en: "Name",
      es: "Nombre",
    },
    email: {
      en: "Email",
      es: "Email",
    },
    subject: {
      en: "Subject",
      es: "Asunto",
    },
    message: {
      en: "Message",
      es: "Mensaje",
    },
  },
};

export default function Privacy() {
  const lang = getLang();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const myForm = e.target;
    const formData: any = new FormData(myForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        console.log("Form successfully submitted");
        setLoading(false);
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setSuccess(true);
      });
  };

  return (
    <section className="px-20 min-h-screen">
      <h3 className="text-center font-semibold py-4 text-2xl">
        {text.title[lang]}
      </h3>
      {success ? (
        <p className="text-center mt-10">{text.success[lang]}</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          netlify-honeypot="bot-field"
          data-netlify="true"
          name="supportForm"
          method="POST"
        >
          <input type="hidden" name="form-name" value="supportForm" />
          <input className="hidden" name="bot-field" />
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {text.label.name[lang]}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {text.label.email[lang]}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {text.label.subject[lang]}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {text.label.message[lang]}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
            />
          </div>
          <div data-netlify-recaptcha="true"></div>
          <button
            type="submit"
            className="relative w-40 text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 disabled:bg-gray-600"
            disabled={loading}
          >
            {loading && (
              <BiLoaderAlt className="absolute bottom-2 animate-spin text-2xl" />
            )}
            {text.submit[lang]}
          </button>
        </form>
      )}
    </section>
  );
}
