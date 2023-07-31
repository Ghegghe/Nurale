import { Flex, Grid } from '@chakra-ui/react';
import { Navbar } from '../../molecules/Layout/Navbar';
import '../styles/dashboard.css';
import { useSelector } from 'react-redux';
import { addUser, deleteUser, fetchUsers, getUsersData, updateUser } from '../../../store/users';
import { createColumnHelper } from '@tanstack/react-table';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { User, Actions, THEMES, KeyValue } from '../../../utils';
import { schema } from './validation';
import { TableLayout } from '../../molecules/Layout/PageContent';
import { useEffect, useState } from 'react';
import { fetchResources, getResourcesData, useAppDispatch } from '../../../store';
import { ButtonComponent, Icons } from '../../atoms';
import { InputField, Modal, SelectField } from '../../molecules';
import { Form } from '../../molecules/Modal';
import { useTranslation } from 'react-i18next';

const UsersPage = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedAction, setSelectedAction] = useState<Actions | null>(null);
  const users = useSelector(getUsersData);
  const { t } = useTranslation();
  const columnHelper: any = createColumnHelper<any>();
  const resources = useSelector(getResourcesData);
  const [resourceOptions, setResourceOptions] = useState<KeyValue[]>([]);

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

  const defaultValues = {
    email: '',
    password: '',
    passwordConfirm: '',
    lastName: '',
    firstName: '',
    resourceId: null,
  };
  const methods = useForm<User>({
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

  const getResources = async () => {
    await dispatch(fetchResources({}));
    let options: KeyValue[] = [];
    await resources.map((resource) => {
      if (resource.id) {
        options.push({
          id: resource.id,
          description: `${resource.firstName} ${resource.lastName}`,
        });
      }
    });
    setResourceOptions(options);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  useEffect(() => {
    if (selectedAction === 'Add') {
      getResources();
      setIsOpenAddForm(true);
    } else if (selectedAction === 'Edit') {
      reset({
        email: selectedUser?.email,
        firstName: selectedUser?.firstName,
        lastName: selectedUser?.lastName,
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
      setSelectedUser(null);
      setSelectedAction(null);
      setIsOpenAddForm(false);
    }
  };
  const handleEdit = async () => {
    const isValidate = await trigger();
    if (isValidate && selectedUser?.id) {
      const user: User = { firstName: getValues().firstName, lastName: getValues().lastName };
      await dispatch(updateUser({ id: selectedUser?.id, user: user }));
      await dispatch(fetchUsers());
      reset(defaultValues);
      setSelectedUser(null);
      setSelectedAction(null);
      setIsOpenEditForm(false);
    }
  };
  const handleDelete = async () => {
    if (selectedUser?.id) {
      await dispatch(deleteUser(selectedUser?.id));
      await dispatch(fetchUsers());
      setSelectedUser(null);
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
            setSelection: setSelectedUser,
            setAction: setSelectedAction,
            actions: ['Add', 'Edit', 'Delete'],
          }}
        />
        {isOpenAddForm ? (
          <Form
            label='AGGIUNGI NUOVO UTENTE'
            onCancel={() => {
              setSelectedUser(null);
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
                  label={'Email'}
                  name={'email'}
                  placeholder='Email'
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.email?.message}
                />
                <SelectField
                  label={'Risorsa'}
                  name={'resourceId'}
                  placeholder='Risorsa'
                  inputFontSize={THEMES.text.fontSize.px18}
                  options={resourceOptions}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                />
                <InputField
                  label={'Nome'}
                  name={'firstName'}
                  placeholder='Nome'
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.firstName?.message}
                />
                <InputField
                  label={'Cognome'}
                  name={'lastName'}
                  placeholder='Cognome'
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.lastName?.message}
                />
                <InputField
                  label={'Password'}
                  name={'password'}
                  placeholder='Password'
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.password?.message}
                />
                <InputField
                  label={'Conferma password'}
                  name={'passwordConfirm'}
                  placeholder='Conferma password'
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
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
              setSelectedUser(null);
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
                  label={'Email'}
                  name={'email'}
                  placeholder='Email'
                  inputFontSize={THEMES.text.fontSize.px18}
                  isDisabled={true}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.email?.message}
                />
                <SelectField
                  label={'Risorsa'}
                  name={'resourceId'}
                  placeholder='Risorsa'
                  inputFontSize={THEMES.text.fontSize.px18}
                  options={resourceOptions}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                />
                <InputField
                  label={'Nome'}
                  name={'firstName'}
                  placeholder='Nome'
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
                  }}
                  error={errors.firstName?.message}
                />
                <InputField
                  label={'Cognome'}
                  name={'lastName'}
                  placeholder='Cognome'
                  inputFontSize={THEMES.text.fontSize.px18}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '13px',
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
          setSelectedUser(null);
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
            {selectedUser ? (
              <>
                <span style={{ color: THEMES.color.sIndigo }}>
                  {t('utilities.table.confirm-delete')}{' '}
                  <span
                    style={{ color: THEMES.color.sDarkPink }}
                  >{`${selectedUser.firstName} ${selectedUser.lastName}`}</span>
                </span>
                <Flex flexDirection='row' justifyContent='center' marginTop='45px'>
                  <ButtonComponent
                    onClick={() => {
                      setSelectedUser(null);
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
                {t('pages.users.table.no-selected')}
              </span>
            )}
          </div>
        ) : null}
      </Modal>
    </Flex>
  );
};

export default UsersPage;
