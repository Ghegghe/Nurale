import { Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { ButtonComponent, Icons } from '../../../atoms';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ReactNode, useState } from 'react';
import { Actions, THEMES } from '../../../../utils';
import { useTranslation } from 'react-i18next';

interface Props {
  data: any[];
  cols: any[];
  action?: {
    setSelection: (Prop: any) => void;
    setAction: (Prop: Actions) => void;
    actions: Actions[];
    filters?: {
      filters: ReactNode;
      setFiltersDefaultValues: () => void;
    };
    page?: {
      page: number;
      setPage: (Prop: number) => void;
      nPages: number;
    };
  };
}

const TableLayout = ({ data, cols, action }: Props) => {
  const tableIstance = useReactTable({
    data: data,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
  });

  const { t } = useTranslation();
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
              background: THEMES.color.sDarkPink,
              border: 'none',
              borderRadius: THEMES.border.radius.px10,
              color: THEMES.color.sWhite,
              fontSize: THEMES.text.fontSize.px20,
              padding: '8px 15px 8px 15px',
            }}
          >
            <Icons name='Add' size={32} />
            {t('utilities.table.add')}
          </ButtonComponent>
        ) : null}

        {action?.actions.includes('Filter') ? (
          <ButtonComponent
            onClick={() => setIsOpenFilter(!isOpenFilter)}
            style={{
              background: THEMES.color.sDarkPink,
              border: 'none',
              borderRadius: THEMES.border.radius.px10,
              color: THEMES.color.sWhite,
              fontSize: THEMES.text.fontSize.px20,
              padding: '8px 15px 8px 15px',
              marginLeft: 'auto',
              width: '110px',
              justifyContent: 'flex-end',
            }}
          >
            {isOpenFilter ? (
              <Icons name='Add' size={32} rotation='45deg' />
            ) : (
              <Icons name='MagnifyingGlass' size={32} color={THEMES.color.sWhite} />
            )}
            {t('utilities.table.filter')}
          </ButtonComponent>
        ) : null}
      </Flex>
      {/* tabella */}

      <TableContainer
        style={{
          border: `1px solid ${THEMES.color.a70Indigo}`,
          borderRadius: THEMES.border.radius.px10,
          margin: '15px 0 15px 0',
          height: '100%',
          fontSize: THEMES.text.fontSize.px20,
          position: 'relative',
        }}
      >
        {isOpenFilter ? (
          <Flex
            flexDirection='column'
            background={THEMES.color.sWhite}
            borderRadius={THEMES.border.radius.px10}
            boxShadow={`-2px 2px 4px 0px ${THEMES.color.a30Indigo}`}
            position='absolute'
            zIndex='10'
            width='auto'
            height='100%'
            right='0'
          >
            <Flex flexDirection='row' padding='17px' alignItems='center'>
              <span>Filtri</span>
              <div style={{ marginLeft: 'auto' }} onClick={() => setIsOpenFilter(!isOpenFilter)}>
                <Icons name='Close' size={24} color={THEMES.color.sIndigo} />
              </div>
            </Flex>
            <hr className='hrgray' style={{ margin: '0 17px 0 17px' }} />
            <div style={{ height: '100%', padding: '17px', overflowY: 'scroll' }}>
              {action?.filters?.filters}
            </div>
            <div style={{ padding: '17px' }}>
              <ButtonComponent
                onClick={() => {
                  action?.filters?.setFiltersDefaultValues();
                }}
                style={{
                  color: THEMES.color.sIndigo,
                  background: THEMES.color.a30Indigo,
                  fontSize: THEMES.text.fontSize.px22,
                  fontWeight: THEMES.text.fontWeight.w700,
                  width: '145px',
                }}
              >
                {t('utilities.buttons.clear-filters')}
              </ButtonComponent>
              <ButtonComponent
                onClick={() => {
                  action?.setAction('Filter');
                }}
                style={{
                  color: THEMES.color.sWhite,
                  background: THEMES.color.sDarkPink,
                  fontSize: THEMES.text.fontSize.px22,
                  fontWeight: THEMES.text.fontWeight.w700,
                  width: '145px',
                  marginLeft: '28px',
                }}
              >
                {t('utilities.buttons.filter')}
              </ButtonComponent>
            </div>
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
                {action ? <Th>{t('utilities.table.actions')}</Th> : null}
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
                        <Icons name='Edit' size={26} color={THEMES.color.a50Indigo} />
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
                        <Icons name='Delete' size={26} color={THEMES.color.sDarkPink} />
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
      {action?.actions.includes('Paginate') && action.page ? (
        <Flex flexDirection={'row'} alignItems={'center'} margin='0 15px 0 auto'>
          Pagina
          <div
            style={{
              border: `1px solid ${THEMES.color.a70Indigo}`,
              borderRadius: THEMES.border.radius.px5,
              margin: '0 10px 0 10px',
              width: '70px',
              padding: '3px',
            }}
          >
            {action.page?.page}
          </div>
          di {action.page.nPages}
          <Flex
            background={action.page.page > 1 ? THEMES.color.a70Indigo : THEMES.color.a30Indigo}
            borderRadius={THEMES.border.radius.px5}
            width='28px'
            height='28px'
            alignItems='center'
            justifyContent='center'
            marginLeft='20px'
            onClick={
              action.page.page > 1
                ? () => {
                    action.page?.setPage(action.page.page - 1);
                  }
                : () => {}
            }
          >
            <Icons name='LeftArrow' size={16} />
          </Flex>
          <Flex
            background={
              action.page.page < action.page.nPages
                ? THEMES.color.a70Indigo
                : THEMES.color.a30Indigo
            }
            borderRadius={THEMES.border.radius.px5}
            width='28px'
            height='28px'
            alignItems='center'
            justifyContent='center'
            marginLeft='10px'
            onClick={
              action.page.page < action.page.nPages
                ? () => {
                    action.page?.setPage(action.page.page + 1);
                  }
                : () => {}
            }
          >
            <Icons name='RightArrow' size={16} />
          </Flex>
        </Flex>
      ) : null}
    </Flex>
  );
};

export default TableLayout;
