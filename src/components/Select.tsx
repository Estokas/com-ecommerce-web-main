import React from "react";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  FormControlProps,
  Select,
  SelectProps,
  MenuItem,
} from "@mui/material";
import { Controller, ControllerProps } from "react-hook-form";

interface Props {
  controllerProps: Omit<ControllerProps, "render">;
  formProps?: FormControlProps;
  items: Array<{ value: any, label: string }>
}

const ControlledSelect: React.FC<Props & SelectProps> = (props) => {
  const { items, label, formProps, controllerProps, fullWidth, ...others } = props;

  return (
    <Controller
      {...controllerProps}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <FormControl
          fullWidth={fullWidth}
          error={!!error}
          {...formProps}
        >
          <Select
            variant="outlined"
            required={controllerProps.rules?.required === true}
            {...others}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={!!error}
          >
            {items.map((item, id) => <MenuItem key={id} value={item.value}>{item.label}</MenuItem>)}
          </Select>
          {error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default ControlledSelect;
