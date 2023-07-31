import { Flex, Grid } from '@chakra-ui/react';
import { Navbar } from '../../molecules/Layout/Navbar';
import '../styles/dashboard.css';
import { useSelector } from 'react-redux';
import { createColumnHelper } from '@tanstack/react-table';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Actions, THEMES, PurchaseInvoiceActivity } from '../../../utils';
import { schema } from './validation';
import { TableLayout } from '../../molecules/Layout/PageContent';
import { ReactNode, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store';
import { ButtonComponent, Icons } from '../../atoms';
import { InputField, Modal } from '../../molecules';
import { Form } from '../../molecules/Modal';
import { useTranslation } from 'react-i18next';
import {
  addPurchaseInvoiceActivity,
  deletePurchaseInvoiceActivity,
  fetchPurchaseInvoiceActivities,
  getPurchaseInvoiceActivitiesData,
  getPurchaseInvoiceActivitiesTotalCount,
  updatePurchaseInvoiceActivity,
} from '../../../store/purchaseInvoiceActivities';

const PurchaseInvoiceActivitiesPage = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedPurchaseInvoiceActivity, setSelectedPurchaseInvoiceActivity] =
    useState<PurchaseInvoiceActivity | null>(null);
  const [selectedAction, setSelectedAction] = useState<Actions | null>(null);
  const [hasEndOfMonth, setHasEndOfMonth] = useState<boolean | undefined>(undefined);
  const purchaseInvoiceActivity = useSelector(getPurchaseInvoiceActivitiesData);
  const take = 10;
  const totalCount = useSelector(getPurchaseInvoiceActivitiesTotalCount);
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
    columnHelper.accessor('id', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.purchase-invoice-activities.table.cols.id'),
    }),
    columnHelper.accessor('activity.name', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.purchase-invoice-activities.table.cols.activity'),
    }),
    columnHelper.accessor('purchaseInvoice.name', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.purchase-invoice-activities.table.cols.purchase-invoice'),
    }),
  ];
  console.log(purchaseInvoiceActivity);
  const defaultValues: PurchaseInvoiceActivity = {
    activityId: 0,
    jobId: 0,
    orderId: 0,
    purchasesInvoiceId: 0,
    quantity: 0,
    resourceId: 0,
    value: 0,
  };
  const setFiltersDefaultValues = () => {};
  const methods = useForm<PurchaseInvoiceActivity>({
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
    dispatch(fetchPurchaseInvoiceActivities({ take, skip }));
  }, []);
  useEffect(() => {
    if (selectedAction === 'Add') {
      setIsOpenAddForm(true);
    } else if (selectedAction === 'Edit') {
      reset({
        activityId: selectedPurchaseInvoiceActivity?.activityId,
        jobId: selectedPurchaseInvoiceActivity?.jobId,
        orderId: selectedPurchaseInvoiceActivity?.orderId,
        purchasesInvoiceId: selectedPurchaseInvoiceActivity?.purchasesInvoiceId,
        quantity: selectedPurchaseInvoiceActivity?.quantity,
        resourceId: selectedPurchaseInvoiceActivity?.resourceId,
        value: selectedPurchaseInvoiceActivity?.value,
      });
      setIsOpenEditForm(true);
    } else if (selectedAction === 'Delete') {
      setIsOpenDeleteModal(true);
    } else if (selectedAction === 'Filter') {
      let skip = 0;
      dispatch(fetchPurchaseInvoiceActivities({ take, skip }));
      setSelectedAction(null);
    }
  }, [selectedAction]);
  useEffect(() => {
    let skip = (page - 1) * take;
    dispatch(fetchPurchaseInvoiceActivities({ take, skip }));
  }, [page]);

  const handleAdd = async () => {
    const isValidate = await trigger();
    if (isValidate) {
      await dispatch(addPurchaseInvoiceActivity(getValues()));
      let skip = (page - 1) * take;
      await dispatch(fetchPurchaseInvoiceActivities({ take, skip }));
      reset(defaultValues);
      setSelectedPurchaseInvoiceActivity(null);
      setSelectedAction(null);
      setIsOpenAddForm(false);
    }
  };
  const handleEdit = async () => {
    const isValidate = await trigger();
    if (isValidate && selectedPurchaseInvoiceActivity?.id) {
      const purchaseInvoiceActivity: PurchaseInvoiceActivity = {
        activityId: getValues().activityId,
        jobId: getValues().jobId,
        orderId: getValues().orderId,
        purchasesInvoiceId: getValues().purchasesInvoiceId,
        quantity: getValues().quantity,
        resourceId: getValues().resourceId,
        value: getValues().value,
      };
      await dispatch(
        updatePurchaseInvoiceActivity({
          id: selectedPurchaseInvoiceActivity?.id,
          purchaseInvoiceActivity: purchaseInvoiceActivity,
        }),
      );
      let skip = (page - 1) * take;
      await dispatch(fetchPurchaseInvoiceActivities({ take, skip }));
      reset(defaultValues);
      setSelectedPurchaseInvoiceActivity(null);
      setSelectedAction(null);
      setIsOpenEditForm(false);
    }
  };
  const handleDelete = async () => {
    if (selectedPurchaseInvoiceActivity?.id) {
      await dispatch(deletePurchaseInvoiceActivity(selectedPurchaseInvoiceActivity?.id));
      let skip = (page - 1) * take;
      await dispatch(fetchPurchaseInvoiceActivities({ take, skip }));
      setSelectedPurchaseInvoiceActivity(null);
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
          data={purchaseInvoiceActivity}
          cols={cols}
          action={{
            setSelection: setSelectedPurchaseInvoiceActivity,
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
            label={t('pages.purchase-invoice-activities.table.add')}
            onCancel={() => {
              setSelectedPurchaseInvoiceActivity(null);
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
                  label={t('pages.purchase-invoice-activities.table.cols.name')}
                  name={'name'}
                  placeholder={t('pages.purchase-invoice-activities.table.cols.name')}
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
            label={t('pages.purchase-invoice-activities.table.edit')}
            onCancel={() => {
              setSelectedPurchaseInvoiceActivity(null);
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
                {/* <InputField
                  label={t('pages.purchase-invoice-activities.table.cols.id')}
                  name={'code'}
                  placeholder={t('pages.purchase-invoice-activities.table.cols.id')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.code?.message}
                />
                <InputField
                  label={t('pages.purchase-invoice-activities.table.cols.date')}
                  name={'operationDate'}
                  placeholder={t('pages.purchase-invoice-activities.table.cols.date')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.operationDate?.message}
                />
                <InputField
                  label={t('pages.purchase-invoice-activities.table.cols.activity')}
                  name={'activityId'}
                  placeholder={t('pages.purchase-invoice-activities.table.cols.activity')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  type='select'
                  select={['Frontend', 'Backend', 'Designer', 'Administrator', 'Other']}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.activityId?.message}
                /> */}
              </FormProvider>
            </Grid>
          </Form>
        ) : null}
      </div>

      <Modal
        isOpen={isOpenDeleteModal}
        onOutsudeClick={() => {
          setSelectedPurchaseInvoiceActivity(null);
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
            {selectedPurchaseInvoiceActivity ? (
              <>
                <span style={{ color: THEMES.color.sIndigo }}>
                  {t('utilities.table.confirm-delete') + ' '}
                  <span style={{ color: THEMES.color.sDarkPink }}>
                    {selectedPurchaseInvoiceActivity.activityId}
                  </span>
                </span>
                <Flex flexDirection='row' justifyContent='center' marginTop='45px'>
                  <ButtonComponent
                    onClick={() => {
                      setSelectedPurchaseInvoiceActivity(null);
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
                {t('pages.purchase-invoice-activities.no-selected')}
              </span>
            )}
          </div>
        ) : null}
      </Modal>
    </Flex>
  );
};

export default PurchaseInvoiceActivitiesPage;
