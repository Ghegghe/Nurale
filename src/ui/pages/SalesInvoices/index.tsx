import { Flex, Grid } from '@chakra-ui/react';
import { Navbar } from '../../molecules/Layout/Navbar';
import '../styles/dashboard.css';
import { useSelector } from 'react-redux';
import { createColumnHelper } from '@tanstack/react-table';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Actions, THEMES, SaleInvoice } from '../../../utils';
import { schema } from './validation';
import { TableLayout } from '../../molecules/Layout/PageContent';
import { ReactNode, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store';
import { ButtonComponent, Icons } from '../../atoms';
import { InputField, Modal } from '../../molecules';
import { Form } from '../../molecules/Modal';
import { useTranslation } from 'react-i18next';
import {
  addSaleInvoice,
  deleteSaleInvoice,
  fetchSalesInvoices,
  getSalesInvoicesData,
  getSalesInvoicesTotalCount,
  updateSaleInvoice,
} from '../../../store/salesInvoices';

const SalesInvoicesPage = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedSaleInvoice, setSelectedSaleInvoice] = useState<SaleInvoice | null>(null);
  const [selectedAction, setSelectedAction] = useState<Actions | null>(null);
  const [hasEndOfMonth, setHasEndOfMonth] = useState<boolean | undefined>(undefined);
  const saleInvoice = useSelector(getSalesInvoicesData);
  const take = 10;
  const totalCount = useSelector(getSalesInvoicesTotalCount);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const columnHelper: any = createColumnHelper<any>();
  const filters: ReactNode = (
    <Grid columnGap='5px' gridTemplateColumns={'1fr 1fr 1fr'}>
      <ButtonComponent
        onClick={() => {
          setHasEndOfMonth(undefined);
        }}
        style={{
          color: hasEndOfMonth === undefined ? THEMES.color.sIndigo : THEMES.color.sWhite,
          background: hasEndOfMonth === undefined ? THEMES.color.a30Indigo : THEMES.color.sDarkPink,
          fontSize: THEMES.text.fontSize.px22,
          fontWeight: THEMES.text.fontWeight.w700,
        }}
      >
        {t('utilities.buttons.all')}
      </ButtonComponent>
      <ButtonComponent
        onClick={() => {
          setHasEndOfMonth(true);
        }}
        style={{
          color: hasEndOfMonth === true ? THEMES.color.sIndigo : THEMES.color.sWhite,
          background: hasEndOfMonth === true ? THEMES.color.a30Indigo : THEMES.color.sDarkPink,
          fontSize: THEMES.text.fontSize.px22,
          fontWeight: THEMES.text.fontWeight.w700,
        }}
      >
        {t('utilities.buttons.yes')}
      </ButtonComponent>
      <ButtonComponent
        onClick={() => {
          setHasEndOfMonth(false);
        }}
        style={{
          color: hasEndOfMonth === false ? THEMES.color.sIndigo : THEMES.color.sWhite,
          background: hasEndOfMonth === false ? THEMES.color.a30Indigo : THEMES.color.sDarkPink,
          fontSize: THEMES.text.fontSize.px22,
          fontWeight: THEMES.text.fontWeight.w700,
        }}
      >
        {t('utilities.buttons.no')}
      </ButtonComponent>
    </Grid>
  );

  const cols = [
    columnHelper.accessor('code', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.sales-invoices.table.cols.invoice-number'),
    }),
    columnHelper.accessor('date', {
      cell: (Props: any) => new Date(Props.getValue()).toLocaleDateString('it'),
      header: t('pages.sales-invoices.table.cols.date'),
    }),
    columnHelper.accessor('netValue', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.sales-invoices.table.cols.net-value'),
    }),
    columnHelper.accessor('vatValue', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.sales-invoices.table.cols.vat-value'),
    }),
    columnHelper.accessor('grossValue', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.sales-invoices.table.cols.total'),
    }),
    columnHelper.accessor('customer.name', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.sales-invoices.table.cols.customer'),
    }),
    columnHelper.accessor('typeOfPayment.name', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.sales-invoices.table.cols.type-of-payment'),
    }),
    columnHelper.accessor('state', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.sales-invoices.table.cols.state'),
    }),
    columnHelper.accessor('note', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.sales-invoices.table.cols.note'),
    }),
  ];

  const defaultValues: SaleInvoice = {
    code: '',
    customerId: 0,
    date: new Date(),
    grossValue: 0,
    netValue: 0,
    note: '',
    scheduledValueId: 0,
    state: '',
    typeOfPaymentId: 0,
    vatValue: 0,
  };
  const setFiltersDefaultValues = () => {};
  const methods = useForm<SaleInvoice>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const {
    formState: { errors },
    trigger,
    getValues,
    reset,
  } = methods;

  const dispatch = useAppDispatch();

  useEffect(() => {
    let skip = (page - 1) * take;
    dispatch(fetchSalesInvoices({ take, skip }));
  }, []);
  useEffect(() => {
    if (selectedAction === 'Add') {
      setIsOpenAddForm(true);
    } else if (selectedAction === 'Edit') {
      reset({
        code: selectedSaleInvoice?.code,
        customerId: selectedSaleInvoice?.customerId,
        date: selectedSaleInvoice?.date,
        grossValue: selectedSaleInvoice?.grossValue,
        netValue: selectedSaleInvoice?.netValue,
        note: selectedSaleInvoice?.note,
        scheduledValueId: selectedSaleInvoice?.scheduledValueId,
        state: selectedSaleInvoice?.state,
        typeOfPaymentId: selectedSaleInvoice?.typeOfPaymentId,
        vatValue: selectedSaleInvoice?.vatValue,
      });
      setIsOpenEditForm(true);
    } else if (selectedAction === 'Delete') {
      setIsOpenDeleteModal(true);
    } else if (selectedAction === 'Filter') {
      let skip = 0;
      dispatch(fetchSalesInvoices({ take, skip }));
      setSelectedAction(null);
    }
  }, [selectedAction]);
  useEffect(() => {
    let skip = (page - 1) * take;
    dispatch(fetchSalesInvoices({ take, skip }));
  }, [page]);

  const handleAdd = async () => {
    const isValidate = await trigger();
    if (isValidate) {
      await dispatch(addSaleInvoice(getValues()));
      let skip = (page - 1) * take;
      await dispatch(fetchSalesInvoices({ take, skip }));
      reset(defaultValues);
      setSelectedSaleInvoice(null);
      setSelectedAction(null);
      setIsOpenAddForm(false);
    }
  };
  const handleEdit = async () => {
    const isValidate = await trigger();
    if (isValidate && selectedSaleInvoice?.id) {
      const saleInvoice: SaleInvoice = {
        code: getValues().code,
        customerId: getValues().customerId,
        date: getValues().date,
        grossValue: getValues().grossValue,
        netValue: getValues().netValue,
        note: getValues().note,
        scheduledValueId: getValues().scheduledValueId,
        state: getValues().state,
        typeOfPaymentId: getValues().typeOfPaymentId,
        vatValue: getValues().vatValue,
      };
      await dispatch(
        updateSaleInvoice({
          id: selectedSaleInvoice?.id,
          saleInvoice: saleInvoice,
        }),
      );
      let skip = (page - 1) * take;
      await dispatch(fetchSalesInvoices({ take, skip }));
      reset(defaultValues);
      setSelectedSaleInvoice(null);
      setSelectedAction(null);
      setIsOpenEditForm(false);
    }
  };
  const handleDelete = async () => {
    if (selectedSaleInvoice?.id) {
      await dispatch(deleteSaleInvoice(selectedSaleInvoice?.id));
      let skip = (page - 1) * take;
      await dispatch(fetchSalesInvoices({ take, skip }));
      setSelectedSaleInvoice(null);
      setSelectedAction(null);
      setIsOpenDeleteModal(false);
    }
  };

  return (
    <Flex flexDirection={'column'} width={'100%'}>
      <Navbar label={t('navbar.purchase-invoice')} />

      <div
        style={{
          position: 'relative',
          height: '100%',
          margin: '75px 30px 15px 30px',
        }}
      >
        <TableLayout
          data={saleInvoice}
          cols={cols}
          action={{
            setSelection: setSelectedSaleInvoice,
            setAction: setSelectedAction,
            actions: ['Add', 'Edit', 'Delete', 'Paginate', 'Filter'],
            filters: {
              filters,
              setFiltersDefaultValues,
            },
            page: {
              page: page,
              setPage: setPage,
              nPages: Math.trunc(totalCount / take) + (totalCount % take ? 1 : 0),
            },
          }}
        />
        {isOpenAddForm ? (
          <Form
            label={t('pages.sales-invoices.table.add')}
            onCancel={() => {
              setSelectedSaleInvoice(null);
              setSelectedAction(null);
              reset(defaultValues);
              setIsOpenAddForm(false);
            }}
            onSubmit={() => {
              handleAdd();
            }}
          >
            <Grid
              columnGap='10px'
              gridTemplateColumns={'1fr 1fr'}
              fontSize={THEMES.text.fontSize.px18}
            >
              <FormProvider {...methods}>
                {/* <InputField
                  label={t('pages.sales-invoices.table.cols.name')}
                  name={'name'}
                  placeholder={t('pages.sales-invoices.table.cols.name')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.name?.message}
                /> */}
              </FormProvider>
            </Grid>
          </Form>
        ) : null}
        {isOpenEditForm ? (
          <Form
            label={t('pages.sales-invoices.table.edit')}
            onCancel={() => {
              setSelectedSaleInvoice(null);
              setSelectedAction(null);
              reset(defaultValues);
              setIsOpenEditForm(false);
            }}
            onSubmit={() => {
              handleEdit();
            }}
          >
            <Grid
              columnGap='10px'
              gridTemplateColumns={'1fr 1fr 1fr'}
              fontSize={THEMES.text.fontSize.px18}
            >
              <FormProvider {...methods}>
                <InputField
                  label={t('pages.sales-invoices.table.cols.invoice-number')}
                  name={'code'}
                  placeholder={t('pages.sales-invoices.table.cols.invoice-number')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.code?.message}
                />
                {/* <InputField
                  label={t('pages.sales-invoices.table.cols.date')}
                  name={'operationDate'}
                  placeholder={t('pages.sales-invoices.table.cols.date')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.operationDate?.message}
                />
                <InputField
                  label={t('pages.sales-invoices.table.cols.supplier')}
                  name={'supplierId'}
                  placeholder={t('pages.sales-invoices.table.cols.supplier')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  type='select'
                  select={['Frontend', 'Backend', 'Designer', 'Administrator', 'Other']}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.supplierId?.message}
                /> */}
              </FormProvider>
            </Grid>
          </Form>
        ) : null}
      </div>

      <Modal
        isOpen={isOpenDeleteModal}
        onOutsudeClick={() => {
          setSelectedSaleInvoice(null);
          setSelectedAction(null);
          setIsOpenDeleteModal(false);
        }}
      >
        {selectedAction === 'Delete' ? (
          <div
            style={{
              fontSize: THEMES.text.fontSize.px22,
              fontWeight: THEMES.text.fontWeight.w700,
              color: THEMES.color.sIndigo,
              margin: '60px 50px',
            }}
          >
            {selectedSaleInvoice ? (
              <>
                <span style={{ color: THEMES.color.sIndigo }}>
                  {t('utilities.table.confirm-delete') + ' '}
                  <span style={{ color: THEMES.color.sDarkPink }}>{selectedSaleInvoice.code}</span>
                </span>
                <Flex flexDirection='row' justifyContent='center' marginTop='45px'>
                  <ButtonComponent
                    onClick={() => {
                      setSelectedSaleInvoice(null);
                      setSelectedAction(null);
                      setIsOpenDeleteModal(false);
                    }}
                    style={{
                      color: THEMES.color.sIndigo,
                      background: THEMES.color.a30Indigo,
                      fontSize: THEMES.text.fontSize.px22,
                      fontWeight: THEMES.text.fontWeight.w700,
                      width: '145px',
                    }}
                  >
                    <Icons name='Close' size={28} color={THEMES.color.sIndigo} /> {t('cancel')}
                  </ButtonComponent>
                  <ButtonComponent
                    onClick={() => {
                      handleDelete();
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
                    <Icons name='Confirm' size={28} color={THEMES.color.sWhite} /> {t('confirm')}
                  </ButtonComponent>
                </Flex>
              </>
            ) : (
              <span style={{ color: THEMES.color.sIndigo }}>
                {t('pages.sales-invoices.no-selected')}
              </span>
            )}
          </div>
        ) : null}
      </Modal>
    </Flex>
  );
};

export default SalesInvoicesPage;
