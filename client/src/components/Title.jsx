import React from "react";

const Title = ({ title, subTitle, align }) => {
  return (
    <div
      className={`flex max-w-2xl flex-col items-center justify-center text-center ${align === "left" ? "items-start md:text-left" : ""}`}
    >
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
