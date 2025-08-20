import React from 'react';

function InputField({ label, id, type = 'text' }) {
  return (
    <>
      <label htmlFor={id} className="self-start">{label}</label>
      <input
        type={type}
        id={id}
        className="flex shrink-0 mt-1 max-w-full bg-white rounded-xl h-[38px] w-[284px]"
      />
    </>
  );
}

export default InputField;