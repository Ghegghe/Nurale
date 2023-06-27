import '../styles/login.css';
import { Icons } from '../../atoms';
import { ButtonComponent } from '../../atoms';
import { CheckboxField, InputField } from '../../molecules';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginInterface, ROUTES } from '../../../utils';
import { schema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginUser } from '../../../store/Auth';
import { useAppDispatch } from '../../../store';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const defaultValues = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const methods = useForm<LoginInterface>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const handleAccess = async () => {
    const errors = await methods.trigger();
    if (!errors) {
      return errors;
    }
    dispatch(LoginUser(methods.getValues()));
    return navigate(ROUTES.dashboard);
  };

  return (
    <div
      className='login'
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          width: '30%',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingBottom: '26px',
            }}
          >
            <Icons name='NuraleGradient' size={72} />
            <div style={{ paddingLeft: '26px', alignSelf: 'center' }}>
              <Icons name='Nurale' height={52} width={214} color='#041E42' />
            </div>
          </div>
          <hr style={{ marginBottom: '33px' }} />
          {/* bottoni */}
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
            />
            <CheckboxField
              label='Ricordami'
              name='remember'
              style={{ marginBottom: '15px', fontSize: '18px' }}
            />
            <div
              style={{
                fontSize: '18px',
                textAlign: 'center',
                marginBottom: '45px',
              }}
            >
              Hai dimenticato la
              <a className='link' href='/recover'>
                {' '}
                password
              </a>
              ?
            </div>
            <ButtonComponent
              style={{
                background: 'rgba(239, 66, 111, 1)',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontSize: '25px',
                padding: '8px',
                width: '100%',
              }}
              onClick={handleAccess}
            >
              Accedi
            </ButtonComponent>
            <div
              style={{
                fontSize: '18px',
                textAlign: 'center',
                marginTop: '10px',
              }}
            >
              Non sei ancora registrato?
              <a className='link' href='/register'>
                {' '}
                Registrati
              </a>
            </div>
          </FormProvider>
        </div>
      </div>
      <div
        style={{
          width: '70%',
          alignSelf: 'center',
          textAlign: 'center',
        }}
      >
        <Icons name='NuraleSolid' size={344} color='#fff' />
      </div>
    </div>
  );
};

export default LoginPage;
