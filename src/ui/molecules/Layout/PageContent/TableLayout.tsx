import { Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { ButtonComponent, Icons } from '../../../atoms';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { Actions } from '../../../../utils';

interface Props {
  data: any[];
  cols: any[];
  action?: {
    setSelection: (Prop: any) => void;
    setAction: (Prop: Actions) => void;
    actions: Actions[];
  };
}

const TableLayout = ({ data, cols, action }: Props) => {
  const tableIstance = useReactTable({
    data: data,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
  });

  const columnModel = tableIstance.getHeaderGroups();
  const rowModel = tableIstance.getRowModel();

  const [isOpenFilter, setIsOpenFilter] = useState(false);

  return (
    <Flex flexDirection={'column'} height={'100%'}>
      {/* sopra tabella */}
      <Flex flexDirection={'row'}>
        {action?.actions.includes('Add') ? (
          <ButtonComponent
            onClick={() => action.setAction('Add')}
            style={{
              background: 'rgba(239, 66, 111, 1)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontSize: '20px',
              padding: '8px 15px 8px 15px',
            }}
          >
            <Icons name='Add' size={32} />
            Aggiungi nuovo
          </ButtonComponent>
        ) : null}

        <ButtonComponent
          onClick={() => setIsOpenFilter(!isOpenFilter)}
          style={{
            background: 'rgba(239, 66, 111, 1)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontSize: '20px',
            padding: '8px 15px 8px 15px',
            marginLeft: 'auto',
            width: '110px',
            justifyContent: 'flex-end',
          }}
        >
          {isOpenFilter ? (
            <Icons name='Add' size={32} rotation='45deg' />
          ) : (
            <Icons name='MagnifyingGlass' size={32} color='white' />
          )}
          Filtra
        </ButtonComponent>
      </Flex>
      {/* tabella */}

      <TableContainer
        style={{
          border: '1px solid rgba(81, 70, 137, 0.7)',
          borderRadius: '10px',
          margin: '15px 0 15px 0',
          height: '100%',
          fontSize: '20px',
          position: 'relative',
        }}
      >
        {isOpenFilter ? (
          <Flex
            flexDirection='column'
            background='white'
            borderRadius='10px'
            boxShadow='-2px 2px 4px 0px rgba(81, 70, 137, 0.3)'
            position='absolute'
            zIndex='10'
            width='310px'
            height='100%'
            right='0'
          >
            <Flex flexDirection='row' padding='17px' alignItems='center'>
              <span>Filtri</span>
              <div style={{ marginLeft: 'auto' }} onClick={() => setIsOpenFilter(!isOpenFilter)}>
                <Icons name='Close' size={24} color='rgba(81, 70, 137, 1)' />
              </div>
            </Flex>
            <hr className='hrgray' style={{ margin: '0 17px 0 17px' }} />
            <div style={{ height: '100%', padding: '17px', overflowY: 'scroll' }}>dfd</div>
            <div style={{ padding: '17px' }}>rere</div>
          </Flex>
        ) : null}
        <Table className='styledTable' variant='striped' colorScheme='gray' width='100%'>
          <Thead>
            {columnModel.map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.index}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Th>
                ))}
                {action ? <Th>Azioni</Th> : null}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {rowModel.rows.map((row) => (
              <Tr key={row.index}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
                ))}
                {action ? (
                  <Td>
                    {action.actions.includes('Edit') ? (
                      <span
                        onClick={() => {
                          action.setAction('Edit');
                          action.setSelection(row.original);
                        }}
                        style={{ marginRight: '5px' }}
                      >
                        <Icons name='Edit' size={26} color='rgba(81, 70, 137, 0.5)' />
                      </span>
                    ) : null}
                    {action.actions.includes('Delete') ? (
                      <span
                        onClick={() => {
                          action.setAction('Delete');
                          action.setSelection(row.original);
                        }}
                        style={{ marginRight: '5px' }}
                      >
                        <Icons name='Delete' size={26} color='rgba(239, 66, 111, 1)' />
                      </span>
                    ) : null}
                  </Td>
                ) : null}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* sotto tabella */}
      <Flex flexDirection={'row'} alignItems={'center'} margin='0 15px 0 auto'>
        Pagina
        <div
          style={{
            border: '1px solid rgba(81, 70, 137, 0.7)',
            borderRadius: '5px',
            margin: '0 10px 0 10px',
            width: '70px',
            padding: '3px',
          }}
        >
          1
        </div>
        di 10
        <Flex
          background='rgba(81, 70, 137, 0.7)'
          borderRadius='5px'
          width='28px'
          height='28px'
          alignItems='center'
          justifyContent='center'
          marginLeft='20px'
        >
          <Icons name='LeftArrow' size={16} />
        </Flex>
        <Flex
          background='rgba(81, 70, 137, 0.7)'
          borderRadius='5px'
          width='28px'
          height='28px'
          alignItems='center'
          justifyContent='center'
          marginLeft='10px'
        >
          <Icons name='RightArrow' size={16} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TableLayout;
