export const PolicySection = ({id, title, content, subsections }) => (
    <div className="mb-8">
      <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">{id}. {title}</h2>
      {content && <p className="text-[#535862] mt-6 sm:mt-8">{content}</p>}
      {subsections?.map((subsection, index) => (
        <div key={index} className="mt-4">
          {subsection.title && (
            <h3 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8">
              {subsection.title } 
            </h3>
          )}
          {subsection.items && (
            <ul className="custom-list ms-4 text-[#535862]">
              {subsection.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );