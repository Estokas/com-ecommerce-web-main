import { Container, Grid, Stack, Typography } from "@mui/material"
import { ReactElement } from "react"
import { Outlet } from "react-router-dom"
import LoadingComponent from "../../components/LoadingComponent"
import { useQuery } from "react-query";
import CreateProductDrawer from "./CreateProduct";
import { baseURL } from "../../api";
import { getToken } from "../../hooks/useTokenStorage";
import ServiceCard from "./components/ServiceCard";

const ProductListPage = () => { 

    const { isLoading, data, refetch, error} = useQuery('products', 
        async () => {
            const res = await fetch(`${baseURL}/products`, {
                credentials: 'include',
                headers: { 'authorization': `Bearer ${getToken()}` }
            })
            return await res.json()
        }
    )
    const products = data

    const renderPage = (children: ReactElement) => (
        <Container sx={{ pt: 3 }}>
            <Stack direction='row' alignItems='center' justifyContent='end' mb={3}>
                <CreateProductDrawer onSubmit={() => refetch()} />
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

    if(products && products?.length == 0) {
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
            {products.map((product: any) => (
                <Grid item xs={12} md={4} lg={4}>
                    <ServiceCard service={product} />
                </Grid>
            ))}
        </Grid>
    )
}

export default ProductListPage