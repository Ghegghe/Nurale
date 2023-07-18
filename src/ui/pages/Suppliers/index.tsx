import { Flex, Grid } from '@chakra-ui/react';
import { Navbar } from '../../molecules/Layout/Navbar';
import '../styles/dashboard.css';
import { useSelector } from 'react-redux';
import { createColumnHelper } from '@tanstack/react-table';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Actions, Supplier, THEMES } from '../../../utils';
import { schema } from './validation';
import { TableLayout } from '../../molecules/Layout/PageContent';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store';
import { ButtonComponent, Icons } from '../../atoms';
import { InputField, Modal } from '../../molecules';
import { Form } from '../../molecules/Modal';
import { useTranslation } from 'react-i18next';
import {
  addSupplier,
  deleteSupplier,
  fetchSuppliers,
  getSuppliersData,
  getSuppliersTotalCount,
  updateSupplier,
} from '../../../store';

const SuppliersPage = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [selectedAction, setSelectedAction] = useState<Actions | null>(null);
  const supplier = useSelector(getSuppliersData);
  const take = 10;
  const totalCount = useSelector(getSuppliersTotalCount);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const columnHelper: any = createColumnHelper<any>();

  const cols = [
    columnHelper.accessor('name', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.suppliers.table.cols.name'),
    }),
    columnHelper.accessor('typeOfPaymentId', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.suppliers.table.cols.payment-type'),
    }),
    columnHelper.accessor('note', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.suppliers.table.cols.note'),
    }),
  ];

  const defaultValues: Supplier = {
    name: '',
    typeOfPaymentId: 0,
    note: '',
  };
  const methods = useForm<Supplier>({
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
    dispatch(fetchSuppliers({ take, skip }));
  }, []);
  useEffect(() => {
    if (selectedAction === 'Add') {
      setIsOpenAddForm(true);
    } else if (selectedAction === 'Edit') {
      reset({
        name: selectedSupplier?.name,
        typeOfPaymentId: selectedSupplier?.typeOfPaymentId,
        note: selectedSupplier?.note,
      });
      setIsOpenEditForm(true);
    } else if (selectedAction === 'Delete') {
      setIsOpenDeleteModal(true);
    }
  }, [selectedAction]);
  useEffect(() => {
    let skip = (page - 1) * take;
    dispatch(fetchSuppliers({ take, skip }));
  }, [page]);

  const handleAdd = async () => {
    const isValidate = await trigger();
    if (isValidate) {
      await dispatch(addSupplier(getValues()));
      let skip = (page - 1) * take;
      await dispatch(fetchSuppliers({ take, skip }));
      reset(defaultValues);
      setSelectedSupplier(null);
      setSelectedAction(null);
      setIsOpenAddForm(false);
    }
  };
  const handleEdit = async () => {
    const isValidate = await trigger();
    if (isValidate && selectedSupplier?.id) {
      const supplier: Supplier = {
        name: getValues().name,
        typeOfPaymentId: getValues().typeOfPaymentId,
        note: getValues().note,
      };
      await dispatch(updateSupplier({ id: selectedSupplier?.id, supplier: supplier }));
      let skip = (page - 1) * take;
      await dispatch(fetchSuppliers({ take, skip }));
      reset(defaultValues);
      setSelectedSupplier(null);
      setSelectedAction(null);
      setIsOpenEditForm(false);
    }
  };
  const handleDelete = async () => {
    if (selectedSupplier?.id) {
      await dispatch(deleteSupplier(selectedSupplier?.id));
      let skip = (page - 1) * take;
      await dispatch(fetchSuppliers({ take, skip }));
      setSelectedSupplier(null);
      setSelectedAction(null);
      setIsOpenDeleteModal(false);
    }
  };

  return (
    <Flex flexDirection={'column'} width={'100%'}>
      <Navbar label={t('navbar.suppliers')} />

      <div
        style={{
          position: 'relative',
          height: '100%',
          margin: '75px 30px 15px 30px',
        }}
      >
        <TableLayout
          data={supplier}
          cols={cols}
          action={{
            setSelection: setSelectedSupplier,
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
            label={t('pages.suppliers.table.add')}
            onCancel={() => {
              setSelectedSupplier(null);
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
                  label={t('pages.suppliers.table.cols.name')}
                  name={'name'}
                  placeholder={t('pages.suppliers.table.cols.name')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.name?.message}
                />
                <InputField
                  label={t('pages.suppliers.table.cols.payment-type')}
                  name={'typeOfPaymentId'}
                  placeholder={t('pages.suppliers.table.cols.payment-type')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  type='select'
                  select={['Frontend', 'Backend', 'Designer', 'Administrator', 'Other']}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.typeOfPaymentId?.message}
                />
                <InputField
                  label={t('pages.suppliers.table.cols.note')}
                  name={'note'}
                  placeholder={t('pages.suppliers.table.cols.note')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.note?.message}
                />
              </FormProvider>
            </Grid>
          </Form>
        ) : null}
        {isOpenEditForm ? (
          <Form
            label={t('pages.suppliers.table.edit')}
            onCancel={() => {
              setSelectedSupplier(null);
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
                  label={t('pages.suppliers.table.cols.name')}
                  name={'name'}
                  placeholder={t('pages.suppliers.table.cols.name')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.name?.message}
                />
                <InputField
                  label={t('pages.suppliers.table.cols.payment-type')}
                  name={'typeOfPaymentId'}
                  placeholder={t('pages.suppliers.table.cols.payment-type')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.typeOfPaymentId?.message}
                />
                <InputField
                  label={t('pages.suppliers.table.cols.note')}
                  name={'note'}
                  placeholder={t('pages.suppliers.table.cols.note')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.note?.message}
                />
              </FormProvider>
            </Grid>
          </Form>
        ) : null}
      </div>

      <Modal
        isOpen={isOpenDeleteModal}
        onOutsudeClick={() => {
          setSelectedSupplier(null);
          setSelectedAction(null);
          setIsOpenDeleteModal(false);
        }}
      >
        {selectedAction === 'Delete' ? (
          <div
            style={{
              fontSize: THEMES.text.fontSize.px22,
              fontWeight: THEMES.text.fontWeight.w700,
              margin: '60px 50px',
            }}
          >
            {selectedSupplier ? (
              <>
                <span style={{ color: THEMES.color.sIndigo }}>
                  {t('utilities.table.confirm-delete') + ' '}
                  <span style={{ color: THEMES.color.sDarkPink }}>{selectedSupplier.name}</span>
                </span>
                <Flex flexDirection='row' justifyContent='center' marginTop='45px'>
                  <ButtonComponent
                    onClick={() => {
                      setSelectedSupplier(null);
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
                    <Icons name='Close' size={28} color={THEMES.color.sIndigo} />{' '}
                    {t('utilities.buttons.cancel')}
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
                    <Icons name='Confirm' size={28} color={THEMES.color.sWhite} />{' '}
                    {t('utilities.buttons.confirm')}
                  </ButtonComponent>
                </Flex>
              </>
            ) : (
              <span style={{ color: THEMES.color.sIndigo }}>
                {t('pages.suppliers.no-selected')}
              </span>
            )}
          </div>
        ) : null}
      </Modal>
    </Flex>
  );
};

export default SuppliersPage;
