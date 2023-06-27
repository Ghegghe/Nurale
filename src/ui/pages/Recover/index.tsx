import '../styles/login.css';
import { Icons } from '../../atoms';
import { ButtonComponent } from '../../atoms';
import { InputField } from '../../molecules';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginInterface } from '../../../utils';
import { schema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';

const RecoverPage = () => {
  const defaultValues = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();

  const methods = useForm<LoginInterface>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const handleClick = async () => {
    const errors = await methods.trigger();

    if (!errors) {
      methods.reset(defaultValues);
      return navigate('/dashboard');
    }
    return errors;
  };
  return (
    <div className='login'>
      <div
        style={{
          backgroundColor: 'white',
          padding: '65px 59px 65px 59px',
          borderRadius: '38px',
          margin: 'auto',
        }}
      >
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
        <hr style={{ margin: 0 }} />
        <div
          style={{
            paddingTop: '33px',
            paddingBottom: '27px',
            fontSize: '27px',
            textAlign: 'center',
          }}
        >
          Password dimenticata
        </div>
        {/* bottoni */}
        <FormProvider {...methods}>
          <InputField
            label={'Email'}
            name={'email'}
            placeholder='Email'
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '27px',
              fontSize: '20px',
            }}
          />
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
            onClick={handleClick}
          >
            Recupera Password
          </ButtonComponent>
          <div
            style={{
              fontSize: '18px',
              textAlign: 'center',
              marginTop: '18px',
            }}
          >
            Torna alla pagina di
            <a className='link' href='/login'>
              {' '}
              Login
            </a>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default RecoverPage;
