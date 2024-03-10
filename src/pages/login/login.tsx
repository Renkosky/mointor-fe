import React from 'react'
import style from './login.module.scss'
import { Toast, Button, Form } from '@douyinfe/semi-ui';
import request from 'src/utils/request';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate()
  const handleSubmit = (values: any) => {
    console.log(values);
    Toast.info('表单已提交');
    request.post('/user/login', { data: values }).then(res => {
      console.log(res);
      if (res?.code === 0) {
        localStorage.setItem('access_token', res.access_token)
        navigate('/overview')
      }
    })
  };
  return (
    <div className={style.login}>
      <div className={style.title}>
        <div style={{ fontSize: 32, fontWeight: 600 }}>Sky Mointer</div>

      </div>
      <div className={style.formArea}>
        <Form onSubmit={values => handleSubmit(values)} style={{ width: 400 }} className={style['form-group']}>
          {({ formState, values, formApi }) => (
            <>
              <Form.Input field='name' label='用户名' style={{ width: '100%' }} placeholder='Enter your phone number'></Form.Input>
              <Form.Input field='password' label='密码' style={{ width: '100%' }} placeholder='Enter your password'></Form.Input>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>
                  <span>Or</span><Button theme='borderless' style={{ color: 'var(--semi-color-primary)', marginLeft: 10, cursor: 'pointer' }}>Sign up</Button>
                </p>
                <Button disabled={!values.password && !values.name} htmlType='submit' type="tertiary">Log in</Button>
              </div>
            </>
          ) as React.ReactNode}
        </Form>
      </div>

    </div>
  )
}
