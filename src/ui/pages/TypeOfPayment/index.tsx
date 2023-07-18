import { Flex, Grid } from '@chakra-ui/react';
import { Navbar } from '../../molecules/Layout/Navbar';
import '../styles/dashboard.css';
import { useSelector } from 'react-redux';
import { createColumnHelper } from '@tanstack/react-table';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Actions, THEMES, TypeOfPayment } from '../../../utils';
import { schema } from './validation';
import { TableLayout } from '../../molecules/Layout/PageContent';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store';
import { ButtonComponent, Icons } from '../../atoms';
import { InputField, Modal } from '../../molecules';
import { Form } from '../../molecules/Modal';
import { useTranslation } from 'react-i18next';
import {
  addTypeOfPayment,
  deleteTypeOfPayment,
  fetchTypeOfPayments,
  getTypeOfPaymentsData,
  getTypeOfPaymentsTotalCount,
  updateTypeOfPayment,
} from '../../../store/typeOfPayments';

const TypeOfPaymentsPage = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedTypeOfPayment, setSelectedTypeOfPayment] = useState<TypeOfPayment | null>(null);
  const [selectedAction, setSelectedAction] = useState<Actions | null>(null);
  const typeOfPayment = useSelector(getTypeOfPaymentsData);
  const take = 10;
  const totalCount = useSelector(getTypeOfPaymentsTotalCount);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const columnHelper: any = createColumnHelper<any>();

  const cols = [
    columnHelper.accessor('name', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.type-of-payments.table.cols.name'),
    }),
    columnHelper.accessor('daysToFirstPayment', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.type-of-payments.table.cols.days-to-first-payment'),
    }),
    columnHelper.accessor('daysBetweenPayments', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.type-of-payments.table.cols.days-between-payments'),
    }),
    columnHelper.accessor('numberOfPayments', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.type-of-payments.table.cols.number-of-payments'),
    }),
    columnHelper.accessor('movePaymentsToTheEndOfMonth', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.type-of-payments.table.cols.move-payments-to-the-end-of-month'),
    }),
    columnHelper.accessor('note', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.type-of-payments.table.cols.note'),
    }),
  ];

  const defaultValues: TypeOfPayment = {
    name: '',
    daysToFirstPayment: 0,
    daysBetweenPayments: 0,
    numberOfPayments: 0,
    movePaymentsToTheEndOfMonth: null,
    daysOffsetPayments: null,
    note: '',
  };
  const methods = useForm<TypeOfPayment>({
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
    dispatch(fetchTypeOfPayments({ take, skip }));
  }, []);
  useEffect(() => {
    if (selectedAction === 'Add') {
      setIsOpenAddForm(true);
    } else if (selectedAction === 'Edit') {
      reset({
        name: selectedTypeOfPayment?.name,
        daysToFirstPayment: selectedTypeOfPayment?.daysToFirstPayment,
        daysBetweenPayments: selectedTypeOfPayment?.daysBetweenPayments,
        numberOfPayments: selectedTypeOfPayment?.numberOfPayments,
        movePaymentsToTheEndOfMonth: selectedTypeOfPayment?.movePaymentsToTheEndOfMonth,
        daysOffsetPayments: selectedTypeOfPayment?.daysOffsetPayments,
        note: selectedTypeOfPayment?.note,
      });
      setIsOpenEditForm(true);
    } else if (selectedAction === 'Delete') {
      setIsOpenDeleteModal(true);
    }
  }, [selectedAction]);
  useEffect(() => {
    let skip = (page - 1) * take;
    dispatch(fetchTypeOfPayments({ take, skip }));
  }, [page]);

  const handleAdd = async () => {
    const isValidate = await trigger();
    if (isValidate) {
      await dispatch(addTypeOfPayment(getValues()));
      let skip = (page - 1) * take;
      await dispatch(fetchTypeOfPayments({ take, skip }));
      reset(defaultValues);
      setSelectedTypeOfPayment(null);
      setSelectedAction(null);
      setIsOpenAddForm(false);
    }
  };
  const handleEdit = async () => {
    const isValidate = await trigger();
    if (isValidate && selectedTypeOfPayment?.id) {
      const typeOfPayment: TypeOfPayment = {
        name: getValues().name,
        daysToFirstPayment: getValues().daysToFirstPayment,
        daysBetweenPayments: getValues().daysBetweenPayments,
        numberOfPayments: getValues().numberOfPayments,
        movePaymentsToTheEndOfMonth: getValues().movePaymentsToTheEndOfMonth,
        daysOffsetPayments: getValues().daysOffsetPayments,
        note: getValues().note,
      };
      await dispatch(
        updateTypeOfPayment({ id: selectedTypeOfPayment?.id, typeOfPayment: typeOfPayment }),
      );
      let skip = (page - 1) * take;
      await dispatch(fetchTypeOfPayments({ take, skip }));
      reset(defaultValues);
      setSelectedTypeOfPayment(null);
      setSelectedAction(null);
      setIsOpenEditForm(false);
    }
  };
  const handleDelete = async () => {
    if (selectedTypeOfPayment?.id) {
      await dispatch(deleteTypeOfPayment(selectedTypeOfPayment?.id));
      let skip = (page - 1) * take;
      await dispatch(fetchTypeOfPayments({ take, skip }));
      setSelectedTypeOfPayment(null);
      setSelectedAction(null);
      setIsOpenDeleteModal(false);
    }
  };

  return (
    <Flex flexDirection={'column'} width={'100%'}>
      <Navbar label={t('navbar.type-of-payments')} />

      <div
        style={{
          position: 'relative',
          height: '100%',
          margin: '75px 30px 15px 30px',
        }}
      >
        <TableLayout
          data={typeOfPayment}
          cols={cols}
          action={{
            setSelection: setSelectedTypeOfPayment,
            setAction: setSelectedAction,
            actions: ['Add', 'Edit', 'Delete', 'Paginate'],
            page: {
              page: page,
              setPage: setPage,
              nPages: Math.trunc(totalCount / take) + (totalCount % take ? 1 : 0),
            },
          }}
        />
        {isOpenAddForm ? (
          <Form
            label={t('pages.type-of-payments.table.add')}
            onCancel={() => {
              setSelectedTypeOfPayment(null);
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
                <InputField
                  label={t('pages.type-of-payments.table.cols.name')}
                  name={'name'}
                  placeholder={t('pages.type-of-payments.table.cols.name')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.name?.message}
                />
                <InputField
                  label={t('pages.type-of-payments.table.cols.days-to-first-payment')}
                  name={'daysToFirstPayment'}
                  placeholder={t('pages.type-of-payments.table.cols.days-to-first-payment')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                  error={errors.daysToFirstPayment?.message}
                />
                <InputField
                  label={t('pages.type-of-payments.table.cols.days-between-payments')}
                  name={'daysBetweenPayments'}
                  placeholder={t('pages.type-of-payments.table.cols.days-between-payments')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.daysBetweenPayments?.message}
                />
                <InputField
                  label={t('pages.type-of-payments.table.cols.number-of-payments')}
                  name={'numberOfPayments'}
                  placeholder={t('pages.type-of-payments.table.cols.number-of-payments')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.numberOfPayments?.message}
                />
                <InputField
                  label={t('pages.type-of-payments.table.cols.move-payments-to-the-end-of-month')}
                  name={'movePaymentsToTheEndOfMonth'}
                  placeholder={t(
                    'pages.type-of-payments.table.cols.move-payments-to-the-end-of-month',
                  )}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.movePaymentsToTheEndOfMonth?.message}
                />
                <InputField
                  label={t('pages.type-of-payments.table.cols.note')}
                  name={'note'}
                  placeholder={t('pages.type-of-payments.table.cols.note')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.note?.message}
                />
                <InputField
                  label={t('pages.type-of-payments.table.cols.days-offset-payments')}
                  name={'daysOffsetPayments'}
                  placeholder={t('pages.type-of-payments.table.cols.days-offset-payments')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.daysOffsetPayments?.message}
                />
              </FormProvider>
            </Grid>
          </Form>
        ) : null}
        {isOpenEditForm ? (
          <Form
            label={t('pages.type-of-payment.edit')}
            onCancel={() => {
              setSelectedTypeOfPayment(null);
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
              gridTemplateColumns={'1fr 1fr'}
              fontSize={THEMES.text.fontSize.px18}
            >
              <FormProvider {...methods}>
                <InputField
                  label={t('pages.type-of-payments.table.cols.name')}
                  name={'name'}
                  placeholder={t('pages.type-of-payments.table.cols.name')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.name?.message}
                />
                <InputField
                  label={t('pages.type-of-payments.table.cols.days-to-first-payment')}
                  name={'daysToFirstPayment'}
                  placeholder={t('pages.type-of-payments.table.cols.days-to-first-payment')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.daysToFirstPayment?.message}
                />
                <InputField
                  label={t('pages.type-of-payments.table.cols.days-between-payments')}
                  name={'daysBetweenPayments'}
                  placeholder={t('pages.type-of-payments.table.cols.days-between-payments')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.daysBetweenPayments?.message}
                />
                <InputField
                  label={t('pages.type-of-payments.table.cols.number-of-payments')}
                  name={'numberOfPayments'}
                  placeholder={t('pages.type-of-payments.table.cols.number-of-payments')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.numberOfPayments?.message}
                />
                <InputField
                  label={t('pages.type-of-payments.table.cols.move-payments-to-the-end-of-month')}
                  name={'movePaymentsToTheEndOfMonth'}
                  placeholder={t(
                    'pages.type-of-payments.table.cols.move-payments-to-the-end-of-month',
                  )}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.movePaymentsToTheEndOfMonth?.message}
                />
                <InputField
                  label={t('pages.type-of-payments.table.cols.note')}
                  name={'note'}
                  placeholder={t('pages.type-of-payments.table.cols.note')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.note?.message}
                />
                <InputField
                  label={t('pages.type-of-payments.table.cols.days-offset-payments')}
                  name={'daysOffsetPayments'}
                  placeholder={t('pages.type-of-payments.table.cols.days-offset-payments')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.daysOffsetPayments?.message}
                />
              </FormProvider>
            </Grid>
          </Form>
        ) : null}
      </div>

      <Modal
        isOpen={isOpenDeleteModal}
        onOutsudeClick={() => {
          setSelectedTypeOfPayment(null);
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
            {selectedTypeOfPayment ? (
              <>
                <span style={{ color: THEMES.color.sIndigo }}>
                  {t('utilities.table.confirm-delete') + ' '}
                  <span style={{ color: THEMES.color.sDarkPink }}>
                    {selectedTypeOfPayment.name}
                  </span>
                </span>
                <Flex flexDirection='row' justifyContent='center' marginTop='45px'>
                  <ButtonComponent
                    onClick={() => {
                      setSelectedTypeOfPayment(null);
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
                {t('pages.type-of-payments.no-selected')}
              </span>
            )}
          </div>
        ) : null}
      </Modal>
    </Flex>
  );
};

export default TypeOfPaymentsPage;
