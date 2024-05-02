import React from 'react';
import ChatBot from 'react-simple-chatbot';

const ChatBotComponents = () => {
  const steps = [
    {
      id: '1',
      message: 'Welcome to EcoWaste Management! What is your name?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, how can I assist you with waste management today?',
      trigger: '4',
    },
    {
      id: '4',
      options: [
        { value: 'collection', label: 'Waste collection schedule', trigger: '5' },
        { value: 'recycle', label: 'How to recycle items', trigger: '6' },
        { value: 'dispose', label: 'How to dispose of hazardous waste', trigger: '7' },
        // ... other options as needed
      ],
    },
    {
      id: '5',
      message: 'Waste collections are on Tuesdays and Fridays. Would you like to set a reminder?',
      trigger: 'reminder',
    },
    {
      id: '6',
      message: 'You can recycle paper, glass, and plastic. There are separate bins for each. Do you need more detailed instructions?',
      trigger: 'details',
    },
    {
      id: '7',
      message: 'Hazardous waste should be taken to the special handling facility. Would you like directions?',
      trigger: 'directions',
    },
    {
      id: 'reminder',
      options: [
        { value: 'yes', label: 'Yes, please!', trigger: 'end' },
        { value: 'no', label: 'No, thank you.', trigger: 'end' },
      ],
    },
    {
      id: 'details',
      options: [
        { value: 'yes', label: 'Yes, please!', trigger: 'end' },
        { value: 'no', label: 'No, thank you.', trigger: 'end' },
      ],
    },
    {
      id: 'directions',
      options: [
        { value: 'yes', label: 'Yes, please!', trigger: 'end' },
        { value: 'no', label: 'No, thank you.', trigger: 'end' },
      ],
    },
    {
      id: 'end',
      message: 'Thank you for chatting with EcoWaste Management. Have a great day!',
      end: true,
    },
  ];

  return <ChatBot steps={steps} />;
};

export default ChatBotComponents;
