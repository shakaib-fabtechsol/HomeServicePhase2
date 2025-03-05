import PropTypes from "prop-types";
import { AiOutlineWarning } from "react-icons/ai";

function RemoteError({ message, hasError }) {
  if (!hasError) return null;

  return (
    <div
      className="flex items-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
      role="alert"
    >
      <AiOutlineWarning className="mr-2 text-xl" />
      <span className="font-medium">{message || "Something went wrong"}</span>
    </div>
  );
}
RemoteError.propTypes = {
  message: PropTypes.string,
  hasError: PropTypes.bool,
};

export default RemoteError;
