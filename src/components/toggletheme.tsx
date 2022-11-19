import React, { useEffect, useState } from 'react';

const ToggleTheme: React.FC = () => {
  const [activeTheme, setTheme] = useState<string>('light');

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);

  const toggleTheme = () => {
    setTheme(activeTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <button className="button" onClick={toggleTheme}>
      {activeTheme === 'light' ? (
        <i className="fas fa-moon fa-lg"></i>
      ) : (
        <i className="fas fa-sun fa-lg"></i>
      )}

      <style jsx>{`
        .button {
          border: none;
          background: none;
          padding: 0;
        }
      `}</style>
    </button>
  );
};

export default ToggleTheme;
