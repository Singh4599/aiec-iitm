import React from 'react';

const TestComponent = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 9999,
      color: 'white',
      backgroundColor: 'red',
      padding: '20px',
      borderRadius: '8px',
      fontSize: '24px',
      fontWeight: 'bold'
    }}>
      React is working!
    </div>
  );
};

export default TestComponent;
