import { CircularProgress, FormControlLabel, FormHelperText, FormLabel, Stack, StackProps } from '@mui/material'
import React from 'react'


interface Props extends StackProps {
    text?: string
}

const LoadingComponent: React.FC<Props> = (props) => {
    const { text } = props
    return (
        <Stack 
            justifyContent='center'
            alignItems='center'
            sx={{ 
                width: '100%',
                height: '100%'
            }} 
            {...props} 
        >
            <Stack direction='row' alignItems='center' justifyContent='center' spacing={1} width='100%'>
                <CircularProgress size='0.875rem'/>
                <FormLabel>{text ? text : 'Loading'}</FormLabel>
            </Stack>
        </Stack>
    )
}

export default LoadingComponent