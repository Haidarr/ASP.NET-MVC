export let api_data = {
  users: [
    {
      id: 1,
      name: 'Roberto Jack',
      active: true,
      email: 'roberto.jack@mail.com',
      about: 'Systems Developer, graduated from the California Institute of Technology in 2016 with a Bachelors Degree in Software Development.',
      registered_on: 'August 29th 2020, 2:24:42 am',
      role: [1]
    },
    {
      id: 2,
      name: 'Mike Smith',
      active: true,
      email: 'mike@gmail.com',
      about: 'Project Manager, graduated from USM university with a Bachelors Degree in Business Management.',
      registered_on: 'July 28th 2020, 1:29:32 pm',
      role: [1, 2]
    },
    {
      id: 3,
      name: 'Kati PM',
      active: true,
      email: 'mike@gmail.com',
      about: 'Marketing Analysts',
      registered_on: 'June 15th 2020, 12:23:09 pm',
      role: [3, 4]
    },
    {
      id: 4,
      name: 'James Sam',
      active: false,
      email: 'james@gmail.com',
      about: 'Bachelors Degree in Journalism from UM University 2013',
      registered_on: 'June 8th 2020, 5:19:02 pm',
      role: [3]
    },
    {
      id: 5,
      name: 'Tremblay Eng',
      active: true,
      email: 'jason@email.com',
      about: 'Bachelors Degree in Journalism from UKM University 2009',
      registered_on: 'May 4th 2020, 3:09:32 pm',
      role: [3]
    }
  ],

  roles: [
    {
      id: 1,
      label: 'Admin',
      color: '#8E24AA',
      privileges: [1,2,3,4,5,6]
    },
    {
      id: 2,
      label: 'Manager',
      color: '#E91E63FF',
      privileges: [5,6]
    },
    {
      id: 3,
      label: 'Writer',
      color: '#AD1457FF',
      privileges: [3]
    },
    {
      id: 4,
      label: 'Team Lead',
      color: '#03A9F4FF',
      privileges: [5]
    },
    {
      id: 5,
      label: 'Reporting',
      color: '#EA77C0',
      privileges: [3,4]
    }
  ],
  privileges: [
    {
      id: 1,
      label: 'Manage Users',
      description: 'Can add modify existing users'
    },
    {
      id: 2,
      label: 'View Users',
      description: 'Can see user details and access levels'
    },
    {
      id: 3,
      label: 'Manage Reports',
      description: 'Add and modify existing reports'
    },
    {
      id: 4,
      label: 'Data Viewer',
      description: 'View and print reports'
    },
    {
      id: 5,
      label: 'Create Tasks',
      description: 'Can create tasks'
    },
    {
      id: 6,
      label: 'Create Projects',
      description: 'Can create projects'
    }
  ]
};
