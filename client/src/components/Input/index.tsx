import { FC } from 'react';
import { Form, Input } from 'antd';

interface IInputProps {
  name:string,
  label:string,
  rules:any;
}

const InputFrom: FC <IInputProps> = ({
  name, label, rules,
}) => (
  <Form.Item
    name={name}
    label={label}
    rules={rules}
    hasFeedback
  >
    <Input style={{ minWidth: '330px' }} />
  </Form.Item>
);

export default InputFrom;
