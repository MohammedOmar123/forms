export const rules = {
  email: [
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
    {
      required: true,
      message: 'Please input your E-mail!',
    },
  ],

  firstName: [{
    required: true,
    message: 'Please input your First Name!',
    type: 'string',
  }],

  lastName: [{
    required: true,
    message: 'Please input your Last Name!',
    type: 'string',
  }],

  gender: [{
    required: true,
    message: 'Please input your Gender!',
    type: 'string',
  }],

  address: [{
    required: true,
    message: 'Please input your address!',
    type: 'string',
  }],

  birthDate: [{
    required: true,
    message: 'Please input your birthDate!',
    type: 'date',
  }],

  password: [
    {
      required: true,
      message: 'Please input your password!',
      type: 'string',
    },
    {
      pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
      message: `password must be at least 8 characters long and contain at
        least 1 uppercase letter, 1 special character and 1 number`,
    },
  ],
  phoneNumber: [{
    required: true,
    message: 'Please input your phone number!',
    type: 'string',
  }],

  role: [{
    required: true,
    message: 'Please input your role!',
    type: 'string',
  }],

  yourExperience: [{
    required: false,
    message: 'Please input brief about Your Experience',
    type: 'string',
  }],

  companyName: [{
    required: true,
    message: 'Please input your company name!',
    type: 'string',
  }],

  jopTitle: [{
    required: true,
    message: 'Please input your jop title!',
    type: 'string',
  }],
};
