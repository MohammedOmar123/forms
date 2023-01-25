/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Col,
  Row,
  DatePicker,
  Radio,
  message,
} from 'antd';

import axios from 'axios';
import moment from 'moment';

import InputFrom from '../Input';
import { rules } from './provider';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const RegisterForm: FC = () => {
  const [havingExperience, setHavingExperience] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'individual' | 'business'>();
  const [form] = Form.useForm();

  const onFinish = async (values: any): Promise<void> => {
    try {
      const result = await axios.post('http://localhost:8080/api/v1/auth/register', {
        ...values,
        birthDate: new Date(values.birthDate).toISOString(),
      });
      message.success(result.data.message);
    } catch (error: any) {
      message.error(error.response?.data.message || 'something went wrong ! ...');
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="+972">+972</Option>
        <Option value="+970">+970</Option>
      </Select>
    </Form.Item>
  );

  const validateAge = (rule:any, value:any):Promise<void> => {
    if (value) {
      const birthDate = value.toDate();
      const age = moment().diff(birthDate, 'years');
      if (age < 18) {
        return Promise.reject('your Age must be greater than 18.');
      }
    }
    return Promise.resolve();
  };

  const {
    email, firstName, lastName, gender, address, birthDate,
    password, phoneNumber, yourExperience, companyName, jopTitle, role,
  }: any = rules;

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{ prefix: '+972', havingExperience: false }}
      style={{
        maxWidth: 900, margin: '30px auto', border: '1px #eee solid', padding: '30px 0',
      }}
      scrollToFirstError
      layout="vertical"
    >
      <Row
        gutter={{
          xs: 8, sm: 16, md: 24, lg: 32,
        }}
        justify="space-around"
        wrap
      >
        <Col span={11} xs={22} sm={13} md={10} lg={10} xl={10}>
          <InputFrom name="firstName" label="First Name" rules={firstName} />
          <InputFrom name="lastName" label="Last Name" rules={lastName} />
          <InputFrom name="email" label="E-mail" rules={email} />

          <Form.Item
            name="gender"
            label="Gender"
            rules={gender}
            hasFeedback
          >
            <Select placeholder="select your gender" style={{ minWidth: '330px' }}>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <InputFrom name="address" label="Address" rules={address} />

          <Form.Item
            label="Birth Date"
            name="birthDate"
            rules={[...birthDate, { validator: validateAge }]}
            hasFeedback
          >
            <DatePicker style={{ minWidth: '330px' }} />
          </Form.Item>
        </Col>

        <Col span={11} xs={22} sm={13} md={10} lg={10} xl={10}>

          <Form.Item
            name="password"
            label="Password"
            tooltip={`password must be at least 8 characters long and contain at
            least 1 uppercase letter, 1 special character and 1 number`}
            rules={password}
            hasFeedback
          >
            <Input.Password style={{ minWidth: '330px' }} />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise
                    .reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password style={{ minWidth: '330px' }} />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={phoneNumber}
            hasFeedback
          >
            <Input
              style={{ minWidth: '330px' }}
              addonBefore={prefixSelector}
            />
          </Form.Item>

          <Form.Item
            name="role"
            label="Register As"
            rules={role}
            hasFeedback
          >
            <Select
              placeholder="select your role"
              style={{ minWidth: '330px' }}
              onChange={(value) => setUserRole(value)}
            >
              <Option value="individual">Individual</Option>
              <Option value="business">Business</Option>
            </Select>
          </Form.Item>

          {
            userRole === 'individual' && (
              <>
                <Form.Item
                  label="Having Experience"
                  name="havingExperience"
                >
                  <Radio.Group
                    onChange={(e) => setHavingExperience(e.target.value)}
                    style={{ minWidth: '330px' }}
                  >
                    <Radio value={false}> No </Radio>
                    <Radio value> yes </Radio>
                  </Radio.Group>
                </Form.Item>

                {havingExperience
                  && (
                    <Form.Item
                      name="yourExperience"
                      label="Your Experience"
                      rules={yourExperience}
                      hasFeedback
                      requiredMark="optional"
                    >
                      <Input.TextArea showCount maxLength={150} style={{ minWidth: '330px' }} />
                    </Form.Item>
                  )}
              </>
            )
          }
          {
            userRole === 'business' && (
              <>
                <InputFrom name="companyName" label="Company Name" rules={companyName} />
                <InputFrom name="jopTitle" label="Top Title" rules={jopTitle} />
              </>
            )
          }

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ minWidth: '330px' }}>
              Register
            </Button>
          </Form.Item>
        </Col>

      </Row>
    </Form>
  );
};

export default RegisterForm;
