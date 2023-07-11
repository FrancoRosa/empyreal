export const metadata = {
  title: "rtklink | Privacy policy",
  description: "Your positioning partner in the field",
};

const text: any = {
  title: {
    en: "Privacy Policy",
    es: "Politica de privacidad",
  },
  law: {
    en: [
      "In compliance with the provisions of Organic Law 15/1999 of December 13, Protection of Personal Data, RTKLINK communicates that:",
      "In accordance with Art.5 of the aforementioned Law, it is reported that the data entered in the forms will be stored in an automated file, property of RTKLINK, which guarantees the normative security measures required.",
      "The purpose for which the forms provided are intended, is the subsequent contact of the entity with users who have requested to make a request to our company or for any other query that the user wants to make us.",
      "When the data is collected from the form and not from another open field such as mail contact, it will be necessary to provide, at least, those fields marked with an asterisk, since, otherwise, RTKLINK will not be able to accept or manage compliance of the established relationship.",
      "RTKLINK is responsible for the files and undertakes not to assign the data to a different purpose for which they were collected, or to assign them illegitimately to third parties. It also undertakes to treat your data confidentially and to apply the technical, organizational and security measures necessary to avoid its treatment or unauthorized access as established by current regulations on data protection.",
      "The users will respond, in any case, of the truthfulness of the data provided, reserving on the part of RTKLINK the right to exclude from the registered services any user that has provided false or erroneous information, without prejudice to the other actions that proceed in Law.",
      "To exercise your rights of access, rectification, cancellation and opposition, you must send a written document identifying the reference “Data Protection” to support@rtklink.com.",
    ],
    es: [
      "En cumplimiento de lo establecido en la Ley Orgánica 15/1999, de 13 de diciembre, de Protección de Datos de Carácter Personal, RTKLINK comunica lo siguiente:",
      "De acuerdo con el Artículo 5 de la mencionada Ley, se informa que los datos introducidos en los formularios serán almacenados en un archivo automatizado, propiedad de RTKLINK, que garantiza las medidas de seguridad normativas requeridas.",
      "El propósito para el cual se proporcionan los formularios es el contacto posterior de la entidad con los usuarios que hayan solicitado hacer una solicitud a nuestra empresa o cualquier otra consulta que el usuario desee realizar.",
      "Cuando los datos se recopilan del formulario y no de otro campo abierto como el contacto por correo, será necesario proporcionar, al menos, los campos marcados con un asterisco, ya que, de lo contrario, RTKLINK no podrá aceptar o gestionar el cumplimiento de la relación establecida.",
      "RTKLINK es responsable de los archivos y se compromete a no asignar los datos a un fin distinto para el cual fueron recopilados ni asignarlos ilegítimamente a terceros. También se compromete a tratar sus datos de manera confidencial y aplicar las medidas técnicas, organizativas y de seguridad necesarias para evitar su tratamiento o acceso no autorizado, según lo establecido por las normativas vigentes en materia de protección de datos.",
      "Los usuarios serán responsables, en todo caso, de la veracidad de los datos proporcionados, reservándose RTKLINK el derecho de excluir de los servicios registrados a cualquier usuario que haya proporcionado información falsa o errónea, sin perjuicio de las demás acciones que correspondan en Derecho.",
      "Para ejercer sus derechos de acceso, rectificación, cancelación y oposición, deberá enviar un documento escrito identificando la referencia 'Protección de Datos' a support@rtklink.com.",
    ],
  },
};

export default function Privacy({ params }: { params: { lang: string } }) {
  return (
    <section className="px-20 min-h-screen">
      <h3 className="text-center font-bold py-4">{text.title[params.lang]}</h3>
      {text.law[params.lang].map((t: any, i: number) => (
        <p key={i} className="py-2 text-justify">
          {t}
        </p>
      ))}
    </section>
  );
}
