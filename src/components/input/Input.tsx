/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import type { UseFormRegister } from "react-hook-form";

interface Props extends ReturnType<UseFormRegister<any>> {
  label?: string;
  // type: "text" | "password";
}

type Ref = HTMLInputElement;

const Input = React.forwardRef<Ref, Props>((props, ref) => (
  <>
    <label className="block text-gray-300">
      {props.label}
      <input
        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-slate-400 shadow-sm
      invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none
      focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      disabled:border-slate-200 disabled:bg-slate-50
      disabled:text-slate-500 disabled:shadow-none"
        {...props}
        ref={ref}
      />
    </label>
  </>
));

export default Input;
