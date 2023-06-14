import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { blue, grey, lightBlue } from '@mui/material/colors';


export let theme = createTheme({
    typography: {
        button: {
            fontSize: '0.8rem',
            fontWeight: 'meduim'
        }
    },
    mixins: {
        toolbar: {
            minHeight: 50,
        },
    },
});
theme = {
    ...theme,
    typography: {
        ...theme.typography,
        fontFamily: 'Inter',
    },
    components: {
        ...theme.components,
        MuiInputBase: {
            styleOverrides: {
                input: {
                    height: 'auto',
                    fontSize: '0.875rem',
                },
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    padding: '0.4rem 0.75rem',
                },
                root: {
                    '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: grey[800],
                            transition: 'all 300ms'
                        },
                    },
                    '&.Mui-focused': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: grey[800],
                        },
                    },
                    '&.Mui-error': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: theme.palette.error.dark,
                        },
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px',
                        borderColor: 'transparent',
                        borderStyle: 'solid'
                    },
                    '& .MuiInputBase-inputMultiline': {
                        padding: 0
                    },
                    backgroundColor: grey[50],
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: theme.palette.divider,
                    color: grey[800],
                    borderRadius: '0.375rem',

                    '& .MuiInputBase-adornedStart': {
                        paddingLeft: '12px'
                    }
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: '0.25rem',
                    lineHeight: '1rem',
                    color: '#fff'
                },
                contained: {
                    boxShadow: 'none',
                    '&:active': {
                        boxShadow: 'none',
                    },
                    '&.Mui-disabled': {
                        cursor: 'not-allowed',
                        opacity: '0.4', 
                        color: 'unset',
                        backgroundColor: theme.palette.primary.main
                    },
                    border: 1,
                },
                containedPrimary: {
                    backgroundColor: theme.palette.info.dark,
                },
                containedSecondary: {
                    backgroundColor: '#2e2e2e',
                    '&:hover': {
                        backgroundColor: theme.palette.grey[800]
                    }
                },
                sizeLarge: {
                    padding: '8px 10px',
                }
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    padding: '3px 24px',
                    '&:hover': {
                        backgroundColor: grey[200],
                    },
                    color: blue[600],
                    '&.Mui-selected': {
                        color: theme.palette.primary.main,
                    },
                },
            },
        },  
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: grey[800],
                    fontSize: '0.9rem',
                    fontWeight: theme.typography.fontWeightMedium,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: 'inherit',
                    minWidth: 'auto',
                    marginRight: theme.spacing(2),
                    '& svg': {
                        fontSize: 20,
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: theme.palette.divider,
                    padding: '12px 16px 12px 24px',
                    color: grey[800],
                    fontSize: '0.8rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    '&.MuiTableCell-head': {
                        padding: '12px 16px 12px 24px',
                        color: grey[800],
                        fontSize: '0.8rem',
                        backgroundColor: grey[100],
                        borderColor: grey[300],
                    },
                    '& .MuiIconButton-root': {
                        '& .MuiSvgIcon-root': {
                            color: '#2e2e2e',
                        },
                    },
                    '&:hover .MuiIconButton-root': {
                        '& .MuiSvgIcon-root': {
                            color: '#a0a0a0'
                        },
                    }
                }
            }
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    cursor: 'pointer',
                    '&:last-child .MuiTableCell-body': {
                        borderBottom: 0,
                    },
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: '0.25rem'
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                filled: {
                    padding: 0,
                    borderRadius: '0.375rem',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: grey[300],
                    backgroundColor: grey[100],
                    height: 'auto'
                },
                label: {
                    padding: '2px 5px',
                    fontSize: '0.7rem',
                    color: grey[500]
                },
                deleteIcon: {
                    marginLeft: 0,
                    fontSize: '1.15rem',
                    color: theme.palette.secondary.dark,
                    '&:hover': {
                        color: theme.palette.secondary.light
                    }
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                title: {
                    fontSize: '1rem'
                },
                root: {
                    paddingBottom: '10px'
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    '&:last-child': {
                        paddingTop: '10px',
                        paddingBottom: '10px'
                    }
                }
            }
        }
    }
}


const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    )
}

export default ThemeProvider