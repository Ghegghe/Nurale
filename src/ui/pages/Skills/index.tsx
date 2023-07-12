import { Flex, Grid } from '@chakra-ui/react';
import { Navbar } from '../../molecules/Layout/Navbar';
import '../styles/dashboard.css';
import { useSelector } from 'react-redux';
import { createColumnHelper } from '@tanstack/react-table';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Actions, Skill } from '../../../utils';
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
  updateSkill,
} from '../../../store/skills';

const SkillsPage = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedAction, setSelectedAction] = useState<Actions | null>(null);
  const skill = useSelector(getSkillsData);
  const { t } = useTranslation();
  const columnHelper: any = createColumnHelper<any>();

  const cols = [
    columnHelper.accessor('name', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.skills.table.cols.name'),
    }),
    columnHelper.accessor('skill-type', {
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
    dispatch(fetchSkills());
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

  const handleAdd = async () => {
    const isValidate = await trigger();
    if (isValidate) {
      await dispatch(addSkill(getValues()));
      await dispatch(fetchSkills());
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
      await dispatch(fetchSkills());
      reset(defaultValues);
      setSelectedSkill(null);
      setSelectedAction(null);
      setIsOpenEditForm(false);
    }
  };
  const handleDelete = async () => {
    if (selectedSkill?.id) {
      await dispatch(deleteSkill(selectedSkill?.id));
      await dispatch(fetchSkills());
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
            actions: ['Add', 'Edit', 'Delete'],
          }}
        />
        {isOpenAddForm ? (
          <Form
            label={t('pages.skills.add')}
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
            <Grid columnGap='10px' gridTemplateColumns={'1fr 1fr'}>
              <FormProvider {...methods}>
                <InputField
                  label={t('pages.skills.table.cols.name')}
                  name={'name'}
                  placeholder={t('pages.skills.table.cols.name')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                  error={errors.name?.message}
                />
                <InputField
                  label={t('pages.skills.table.cols.skill-type')}
                  name={'skillType'}
                  placeholder={t('pages.skills.table.cols.skill-type')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                  error={errors.skillType?.message}
                />
                <InputField
                  label={t('pages.skills.table.cols.note')}
                  name={'note'}
                  placeholder={t('pages.skills.table.cols.note')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                  error={errors.note?.message}
                />
              </FormProvider>
            </Grid>
          </Form>
        ) : null}
        {isOpenEditForm ? (
          <Form
            label={t('pages.skill.edit')}
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
            <Grid columnGap='10px' gridTemplateColumns={'1fr 1fr'}>
              <FormProvider {...methods}>
                <InputField
                  label={t('pages.skills.table.cols.name')}
                  name={'name'}
                  placeholder={t('pages.skills.table.cols.name')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                  error={errors.name?.message}
                />
                <InputField
                  label={t('pages.skills.table.cols.skill-type')}
                  name={'skillType'}
                  placeholder={t('pages.skills.table.cols.skill-type')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                  error={errors.skillType?.message}
                />
                <InputField
                  label={t('pages.skills.table.cols.note')}
                  name={'note'}
                  placeholder={t('pages.skills.table.cols.note')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
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
              fontSize: '22px',
              fontWeight: '700',
              color: 'rgba(81, 70, 137, 1)',
              margin: '60px 50px',
            }}
          >
            {selectedSkill ? (
              <>
                <span style={{ color: 'rgba(81, 70, 137, 1)' }}>
                  {t('utilities.table.confirm-delete') + ' '}
                  <span style={{ color: 'rgba(239, 66, 111, 1)' }}>{selectedSkill.name}</span>
                </span>
                <Flex flexDirection='row' justifyContent='center' marginTop='45px'>
                  <ButtonComponent
                    onClick={() => {
                      setSelectedSkill(null);
                      setSelectedAction(null);
                      setIsOpenDeleteModal(false);
                    }}
                    style={{
                      color: 'rgba(81, 70, 137, 1)',
                      background: 'rgba(81, 70, 137, 0.3)',
                      fontSize: '22px',
                      fontWeight: '700',
                      width: '145px',
                    }}
                  >
                    <Icons name='Close' size={28} color='rgba(81, 70, 137, 1)' /> {t('cancel')}
                  </ButtonComponent>
                  <ButtonComponent
                    onClick={() => {
                      handleDelete();
                    }}
                    style={{
                      color: 'white',
                      background: 'rgba(239, 66, 111, 1)',
                      fontSize: '22px',
                      fontWeight: '700',
                      width: '145px',
                      marginLeft: '28px',
                    }}
                  >
                    <Icons name='Confirm' size={28} color='white' /> {t('confirm')}
                  </ButtonComponent>
                </Flex>
              </>
            ) : (
              <span style={{ color: 'rgba(81, 70, 137, 1)' }}>{t('pages.skills.no-selected')}</span>
            )}
          </div>
        ) : null}
      </Modal>
    </Flex>
  );
};

export default SkillsPage;
