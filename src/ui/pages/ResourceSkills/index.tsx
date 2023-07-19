import { Flex, Grid } from '@chakra-ui/react';
import { Navbar } from '../../molecules/Layout/Navbar';
import '../styles/dashboard.css';
import { useSelector } from 'react-redux';
import { createColumnHelper } from '@tanstack/react-table';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Actions, ResourceSkill, THEMES } from '../../../utils';
import { schema } from './validation';
import { TableLayout } from '../../molecules/Layout/PageContent';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store';
import { ButtonComponent, Icons } from '../../atoms';
import { InputField, Modal } from '../../molecules';
import { Form } from '../../molecules/Modal';
import { useTranslation } from 'react-i18next';
import {
  addResourceSkill,
  deleteResourceSkill,
  fetchResourceSkills,
  getResourceSkillsData,
  getResourceSkillsTotalCount,
  updateResourceSkill,
} from '../../../store';

const ResourceSkillsPage = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedResourceSkill, setSelectedResourceSkill] = useState<ResourceSkill | null>(null);
  const [selectedAction, setSelectedAction] = useState<Actions | null>(null);
  const resourceSkill = useSelector(getResourceSkillsData);
  const take = 10;
  const totalCount = useSelector(getResourceSkillsTotalCount);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const columnHelper: any = createColumnHelper<any>();

  const cols = [
    columnHelper.accessor('resource.name', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.resource-skills.table.cols.resource'),
    }),
    columnHelper.accessor('skill.name', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.resource-skills.table.cols.skill'),
    }),
    columnHelper.accessor('level', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.resource-skills.table.cols.level'),
    }),
    columnHelper.accessor('note', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.resource-skills.table.cols.note'),
    }),
  ];

  const defaultValues: ResourceSkill = {
    resourceId: 0,
    skillId: 0,
    level: 0,
    note: '',
  };
  const methods = useForm<ResourceSkill>({
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
    dispatch(fetchResourceSkills({ take, skip }));
    console.log(resourceSkill);
  }, []);
  useEffect(() => {
    if (selectedAction === 'Add') {
      setIsOpenAddForm(true);
    } else if (selectedAction === 'Edit') {
      reset({
        resourceId: selectedResourceSkill?.resourceId,
        skillId: selectedResourceSkill?.skillId,
        level: selectedResourceSkill?.level,
        note: selectedResourceSkill?.note,
      });
      setIsOpenEditForm(true);
    } else if (selectedAction === 'Delete') {
      setIsOpenDeleteModal(true);
    }
  }, [selectedAction]);
  useEffect(() => {
    let skip = (page - 1) * take;
    dispatch(fetchResourceSkills({ take, skip }));
  }, [page]);

  const handleAdd = async () => {
    const isValidate = await trigger();
    if (isValidate) {
      await dispatch(addResourceSkill(getValues()));
      let skip = (page - 1) * take;
      await dispatch(fetchResourceSkills({ take, skip }));
      reset(defaultValues);
      setSelectedResourceSkill(null);
      setSelectedAction(null);
      setIsOpenAddForm(false);
    }
  };
  const handleEdit = async () => {
    const isValidate = await trigger();
    if (isValidate && selectedResourceSkill?.id) {
      const resourceSkill: ResourceSkill = {
        resourceId: getValues().resourceId,
        skillId: getValues().skillId,
        level: getValues().level,
        note: getValues().note,
      };
      await dispatch(
        updateResourceSkill({ id: selectedResourceSkill?.id, resourceSkill: resourceSkill }),
      );
      let skip = (page - 1) * take;
      await dispatch(fetchResourceSkills({ take, skip }));
      reset(defaultValues);
      setSelectedResourceSkill(null);
      setSelectedAction(null);
      setIsOpenEditForm(false);
    }
  };
  const handleDelete = async () => {
    if (selectedResourceSkill?.id) {
      await dispatch(deleteResourceSkill(selectedResourceSkill?.id));
      let skip = (page - 1) * take;
      await dispatch(fetchResourceSkills({ take, skip }));
      setSelectedResourceSkill(null);
      setSelectedAction(null);
      setIsOpenDeleteModal(false);
    }
  };

  return (
    <Flex flexDirection={'column'} width={'100%'}>
      <Navbar label={t('navbar.resource-skills')} />

      <div
        style={{
          position: 'relative',
          height: '100%',
          margin: '75px 30px 15px 30px',
        }}
      >
        <TableLayout
          data={resourceSkill}
          cols={cols}
          action={{
            setSelection: setSelectedResourceSkill,
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
            label={t('pages.resource-skills.table.add')}
            onCancel={() => {
              setSelectedResourceSkill(null);
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
                  label={t('pages.resource-skills.table.cols.resource')}
                  name={'resourceId'}
                  placeholder={t('pages.resource-skills.table.cols.resource')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.resourceId?.message}
                />
                <InputField
                  label={t('pages.resource-skills.table.cols.skill')}
                  name={'skillId'}
                  placeholder={t('pages.resource-skills.table.cols.skill')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.skillId?.message}
                />
                <InputField
                  label={t('pages.resource-skills.table.cols.level')}
                  name={'level'}
                  placeholder={t('pages.resource-skills.table.cols.level')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.level?.message}
                />
                <InputField
                  label={t('pages.resource-skills.table.cols.note')}
                  name={'note'}
                  placeholder={t('pages.resource-skills.table.cols.note')}
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
            label={t('pages.resource-skills.table.edit')}
            onCancel={() => {
              setSelectedResourceSkill(null);
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
                  label={t('pages.resource-skills.table.cols.resource')}
                  name={'resourceId'}
                  placeholder={t('pages.resource-skills.table.cols.resource')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.resourceId?.message}
                />
                <InputField
                  label={t('pages.resource-skills.table.cols.skill')}
                  name={'skillId'}
                  placeholder={t('pages.resource-skills.table.cols.skill')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.skillId?.message}
                />
                <InputField
                  label={t('pages.resource-skills.table.cols.level')}
                  name={'level'}
                  placeholder={t('pages.resource-skills.table.cols.level')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.level?.message}
                />
                <InputField
                  label={t('pages.resource-skills.table.cols.note')}
                  name={'note'}
                  placeholder={t('pages.resource-skills.table.cols.note')}
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
          setSelectedResourceSkill(null);
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
            {selectedResourceSkill ? (
              <>
                <span style={{ color: THEMES.color.sIndigo }}>
                  {t('utilities.table.confirm-delete') + ' '}
                  <span style={{ color: THEMES.color.sDarkPink }}>
                    {selectedResourceSkill.skill?.name}
                  </span>{' '}
                  da{' '}
                  <span style={{ color: THEMES.color.sDarkPink }}>
                    {selectedResourceSkill.resource?.name}
                  </span>
                </span>
                <Flex flexDirection='row' justifyContent='center' marginTop='45px'>
                  <ButtonComponent
                    onClick={() => {
                      setSelectedResourceSkill(null);
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
                {t('pages.resource-skills.no-selected')}
              </span>
            )}
          </div>
        ) : null}
      </Modal>
    </Flex>
  );
};

export default ResourceSkillsPage;
