const text: any = {
  title: {
    en: "Privacy Policy",
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
  },
};

export default function Privacy() {
  return (
    <section className="px-20 min-h-screen">
      <h1 className="text-3xl mt-10 font-semibold text-cyan-600 text-center mb-8">
        Privacy policy
      </h1>
      {text.law.en.map((t: any, i: number) => (
        <p key={i} className="py-2 text-justify">
          {t}
        </p>
      ))}
    </section>
  );
}
