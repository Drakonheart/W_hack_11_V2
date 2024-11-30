import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Test = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1 }} // Duration of fade (in seconds)
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: 'blue',
          margin: '0 auto',
          borderRadius: '10px',
        }}
      />
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Toggle Fade
      </button>
    </div>
  );
};

export default Test;
