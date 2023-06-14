import { Box, Button, Container, Stack, Typography } from "@mui/material"
import ControlledTextField from "../../components/TextField"
import { useForm } from "react-hook-form"
import { baseURL } from "../../api"
import { useMutation } from "react-query"
import { LoadingButton } from "@mui/lab"
import { useNavigate } from "react-router-dom"
import { setToken } from "../../hooks/useTokenStorage"



const AuthLoginPage = () => {

    const navigate = useNavigate()
    const { control, handleSubmit } = useForm()

    const loginUser = async (data: any) => {
        const res = await fetch(
          `${baseURL}/auth/login`,
          { 
            method: 'post',
            body: JSON.stringify(data), 
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
          }
        )
        const json = await res.json()
        setToken(json?.token as string)
    }

    const { mutate, isLoading } = useMutation(loginUser, {
        onSettled: () => {
            navigate('/users')
        }
    });

    const onSubmit = async (data: any) => {
        try {
          mutate(data);
        } catch (e) {
          console.error(e)
        }
    };

    return (
        <Container maxWidth='xs'>
            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                style={{ height: "100%" }}
            >
                <Stack direction='column' spacing={2} mt={10}>
                    <Box mb={2}>
                        <Typography variant='h5' textAlign='center'>
                            Authentication
                        </Typography>
                    </Box>
                    <div>
                        <Typography variant="body2">
                            Email
                        </Typography>
                        <ControlledTextField 
                            formProps={{ fullWidth: true }}
                            controllerProps={{ 
                                name: 'email',
                                rules: { required: true },
                                control: control
                            }}
                        />
                    </div>
                    <div>
                        <Typography variant="body2">
                            Password
                        </Typography>
                        <ControlledTextField 
                            fullWidth
                            type="password"
                            controllerProps={{ 
                                name: 'password',
                                rules: { required: true },
                                control: control
                            }}
                        />
                    </div>
                    <LoadingButton 
                        type="submit"
                        variant="contained" 
                        sx={{ py: 1.4 }}
                        disabled={isLoading}
                        loading={isLoading}
                    >
                        Login
                    </LoadingButton>
                </Stack>
            </form>
        </Container>
    )
}

export default AuthLoginPage