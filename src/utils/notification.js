import { notification } from "antd";

const showNotification = ({ type, message, description }) => {
  notification[type]({
    message,
    description,
    showProgress: true,
    pauseOnHover: true,
  });
};

export default showNotification;
