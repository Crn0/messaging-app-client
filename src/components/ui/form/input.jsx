import PropTypes from "prop-types";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

import FieldWrapper from "./field-wrapper";
import { useInputErrorHandler } from "../../../hooks";
import { cn } from "../../../utils";

const Input = forwardRef(
  ({ label, serverError, className, type, name, required, ...props }, ref) => {
    const {
      register,
      setError,
      formState: { errors },
    } = useFormContext();

    const error = useInputErrorHandler(name, {
      serverError,
      setError,
      formError: errors,
    });

    return (
      <FieldWrapper
        className='sm:h-auto sm:flex-0'
        label={label}
        error={error}
        isRequired={required}
      >
        <input
          name={name}
          type={type}
          aria-invalid={error?.message ? "true" : "false"}
          className={cn(
            "border-2 border-gray-900 bg-gray-950 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none",
            className
          )}
          ref={ref}
          {...register(name)}
          {...props}
        />
      </FieldWrapper>
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  label: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  serverError: PropTypes.instanceOf(Error),
};

export default Input;
