import React, { ReactElement } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, TableCellProps, SxProps, TableProps } from '@mui/material';
import { blue } from '@mui/material/colors';

export interface TableGridProps extends TableProps {
    columns: Array<{
        id: string,
        label?: string,
        padding?: TableCellProps['padding'],
        align?: TableCellProps['align'],
        hide?: boolean,
        render?: (value: any, row: any) => ReactElement,
        format?: (value: any) => ReactElement,
        style?: SxProps
    }>,
    data: Array<any>,
    disableHeader?: boolean,
    disableHover?: boolean,
    disableBorder?: boolean,
    spacing?: {
        row?: number,
        column?: number
    }
    onRowClick?: (row: any, index: number) => void
}

const TableGrid: React.FC<TableGridProps> = (props) => {
    const { 
        columns, 
        data,
        disableHeader,
        disableHover,
        disableBorder,
        spacing,
        onRowClick,
        ...others
    } = props

  return (
    <Table {...others}>
        {
            !disableHeader && (
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => 
                            column.hide === true ? null : (
                                <TableCell 
                                    key={column.id + index} 
                                    align={column.align}
                                    padding={column.padding}
                                >
                                    {column.label}
                                </TableCell>
                            )
                        )}
                    </TableRow>
                </TableHead>
            )
        }
        <TableBody>
            {data?.map((row, rowIndex) => (
                <TableRow 
                    onClick={() => onRowClick ? onRowClick(row, rowIndex) : null}
                    key={rowIndex} 
                    hover={!disableHover}
                    sx={{ 
                        cursor: disableHover ? 'auto' : 'pointer',
                        '&:hover .MuiTableCell-body': {
                            backgroundColor: disableHover ? 'transparent' : blue[50]
                        },
                    }}
                    tabIndex={-1}
                >
                    {columns.map((column, columnIndex) => {
                        const value = row[column.id];
                        if(column.hide === true) return null
                        return (
                            <TableCell
                                key={column.id + rowIndex + columnIndex}
                                align={column.align}
                                padding={column.padding}
                                sx={{ 
                                    ...column.style,  
                                    ...(disableBorder ? { border: 0 } : {}),
                                    ...(spacing ? {
                                        paddingLeft: columnIndex === 0 ? 0 : spacing.column,
                                        paddingRight: columnIndex === columns.length - 1 ? 0 : spacing.column,
                                        paddingTop: rowIndex === 0 ? 0 : spacing.row,
                                        paddingBottom: rowIndex === data.length - 1 ? 0 : spacing.row,
                                    } : {})
                                }}
                            >
                                {column?.render 
                                    ? column.render(value, row) 
                                    : column?.format 
                                    ? column.format(value)
                                    : value
                                }
                            </TableCell>
                        )
                    })}
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}


export default TableGrid