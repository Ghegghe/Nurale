import { Flex, Grid } from '@chakra-ui/react';
import { Navbar } from '../../molecules/Layout/Navbar';
import '../styles/dashboard.css';
import { useSelector } from 'react-redux';
import { createColumnHelper } from '@tanstack/react-table';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Actions, Job } from '../../../utils';
import { schema } from './validation';
import { TableLayout } from '../../molecules/Layout/PageContent';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store';
import { ButtonComponent, Icons } from '../../atoms';
import { InputField, Modal } from '../../molecules';
import { Form } from '../../molecules/Modal';
import { useTranslation } from 'react-i18next';

const UsersPage = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedAction, setSelectedAction] = useState<Actions | null>(null);
  const users = useSelector(getUsersData);
  const { t } = useTranslation();
  const columnHelper: any = createColumnHelper<any>();

  const cols = [
    columnHelper.accessor('firstName', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.users.table.cols.first-name'),
    }),
    columnHelper.accessor('lastName', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.users.table.cols.last-name'),
    }),
    columnHelper.accessor('email', {
      cell: (Props: any) => Props.getValue(),
      header: t('pages.users.table.cols.email'),
    }),
  ];

  const defaultValues: Job = {
    code: '',
    customerId: 0,
    description: '',
    endDate: date,
    estimatedCost: 0,
  };
  const methods = useForm<Job>({
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
    dispatch(fetchUsers());
  }, []);
  useEffect(() => {
    if (selectedAction === 'Add') {
      setIsOpenAddForm(true);
    } else if (selectedAction === 'Edit') {
      reset({
        email: selectedJob?.email,
        firstName: selectedJob?.firstName,
        lastName: selectedJob?.lastName,
      });
      setIsOpenEditForm(true);
    } else if (selectedAction === 'Delete') {
      setIsOpenDeleteModal(true);
    }
  }, [selectedAction]);

  const handleAdd = async () => {
    const isValidate = await trigger();
    if (isValidate) {
      await dispatch(addUser(getValues()));
      await dispatch(fetchUsers());
      reset(defaultValues);
      setSelectedJob(null);
      setSelectedAction(null);
      setIsOpenAddForm(false);
    }
  };
  const handleEdit = async () => {
    const isValidate = await trigger();
    if (isValidate && selectedJob?.id) {
      const user: User = { firstName: getValues().firstName, lastName: getValues().lastName };
      await dispatch(updateUser({ id: selectedJob?.id, user: user }));
      await dispatch(fetchUsers());
      reset(defaultValues);
      setSelectedJob(null);
      setSelectedAction(null);
      setIsOpenEditForm(false);
    }
  };
  const handleDelete = async () => {
    if (selectedJob?.id) {
      await dispatch(deleteUser(selectedJob?.id));
      await dispatch(fetchUsers());
      setSelectedJob(null);
      setSelectedAction(null);
      setIsOpenDeleteModal(false);
    }
  };

  return (
    <Flex flexDirection={'column'} width={'100%'}>
      <Navbar label={t('navbar.users')} />

      <div
        style={{
          position: 'relative',
          height: '100%',
          margin: '75px 30px 15px 30px',
        }}
      >
        <TableLayout
          data={users}
          cols={cols}
          action={{
            setSelection: setSelectedJob,
            setAction: setSelectedAction,
            actions: ['Add', 'Edit', 'Delete'],
          }}
        />
        {isOpenAddForm ? (
          <Form
            label='AGGIUNGI NUOVO UTENTE'
            onCancel={() => {
              setSelectedJob(null);
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
                  label={'Email'}
                  name={'email'}
                  placeholder='Email'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                  error={errors.email?.message}
                />
                <InputField
                  label={'Risorsa'}
                  name={'resourceId'}
                  placeholder='Risorsa'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                />
                <InputField
                  label={'Nome'}
                  name={'firstName'}
                  placeholder='Nome'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                  error={errors.firstName?.message}
                />
                <InputField
                  label={'Cognome'}
                  name={'lastName'}
                  placeholder='Cognome'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                  error={errors.lastName?.message}
                />
                <InputField
                  label={'Password'}
                  name={'password'}
                  placeholder='Password'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                  error={errors.password?.message}
                />
                <InputField
                  label={'Conferma password'}
                  name={'passwordConfirm'}
                  placeholder='Conferma password'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                  error={errors.passwordConfirm?.message}
                />
              </FormProvider>
            </Grid>
          </Form>
        ) : null}
        {isOpenEditForm ? (
          <Form
            label='MODIFICA UTENTE'
            onCancel={() => {
              setSelectedJob(null);
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
                  label={'Email'}
                  name={'email'}
                  placeholder='Email'
                  isDisabled={true}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                  error={errors.email?.message}
                />
                <InputField
                  label={'Risorsa'}
                  name={'resourceId'}
                  placeholder='Risorsa'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                />
                <InputField
                  label={'Nome'}
                  name={'firstName'}
                  placeholder='Nome'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                  error={errors.firstName?.message}
                />
                <InputField
                  label={'Cognome'}
                  name={'lastName'}
                  placeholder='Cognome'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                    fontSize: '20px',
                  }}
                  error={errors.lastName?.message}
                />
              </FormProvider>
            </Grid>
          </Form>
        ) : null}
      </div>

      <Modal
        isOpen={isOpenDeleteModal}
        onOutsudeClick={() => {
          setSelectedJob(null);
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
            {selectedJob ? (
              <>
                <span style={{ color: 'rgba(81, 70, 137, 1)' }}>
                  Sei sicuro di voler eliminare{' '}
                  <span
                    style={{ color: 'rgba(239, 66, 111, 1)' }}
                  >{`${selectedJob.firstName} ${selectedJob.lastName}`}</span>
                </span>
                <Flex flexDirection='row' justifyContent='center' marginTop='45px'>
                  <ButtonComponent
                    onClick={() => {
                      setSelectedJob(null);
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
                    <Icons name='Close' size={28} color='rgba(81, 70, 137, 1)' /> Annulla
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
                    <Icons name='Confirm' size={28} color='white' /> Conferma
                  </ButtonComponent>
                </Flex>
              </>
            ) : (
              <span style={{ color: 'rgba(81, 70, 137, 1)' }}>Nessun utente selezionato</span>
            )}
          </div>
        ) : null}
      </Modal>
    </Flex>
  );
};

export default UsersPage;
