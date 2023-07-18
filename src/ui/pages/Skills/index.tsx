import { Flex, Grid } from '@chakra-ui/react';
import { Navbar } from '../../molecules/Layout/Navbar';
import '../styles/dashboard.css';
import { useSelector } from 'react-redux';
import { createColumnHelper } from '@tanstack/react-table';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Actions, Skill, THEMES } from '../../../utils';
import { schema } from './validation';
import { TableLayout } from '../../molecules/Layout/PageContent';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store';
import { ButtonComponent, Icons } from '../../atoms';
import { InputField, Modal } from '../../molecules';
import { Form } from '../../molecules/Modal';
import { useTranslation } from 'react-i18next';
import {
  addSkill,
  deleteSkill,
  fetchSkills,
  getSkillsData,
  getSkillsTotalCount,
  updateSkill,
} from '../../../store/skills';

const SkillsPage = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedAction, setSelectedAction] = useState<Actions | null>(null);
  const skill = useSelector(getSkillsData);
  const take = 10;
  const totalCount = useSelector(getSkillsTotalCount);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const columnHelper: any = createColumnHelper<any>();

  const cols = [
    columnHelper.accessor('name', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.skills.table.cols.name'),
    }),
    columnHelper.accessor('skillType', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.skills.table.cols.skill-type'),
    }),
    columnHelper.accessor('note', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.skills.table.cols.note'),
    }),
  ];

  const defaultValues: Skill = {
    name: '',
    skillType: '',
    note: '',
  };
  const methods = useForm<Skill>({
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
    dispatch(fetchSkills({ take, skip }));
  }, []);
  useEffect(() => {
    if (selectedAction === 'Add') {
      setIsOpenAddForm(true);
    } else if (selectedAction === 'Edit') {
      reset({
        name: selectedSkill?.name,
        skillType: selectedSkill?.skillType,
        note: selectedSkill?.note,
      });
      setIsOpenEditForm(true);
    } else if (selectedAction === 'Delete') {
      setIsOpenDeleteModal(true);
    }
  }, [selectedAction]);
  useEffect(() => {
    let skip = (page - 1) * take;
    dispatch(fetchSkills({ take, skip }));
  }, [page]);

  const handleAdd = async () => {
    const isValidate = await trigger();
    if (isValidate) {
      await dispatch(addSkill(getValues()));
      let skip = (page - 1) * take;
      await dispatch(fetchSkills({ take, skip }));
      reset(defaultValues);
      setSelectedSkill(null);
      setSelectedAction(null);
      setIsOpenAddForm(false);
    }
  };
  const handleEdit = async () => {
    const isValidate = await trigger();
    if (isValidate && selectedSkill?.id) {
      const skill: Skill = {
        name: getValues().name,
        skillType: getValues().skillType,
        note: getValues().note,
      };
      await dispatch(updateSkill({ id: selectedSkill?.id, skill: skill }));
      let skip = (page - 1) * take;
      await dispatch(fetchSkills({ take, skip }));
      reset(defaultValues);
      setSelectedSkill(null);
      setSelectedAction(null);
      setIsOpenEditForm(false);
    }
  };
  const handleDelete = async () => {
    if (selectedSkill?.id) {
      await dispatch(deleteSkill(selectedSkill?.id));
      let skip = (page - 1) * take;
      await dispatch(fetchSkills({ take, skip }));
      setSelectedSkill(null);
      setSelectedAction(null);
      setIsOpenDeleteModal(false);
    }
  };

  return (
    <Flex flexDirection={'column'} width={'100%'}>
      <Navbar label={t('navbar.skills')} />

      <div
        style={{
          position: 'relative',
          height: '100%',
          margin: '75px 30px 15px 30px',
        }}
      >
        <TableLayout
          data={skill}
          cols={cols}
          action={{
            setSelection: setSelectedSkill,
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
            label={t('pages.skills.table.add')}
            onCancel={() => {
              setSelectedSkill(null);
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
                  label={t('pages.skills.table.cols.name')}
                  name={'name'}
                  placeholder={t('pages.skills.table.cols.name')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.name?.message}
                />
                <InputField
                  label={t('pages.skills.table.cols.skill-type')}
                  name={'skillType'}
                  placeholder={t('pages.skills.table.cols.skill-type')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  type='select'
                  select={['Frontend', 'Backend', 'Designer', 'Administrator', 'Other']}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.skillType?.message}
                />
                <InputField
                  label={t('pages.skills.table.cols.note')}
                  name={'note'}
                  placeholder={t('pages.skills.table.cols.note')}
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
            label={t('pages.skills.table.edit')}
            onCancel={() => {
              setSelectedSkill(null);
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
                  label={t('pages.skills.table.cols.name')}
                  name={'name'}
                  placeholder={t('pages.skills.table.cols.name')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.name?.message}
                />
                <InputField
                  label={t('pages.skills.table.cols.skill-type')}
                  name={'skillType'}
                  placeholder={t('pages.skills.table.cols.skill-type')}
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.skillType?.message}
                />
                <InputField
                  label={t('pages.skills.table.cols.note')}
                  name={'note'}
                  placeholder={t('pages.skills.table.cols.note')}
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
          setSelectedSkill(null);
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
            {selectedSkill ? (
              <>
                <span style={{ color: THEMES.color.sIndigo }}>
                  {t('utilities.table.confirm-delete') + ' '}
                  <span style={{ color: THEMES.color.sDarkPink }}>{selectedSkill.name}</span>
                </span>
                <Flex flexDirection='row' justifyContent='center' marginTop='45px'>
                  <ButtonComponent
                    onClick={() => {
                      setSelectedSkill(null);
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
              <span style={{ color: THEMES.color.sIndigo }}>{t('pages.skills.no-selected')}</span>
            )}
          </div>
        ) : null}
      </Modal>
    </Flex>
  );
};

export default SkillsPage;
