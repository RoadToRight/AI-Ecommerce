import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React from 'react'

const Table = ({ data, columns }) => {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div>

            {/* Table Header */}
            {table.getHeaderGroups().map(headerGroup => (
                <div key={headerGroup.id} style={{ display: 'flex', backgroundColor: '#f3f4f6' }}>
                    {headerGroup.headers.map(header => (
                        <div
                            key={header.id}
                            style={{
                                flex: 1,
                                padding: '10px',
                                fontWeight: 'bold',
                                borderRight: '1px solid #ddd',
                            }}
                        >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                    ))}
                </div>
            ))}


            {/* Table Body */}
            {table.getRowModel().rows.map(row => (
                <div key={row.id} style={{ display: 'flex', borderTop: '1px solid #ddd' }}>
                    {row.getVisibleCells().map(cell => (
                        <>
                            <div
                                key={cell.id}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    borderRight: '1px solid #ddd',
                                    color: `var(--color-list)`
                                    
                                }}
                             
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                        </>
                    ))}
                </div>
            ))}

        </div>
    )
}

export default Table
