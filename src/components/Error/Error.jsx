import "./Error.css";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="error-container">
      <div className="errpr-icon">⚠️</div>
      <p className="error-message">{message}</p>
      <p className="error-description">Please try again later .</p>
      {onRetry && (
        <button className="rettry-button" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;
