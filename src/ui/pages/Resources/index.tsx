import { Flex, Grid } from '@chakra-ui/react';
import { Navbar } from '../../molecules/Layout/Navbar';
import '../styles/dashboard.css';
import { useSelector } from 'react-redux';
import { createColumnHelper } from '@tanstack/react-table';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Actions, Resource, THEMES } from '../../../utils';
import { schema } from './validation';
import { TableLayout } from '../../molecules/Layout/PageContent';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store';
import { ButtonComponent, Icons } from '../../atoms';
import { InputField, Modal } from '../../molecules';
import { Form } from '../../molecules/Modal';
import { useTranslation } from 'react-i18next';
import {
  addResource,
  deleteResource,
  fetchResources,
  getResourcesData,
  getResourcesTotalCount,
  updateResource,
} from '../../../store';

const ResourcesPage = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [selectedAction, setSelectedAction] = useState<Actions | null>(null);
  const resource = useSelector(getResourcesData);
  const take = 10;
  const totalCount = useSelector(getResourcesTotalCount);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const columnHelper: any = createColumnHelper<any>();

  const cols = [
    columnHelper.accessor('firstName', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.resources.table.cols.first-name'),
    }),
    columnHelper.accessor('lastName', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.resources.table.cols.last-name'),
    }),
    columnHelper.accessor('hourCost', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.resources.table.cols.hour-cost'),
    }),
    columnHelper.accessor('hourRevenue', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.resources.table.cols.hour-revenue'),
    }),
    columnHelper.accessor('curriculumVitae', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.resources.table.cols.curriculum-vitae'),
    }),
    columnHelper.accessor('supplier.name', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.resources.table.cols.supplier'),
    }),
    columnHelper.accessor('note', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.resources.table.cols.note'),
    }),
  ];

  const defaultValues: Resource = {
    firstName: '',
    lastName: '',
    hourCost: 0,
    hourRevenue: 0,
    curriculumVitae: '',
    supplierId: 0,
    note: '',
  };
  const methods = useForm<Resource>({
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
    dispatch(fetchResources({ take, skip }));
  }, []);
  useEffect(() => {
    if (selectedAction === 'Add') {
      setIsOpenAddForm(true);
    } else if (selectedAction === 'Edit') {
      reset({
        firstName: selectedResource?.firstName,
        lastName: selectedResource?.lastName,
        hourCost: selectedResource?.hourCost,
        hourRevenue: selectedResource?.hourRevenue,
        curriculumVitae: selectedResource?.curriculumVitae,
        supplierId: selectedResource?.supplierId,
        note: selectedResource?.note,
      });
      setIsOpenEditForm(true);
    } else if (selectedAction === 'Delete') {
      setIsOpenDeleteModal(true);
    }
  }, [selectedAction]);
  useEffect(() => {
    let skip = (page - 1) * take;
    dispatch(fetchResources({ take, skip }));
  }, [page]);

  const handleAdd = async () => {
    const isValidate = await trigger();
    if (isValidate) {
      await dispatch(addResource(getValues()));
      let skip = (page - 1) * take;
      await dispatch(fetchResources({ take, skip }));
      reset(defaultValues);
      setSelectedResource(null);
      setSelectedAction(null);
      setIsOpenAddForm(false);
    }
  };
  const handleEdit = async () => {
    const isValidate = await trigger();
    if (isValidate && selectedResource?.id) {
      const resource: Resource = {
        firstName: getValues().firstName,
        lastName: getValues().lastName,
        hourCost: getValues().hourCost,
        hourRevenue: getValues().hourRevenue,
        curriculumVitae: getValues().curriculumVitae,
        supplierId: getValues().supplierId,
        note: getValues().note,
      };
      await dispatch(updateResource({ id: selectedResource?.id, resource: resource }));
      let skip = (page - 1) * take;
      await dispatch(fetchResources({ take, skip }));
      reset(defaultValues);
      setSelectedResource(null);
      setSelectedAction(null);
      setIsOpenEditForm(false);
    }
  };
  const handleDelete = async () => {
    if (selectedResource?.id) {
      await dispatch(deleteResource(selectedResource?.id));
      let skip = (page - 1) * take;
      await dispatch(fetchResources({ take, skip }));
      setSelectedResource(null);
      setSelectedAction(null);
      setIsOpenDeleteModal(false);
    }
  };

  return (
    <Flex flexDirection={'column'} width={'100%'}>
      <Navbar label={t('navbar.resources')} />

      <div
        style={{
          position: 'relative',
          height: '100%',
          margin: '75px 30px 15px 30px',
        }}
      >
        <TableLayout
          data={resource}
          cols={cols}
          action={{
            setSelection: setSelectedResource,
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
            label={t('pages.resources.table.add')}
            onCancel={() => {
              setSelectedResource(null);
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
                  label={t('pages.resources.table.cols.first-name')}
                  name={'firstName'}
                  placeholder={t('pages.resources.table.cols.first-name')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.firstName?.message}
                />
                <InputField
                  label={t('pages.resources.table.cols.last-name')}
                  name={'lastName'}
                  placeholder={t('pages.resources.table.cols.last-name')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.lastName?.message}
                />
                <InputField
                  label={t('pages.resources.table.cols.hour-cost')}
                  name={'hourCost'}
                  placeholder={t('pages.resources.table.cols.hour-cost')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.hourCost?.message}
                />
                <InputField
                  label={t('pages.resources.table.cols.hour-revenue')}
                  name={'hourRevenue'}
                  placeholder={t('pages.resources.table.cols.hour-revenue')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.hourRevenue?.message}
                />
                <InputField
                  label={t('pages.resources.table.cols.curriculum-vitae')}
                  name={'curriculumVitae'}
                  placeholder={t('pages.resources.table.cols.curriculum-vitae')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.curriculumVitae?.message}
                />
                <InputField
                  label={t('pages.resources.table.cols.supplier')}
                  name={'supplierId'}
                  placeholder={t('pages.resources.table.cols.supplier')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.supplierId?.message}
                />
                <InputField
                  label={t('pages.resources.table.cols.note')}
                  name={'note'}
                  placeholder={t('pages.resources.table.cols.note')}
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
            label={t('pages.resources.table.edit')}
            onCancel={() => {
              setSelectedResource(null);
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
                  label={t('pages.resources.table.cols.first-name')}
                  name={'firstName'}
                  placeholder={t('pages.resources.table.cols.first-name')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.firstName?.message}
                />
                <InputField
                  label={t('pages.resources.table.cols.last-name')}
                  name={'lastName'}
                  placeholder={t('pages.resources.table.cols.last-name')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.lastName?.message}
                />
                <InputField
                  label={t('pages.resources.table.cols.hour-cost')}
                  name={'hourCost'}
                  placeholder={t('pages.resources.table.cols.hour-cost')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.hourCost?.message}
                />
                <InputField
                  label={t('pages.resources.table.cols.hour-revenue')}
                  name={'hourRevenue'}
                  placeholder={t('pages.resources.table.cols.hour-revenue')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.hourRevenue?.message}
                />
                <InputField
                  label={t('pages.resources.table.cols.curriculum-vitae')}
                  name={'curriculumVitae'}
                  placeholder={t('pages.resources.table.cols.curriculum-vitae')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.curriculumVitae?.message}
                />
                <InputField
                  label={t('pages.resources.table.cols.supplier')}
                  name={'supplierId'}
                  placeholder={t('pages.resources.table.cols.supplier')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.supplierId?.message}
                />
                <InputField
                  label={t('pages.resources.table.cols.note')}
                  name={'note'}
                  placeholder={t('pages.resources.table.cols.note')}
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
          setSelectedResource(null);
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
            {selectedResource ? (
              <>
                <span style={{ color: THEMES.color.sIndigo }}>
                  {t('utilities.table.confirm-delete') + ' '}
                  <span style={{ color: THEMES.color.sDarkPink }}>
                    {selectedResource.firstName}
                  </span>
                </span>
                <Flex flexDirection='row' justifyContent='center' marginTop='45px'>
                  <ButtonComponent
                    onClick={() => {
                      setSelectedResource(null);
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
                {t('pages.resources.no-selected')}
              </span>
            )}
          </div>
        ) : null}
      </Modal>
    </Flex>
  );
};

export default ResourcesPage;
