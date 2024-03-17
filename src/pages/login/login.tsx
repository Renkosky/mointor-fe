import React, { useState } from 'react'
import style from './login.module.scss'
import { Toast, Button, Form } from '@douyinfe/semi-ui';
import request from 'src/utils/request';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formType, setFormType] = useState<'login' | 'register'>('login')
  const navigate = useNavigate()
  const handleSubmit = (values: any) => {
    console.log(values);
    if (formType === 'register') {
      request.post('/user/register', { data: values }).then(res => {
        console.log(res);
        if (res?.code === 0) {
          Toast.success('注册成功')
          setFormType('login')
        }
      })
      return
    }
    request.post('/user/login', { data: values }).then(res => {
      console.log(res);
      if (res?.code === 0) {
        localStorage.setItem('access_token', res.access_token)
        Toast.success('登录成功')
        setTimeout(() => {
          navigate('/overview')
        }, 1000)
      }
    })
  };

  return (
    <div className={style.login}>
      <div className={style.title}>
        <div style={{ fontSize: 64, fontWeight: 600 }}>Sky Mointer</div>
        <p style={{ fontSize: 20, color: 'var(--semi-white)' }}>欢迎使用Sky Mointer</p>
        <p style={{ fontSize: 20, color: 'var(--semi-white)' }}>监控预警你的项目错误</p>
      </div>
      <div className={style.formArea}>
        <Form onSubmit={values => handleSubmit(values)} style={{ width: 400 }} className={style['form-group']}>
          {({ formState, values, formApi }) => (
            <>
              <Form.Input field='name' label='用户名' style={{ width: '100%' }} placeholder='Enter your phone number' rules={[{ required: true }]}></Form.Input>
              <Form.Input field='password' label='密码' style={{ width: '100%' }} placeholder='Enter your password' rules={[{ required: true }]} type='password'></Form.Input>
              {formType === 'register' && <Form.Input field='email' label='邮箱' style={{ width: '100%' }} placeholder='Enter your email'></Form.Input>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Button theme='borderless' style={{ color: 'var(--semi-color-primary)', cursor: 'pointer' }} onClick={() => setFormType(type => type === 'login' ? 'register' : 'login')}>
                    {formType === 'login' ? '去注册' : '去登录'}</Button>  <span style={{ color: 'black' }}>Or</span>
                </div>

                <Button disabled={!values.password && !values.name} htmlType='submit' type="tertiary">提交</Button>
              </div>
            </>
          ) as React.ReactNode}
        </Form>
      </div>

    </div >
  )
}
