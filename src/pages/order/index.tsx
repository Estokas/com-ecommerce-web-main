import { Container, Stack, Typography } from "@mui/material"
import { ReactElement } from "react"
import { Outlet } from "react-router-dom"
import LoadingComponent from "../../components/LoadingComponent"
import { useQuery } from "react-query";
import { baseURL } from "../../api";
import OrderListColumns from "./components/OrderListColumns";
import TableGrid from "../../components/TableGrid";
import TableContainer from "../../components/TableContainer";
import { getToken } from "../../hooks/useTokenStorage";

const OrderListPage = () => { 

    const { isLoading, data, error} = useQuery('orders', 
        async () => {
            const res = await fetch(`${baseURL}/orders`, {
                credentials: 'include',
                headers: { 'authorization': `Bearer ${getToken()}` }
            })
            return await res.json()
        }
    )
    const orders = data

    const renderPage = (children: ReactElement) => (
        <Container sx={{ pt: 3 }}>
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

    if(orders && orders?.length == 0) {
        return renderPage(
            <Stack padding={5} width='100%' alignItems='center'>
                <Typography sx={{ maxWidth: 250, fontSize: '0.8rem', textAlign: 'center' }} color='#a0a0a0'>
                    Hmm, we couldn't find any results that matches your query. Try another?
                </Typography>
            </Stack>
        )
    }


    return renderPage(
        <TableContainer disablePaginate>
            <TableGrid
                data={orders}
                columns={OrderListColumns}
                sx={{ '& .MuiTableCell-body': { py: '8px' } }}
            />
        </TableContainer>
    )
}

export default OrderListPage