import React from 'react';

function Button({ text }) {
  return (
    <button className="px-16 py-2.5 mt-3 max-w-full text-white bg-sky-500 rounded-xl w-[278px]">
      {text}
    </button>
  );
}

export default Button;