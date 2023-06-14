import { Avatar, Box, Button, FormHelperText, Grid, IconButton, Stack, Switch, Typography } from "@mui/material";
import TableGrid, { TableGridProps } from "../../../components/TableGrid";
import TextField from "../../../components/TextField";
import { Controller } from "react-hook-form";
import FileUpload from "../../../components/FileUpload";

const columns: TableGridProps["columns"] = [
  {
    id: "label",
    style: {
      width: 175,
    },
  },
  {
    id: "field",
    render: (value) => (
      <Stack direction="row" alignItems="center" justifyContent="start">
        {value}
      </Stack>
    ),
  },
];

const rows = [
  {
    label: "Name",
    field: (
      <TextField
        fullWidth
        controllerProps={{
          name: "name",
          rules: { required: true },
        }}
      />
    ),
  },
  {
    label: "Description",
    field: (
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder="type here..."
        controllerProps={{
          name: "description",
        }}
      />
    ),
  },
  {
    label: "Category",
    field: (
      <TextField
        fullWidth
        controllerProps={{
          name: "category",
          rules: { required: true },
        }}
      />
    ),
  },
  {
    label: "Price",
    field: (
      <TextField
        fullWidth
        type="number"
        InputProps={{
          startAdornment: '$'
        }}
        controllerProps={{
          name: "price",
          rules: { required: true },
        }}
      />
    ),
  },
  {
    label: "Variant",
    field: (
      <TextField
        fullWidth
        controllerProps={{
          name: "variant",
        }}
      />
    ),
  },
  {
    label: 'Enable',
    field: (
        <Controller 
          name="enable"
          defaultValue={true}
          render={({ field: { value, onChange } }) => (
            <Switch 
              checked={value} 
              size="small"
              onChange={onChange} 
            />
          )}
        />
    ),
  }
];

const CreateProductForm = () => {
  return (
    <Stack direction="column" spacing={4} sx={{ pt: 3 }}>
      <Box sx={{ px: 3 }}>
        <TableGrid
          disableHeader
          disableHover
          disableBorder
          spacing={{
            row: 2,
          }}
          data={rows}
          columns={columns}
        />
      </Box>
      <Box sx={{ px: 3 }}>
        <Typography variant="body2" mb={1}>Image</Typography>
        <Controller 
          name="image"
          rules={{ required: 'This is required' }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <FileUpload
              value={value}
              multiple={false}
              accept=".jpg, .png, .jpeg"
              onChange={onChange}
              error={error?.message}
              render={({ inputComponent, field: { files, remove } }) => (
                <>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    {
                      files && files.map((file: any, index: number) => (
                        <Grid item xs='auto'>
                          <Avatar 
                            sx={{ 
                              height: 105, 
                              width: 120,
                              borderRadius: 1,
                              borderWidth: 2,
                              borderStyle: 'solid',
                              borderColor: 'primary.main',
                              cursor: 'pointer'
                            }} 
                            variant="square"
                            src={file ? URL.createObjectURL(file) : ''}
                            onClick={remove(index)}
                          >
                            {''}
                          </Avatar>
                        </Grid>
                      ))
                    }
                    <Grid item xs='auto'>
                      <Button 
                        disabled={!!files}
                        size="small"
                        variant="outlined" 
                        component="label"
                        sx={{ 
                          color: 'primary.main',
                          borderStyle: 'dashed',
                          height: '105px',
                          width: '120px'
                        }}
                      >
                        Upload Image
                        {inputComponent}
                      </Button>
                    </Grid>
                  </Grid>
                  {error && (
                    <FormHelperText error sx={{ mt: 1 }}>
                      {error.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          )}
        />
      </Box>
    </Stack>
  );
};

export default CreateProductForm;
