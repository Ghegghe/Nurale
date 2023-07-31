import { Flex, Grid } from '@chakra-ui/react';
import { Navbar } from '../../molecules/Layout/Navbar';
import '../styles/dashboard.css';
import { useSelector } from 'react-redux';
import { createColumnHelper } from '@tanstack/react-table';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Actions, THEMES, PurchaseInvoice } from '../../../utils';
import { schema } from './validation';
import { TableLayout } from '../../molecules/Layout/PageContent';
import { ReactNode, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store';
import { ButtonComponent, Icons } from '../../atoms';
import { InputField, Modal } from '../../molecules';
import { Form } from '../../molecules/Modal';
import { useTranslation } from 'react-i18next';
import {
  addPurchaseInvoice,
  deletePurchaseInvoice,
  fetchPurchaseInvoices,
  getPurchaseInvoicesData,
  getPurchaseInvoicesTotalCount,
  updatePurchaseInvoice,
} from '../../../store/purchaseInvoices';

const PurchaseInvoicesPage = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedPurchaseInvoice, setSelectedPurchaseInvoice] = useState<PurchaseInvoice | null>(
    null,
  );
  const [selectedAction, setSelectedAction] = useState<Actions | null>(null);
  const [hasEndOfMonth, setHasEndOfMonth] = useState<boolean | undefined>(undefined);
  const purchaseInvoice = useSelector(getPurchaseInvoicesData);
  const take = 10;
  const totalCount = useSelector(getPurchaseInvoicesTotalCount);
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
      header: t('pages.purchase-invoices.table.cols.invoice-number'),
    }),
    columnHelper.accessor('supplier.name', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.purchase-invoices.table.cols.supplier'),
    }),
    columnHelper.accessor('typeOfPayment.name', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.purchase-invoices.table.cols.type-of-payment'),
    }),
    columnHelper.accessor('operationDate', {
      cell: (Props: any) => new Date(Props.getValue()).toLocaleDateString('it'),
      header: t('pages.purchase-invoices.table.cols.date'),
    }),
    columnHelper.accessor('netValue', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.purchase-invoices.table.cols.net-value'),
    }),
    columnHelper.accessor('vatValue', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.purchase-invoices.table.cols.vat-value'),
    }),
    columnHelper.accessor('grossValue', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.purchase-invoices.table.cols.total'),
    }),
    columnHelper.accessor('state', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.purchase-invoices.table.cols.state'),
    }),
    columnHelper.accessor('note', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.purchase-invoices.table.cols.note'),
    }),
  ];

  const defaultValues: PurchaseInvoice = {
    code: '',
    grossValue: 0,
    netValue: 0,
    note: '',
    operationDate: new Date(),
    quantity: 0,
    scheduledValueId: 0,
    state: '',
    supplierId: 0,
    typeOfPaymentId: 0,
    value: 0,
    valueCategory: '',
    vatValue: 0,
  };
  const setFiltersDefaultValues = () => {};
  const methods = useForm<PurchaseInvoice>({
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
    dispatch(fetchPurchaseInvoices({ take, skip }));
  }, []);
  useEffect(() => {
    if (selectedAction === 'Add') {
      setIsOpenAddForm(true);
    } else if (selectedAction === 'Edit') {
      reset({
        code: selectedPurchaseInvoice?.code,
        grossValue: selectedPurchaseInvoice?.grossValue,
        netValue: selectedPurchaseInvoice?.netValue,
        note: selectedPurchaseInvoice?.note,
        operationDate: selectedPurchaseInvoice?.operationDate,
        quantity: selectedPurchaseInvoice?.quantity,
        scheduledValueId: selectedPurchaseInvoice?.scheduledValueId,
        state: selectedPurchaseInvoice?.state,
        supplierId: selectedPurchaseInvoice?.supplierId,
        typeOfPaymentId: selectedPurchaseInvoice?.typeOfPaymentId,
        value: selectedPurchaseInvoice?.value,
        valueCategory: selectedPurchaseInvoice?.valueCategory,
        vatValue: selectedPurchaseInvoice?.vatValue,
      });
      setIsOpenEditForm(true);
    } else if (selectedAction === 'Delete') {
      setIsOpenDeleteModal(true);
    } else if (selectedAction === 'Filter') {
      let skip = 0;
      dispatch(fetchPurchaseInvoices({ take, skip }));
      setSelectedAction(null);
    }
  }, [selectedAction]);
  useEffect(() => {
    let skip = (page - 1) * take;
    dispatch(fetchPurchaseInvoices({ take, skip }));
  }, [page]);

  const handleAdd = async () => {
    const isValidate = await trigger();
    if (isValidate) {
      await dispatch(addPurchaseInvoice(getValues()));
      let skip = (page - 1) * take;
      await dispatch(fetchPurchaseInvoices({ take, skip }));
      reset(defaultValues);
      setSelectedPurchaseInvoice(null);
      setSelectedAction(null);
      setIsOpenAddForm(false);
    }
  };
  const handleEdit = async () => {
    const isValidate = await trigger();
    if (isValidate && selectedPurchaseInvoice?.id) {
      const purchaseInvoice: PurchaseInvoice = {
        code: getValues().code,
        grossValue: getValues().grossValue,
        netValue: getValues().netValue,
        note: getValues().note,
        operationDate: getValues().operationDate,
        quantity: getValues().quantity,
        scheduledValueId: getValues().scheduledValueId,
        state: getValues().state,
        supplierId: getValues().supplierId,
        typeOfPaymentId: getValues().typeOfPaymentId,
        value: getValues().value,
        valueCategory: getValues().valueCategory,
        vatValue: getValues().vatValue,
      };
      await dispatch(
        updatePurchaseInvoice({
          id: selectedPurchaseInvoice?.id,
          purchaseInvoice: purchaseInvoice,
        }),
      );
      let skip = (page - 1) * take;
      await dispatch(fetchPurchaseInvoices({ take, skip }));
      reset(defaultValues);
      setSelectedPurchaseInvoice(null);
      setSelectedAction(null);
      setIsOpenEditForm(false);
    }
  };
  const handleDelete = async () => {
    if (selectedPurchaseInvoice?.id) {
      await dispatch(deletePurchaseInvoice(selectedPurchaseInvoice?.id));
      let skip = (page - 1) * take;
      await dispatch(fetchPurchaseInvoices({ take, skip }));
      setSelectedPurchaseInvoice(null);
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
          data={purchaseInvoice}
          cols={cols}
          action={{
            setSelection: setSelectedPurchaseInvoice,
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
            label={t('pages.purchase-invoices.table.add')}
            onCancel={() => {
              setSelectedPurchaseInvoice(null);
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
                  label={t('pages.purchase-invoices.table.cols.name')}
                  name={'name'}
                  placeholder={t('pages.purchase-invoices.table.cols.name')}
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
            label={t('pages.purchase-invoices.table.edit')}
            onCancel={() => {
              setSelectedPurchaseInvoice(null);
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
                  label={t('pages.purchase-invoices.table.cols.invoice-number')}
                  name={'code'}
                  placeholder={t('pages.purchase-invoices.table.cols.invoice-number')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.code?.message}
                />
                <InputField
                  label={t('pages.purchase-invoices.table.cols.date')}
                  name={'operationDate'}
                  placeholder={t('pages.purchase-invoices.table.cols.date')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.operationDate?.message}
                />
                <InputField
                  label={t('pages.purchase-invoices.table.cols.supplier')}
                  name={'supplierId'}
                  placeholder={t('pages.purchase-invoices.table.cols.supplier')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  type='select'
                  select={['Frontend', 'Backend', 'Designer', 'Administrator', 'Other']}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.supplierId?.message}
                />
              </FormProvider>
            </Grid>
          </Form>
        ) : null}
      </div>

      <Modal
        isOpen={isOpenDeleteModal}
        onOutsudeClick={() => {
          setSelectedPurchaseInvoice(null);
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
            {selectedPurchaseInvoice ? (
              <>
                <span style={{ color: THEMES.color.sIndigo }}>
                  {t('utilities.table.confirm-delete') + ' '}
                  <span style={{ color: THEMES.color.sDarkPink }}>
                    {selectedPurchaseInvoice.code}
                  </span>
                </span>
                <Flex flexDirection='row' justifyContent='center' marginTop='45px'>
                  <ButtonComponent
                    onClick={() => {
                      setSelectedPurchaseInvoice(null);
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
                {t('pages.purchase-invoices.no-selected')}
              </span>
            )}
          </div>
        ) : null}
      </Modal>
    </Flex>
  );
};

export default PurchaseInvoicesPage;
