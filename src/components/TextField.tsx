import React from "react";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  TextField as MuiTextField,
  TextFieldProps,
  FormControlProps,
} from "@mui/material";
import { Controller, ControllerProps } from "react-hook-form";

interface Props {
  controllerProps: Omit<ControllerProps, 'render'>,
  formProps?: FormControlProps
}

const ControlledTextField: React.FC<Props & TextFieldProps> = (props) => {
  const { 
    label, 
    formProps, 
    controllerProps, 
    fullWidth,
    ...others 
  } = props;

  return (
    <Controller
      {...controllerProps}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <FormControl
          fullWidth={fullWidth}
          variant="standard"
          {...formProps}
          error={!!error}
        >
          <InputLabel shrink htmlFor={`${name}-input`}>
            {label}
          </InputLabel>
          <MuiTextField
            size="small"
            sx={{ mt: label ? 2 : 0 }}
            required={controllerProps.rules?.required === true}
            {...others}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={!!error}
          />
          {error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default ControlledTextField;
