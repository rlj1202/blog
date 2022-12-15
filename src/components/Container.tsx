const Container: React.FC = ({ children }) => {
  return (
    <div className="wrapper">
      {children}

      <style jsx>{`
        .wrapper {
          margin-left: auto;
          margin-right: auto;
          max-width: 50rem;
          padding: 0 1.25rem;
        }
      `}</style>
    </div>
  );
};

export default Container;
