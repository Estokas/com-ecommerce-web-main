import { Avatar, Card, CardContent, CardHeader, CardMedia, Chip, Grid, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import ServiceSwitch from "./ServiceSwitch";
import { baseHost, baseURL } from "../../../api";

interface Props {
    service: any;
}

const ServiceCard: React.FC<Props> = (props) => {
    const { service } = props;

    return (
        <Card variant="outlined" sx={{ display: 'flex' }}>
            <CardMedia sx={{ flexShrink: 1, width: '40%'  }}>
                <Avatar 
                    sx={{ height: 130, width: '100%' }} 
                    variant="square"
                    src={`${baseHost}/public/images/${service?.image?.filename}`}
                >
                </Avatar>
            </CardMedia>
            <CardContent 
                sx={{ 
                    flex: 1,
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    overflow: 'hidden'
                }}
            >
                <CardHeader 
                    sx={{ 
                        alignItems: 'center', 
                        display: 'flex',
                        flexDirection: 'row',
                        p: 0,
                        pt: 1
                    }}
                    title={service.name} 
                    action={
                        <ServiceSwitch id={service._id} value={service.enable} />
                    }
                />
                <Stack 
                    direction={{ xs: 'column', lg: 'row' }}
                    alignItems={{ xs: 'start', lg: 'center' }} 
                    justifyContent={{ xs: 'flex-end', lg: 'space-between' }}
                    spacing={{ xs: 1, lg: 2 }}
                >
                    <div>
                        <Typography 
                            variant="body2" 
                            color="text.secondary"
                            textOverflow='ellipsis'
                            whiteSpace='nowrap'
                            sx={{ 
                                maxWidth: 130,
                                overflow: 'hidden'
                            }}                            
                        >
                            {service.description}
                        </Typography>
                        {/* <Rating size="small" value={2} readOnly /> */}
                    </div>
                    <Chip label={`$${service.fee}`} />
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ServiceCard;
