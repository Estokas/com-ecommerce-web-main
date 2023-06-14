import { Container, Stack, Typography } from "@mui/material"
import { ReactElement } from "react"
import { Outlet } from "react-router-dom"
import LoadingComponent from "../../components/LoadingComponent"
import { useQuery } from "react-query";
import TableContainer from "../../components/TableContainer";
import TableGrid from "../../components/TableGrid";
import UserListColumns from "./components/UserListColumns";
import CreateUserDrawer from "./CreateUser";
import { baseURL } from "../../api";
import { getToken } from "../../hooks/useTokenStorage";

const UserListPage = () => { 
    const { isLoading, data, refetch, error} = useQuery('users', 
        async () => {
            const res = await fetch(`${baseURL}/users`, {
                credentials: 'include',
                headers: { 'authorization': `Bearer ${getToken()}` }
            })
            return await res.json()
        }
    )
    const users = data as any

    const renderPage = (children: ReactElement) => (
        <Container sx={{ pt: 3 }}>
            <Stack direction='row' alignItems='center' justifyContent='end' mb={3}>
                <CreateUserDrawer onSubmit={() => refetch()} />
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

    if(users && users?.length == 0) {
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
                data={users}
                columns={UserListColumns}
                sx={{ '& .MuiTableCell-body': { py: '8px' } }}
            />
        </TableContainer>
    )
}

export default UserListPage