import Switch from '@mui/material/Switch';
import React from 'react'
import { useMutation } from 'react-query';
import { baseURL } from '../../../api';

interface Props {
    id: string,
    value: boolean
}



const ProductSwitch: React.FC<Props> = (props) => {
    const { id, value } = props

    const [checked, setChecked] = React.useState(value);
    const { mutate } = useMutation(async (data: any) => {
        await fetch(
            `${baseURL}/update/product/${id}`,
            { 
              method: 'PUT',
              body: JSON.stringify(data), 
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
    });

    const handleChange = async (event: any) => {
        const newValue = event.target.checked
        try {
            mutate({ enable: newValue })
            setChecked(newValue); 
        } catch (e) {
            console.error(e)
        }
    }

    const handleClick = (e: any) => {
        e.stopPropagation()
    }

    return (
        <Switch 
            checked={checked} 
            size="small"
            onChange={handleChange} 
            onClick={handleClick}   
        />
    )
}

export default ProductSwitch