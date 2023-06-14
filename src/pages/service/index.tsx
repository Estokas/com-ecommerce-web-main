import { Container, Grid, Stack, Typography } from "@mui/material"
import { ReactElement } from "react"
import { Outlet } from "react-router-dom"
import LoadingComponent from "../../components/LoadingComponent"
import { useQuery } from "react-query";
import CreateServiceDrawer from "./CreateService";
import { baseURL } from "../../api";
import ServiceCard from "./components/ServiceCard";
import { getToken } from "../../hooks/useTokenStorage";

const ServiceListPage = () => { 

    const { isLoading, data, refetch, error} = useQuery('users', 
        async () => {
            const res = await fetch(`${baseURL}/services`, {
                credentials: 'include',
                headers: { 'authorization': `Bearer ${getToken()}` }
            })
            return await res.json()
        }
    )
    const services = data

    const renderPage = (children: ReactElement) => (
        <Container sx={{ pt: 3 }}>
            <Stack direction='row' alignItems='center' justifyContent='end' mb={3}>
                <CreateServiceDrawer onSubmit={() => refetch()} />
            </Stack>
            <Outlet />
            {children}
        </Container>
    )

    if(isLoading) {
        return renderPage(<LoadingComponent />)
    }

    if(error) {
        return renderPage(
            <Stack padding={5} width='100%' alignItems='center'>
                <Typography sx={{ maxWidth: 250, fontSize: '0.8rem', textAlign: 'center' }} color='#a0a0a0'>
                    {(error as any)?.message}
                </Typography>
            </Stack>
        )
    }

    if(services && services?.length == 0) {
        return renderPage(
            <Stack padding={5} width='100%' alignItems='center'>
                <Typography sx={{ maxWidth: 250, fontSize: '0.8rem', textAlign: 'center' }} color='#a0a0a0'>
                    Hmm, we couldn't find any results that matches your query. Try another?
                </Typography>
            </Stack>
        )
    }


    return renderPage(
        <Grid container alignItems='center' spacing={2}>
            {services.map((service: any) => (
                <Grid item xs={12} md={4} lg={4}>
                    <ServiceCard service={service} />
                </Grid>
            ))}
        </Grid>
    )
}

export default ServiceListPage