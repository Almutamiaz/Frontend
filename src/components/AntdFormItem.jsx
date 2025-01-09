"use client";
import { Form, Input } from "antd";
import { useEffect, useRef, useState } from "react";

const AntdFormItem = ({
  name,
  placeholder,
  passwordInput,
  otpInput,
  classNameProp = "",
}) => {
  const otpRef = useRef(null);
  const [correctOtp, setCorrectOtp] = useState(false);
  const onChange = (text) => {
    console.log("onChange:", text);
    // setCorrectOtp(true);
  };
  const onInput = (value) => {
    console.log("onInput:", value);
  };
  const sharedProps = {
    onChange,
    onInput,
  };

  useEffect(() => {
    if (otpRef.current) {
      const children = otpRef.current.nativeElement.children;
      if (children) {
        Array.from(children).forEach((child) => {
          child.placeholder = "*";
          child.addEventListener("focus", () => {
            child.placeholder = "";
          });
          child.addEventListener("blur", () => {
            child.placeholder = "*";
          });

          if (correctOtp) {
            child.classList.add("successColor");
          } else {
            child.classList.remove("successColor");
          }
        });
      }
    }
  }, [correctOtp]);

  return (
    <Form.Item name={name} className={classNameProp}>
      {passwordInput ? (
        <Input.Password
          placeholder={placeholder}
          iconRender={(visible) =>
            visible ? (
              <svg
                width="19"
                height="12"
                viewBox="0 0 19 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.80722 8.07002C2.58357 4.34195 5.82898 1.69303 9.47965 1.69303C13.1292 1.69303 16.3746 4.34195 17.1521 8.07002C17.1829 8.21796 17.2712 8.3476 17.3975 8.43043C17.5239 8.51326 17.678 8.54249 17.826 8.5117C17.9739 8.4809 18.1035 8.3926 18.1864 8.26622C18.2692 8.13984 18.2984 7.98573 18.2676 7.8378C17.3832 3.59748 13.6835 0.554688 9.47965 0.554688C5.27575 0.554688 1.57614 3.59748 0.691647 7.8378C0.660852 7.98573 0.690086 8.13984 0.772916 8.26622C0.855746 8.3926 0.985389 8.4809 1.13332 8.5117C1.28126 8.54249 1.43537 8.51326 1.56175 8.43043C1.68813 8.3476 1.77643 8.21796 1.80722 8.07002ZM9.46826 3.96971C10.5249 3.96971 11.5383 4.38948 12.2855 5.13666C13.0327 5.88384 13.4525 6.89724 13.4525 7.95391C13.4525 9.01059 13.0327 10.024 12.2855 10.7712C11.5383 11.5183 10.5249 11.9381 9.46826 11.9381C8.41159 11.9381 7.39819 11.5183 6.65101 10.7712C5.90383 10.024 5.48407 9.01059 5.48407 7.95391C5.48407 6.89724 5.90383 5.88384 6.65101 5.13666C7.39819 4.38948 8.41159 3.96971 9.46826 3.96971Z"
                  fill="#6A707C"
                />
              </svg>
            ) : (
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.80722 13.07C4.58357 9.34195 7.82898 6.69303 11.4796 6.69303C15.1292 6.69303 18.3746 9.34195 19.1521 13.07C19.1829 13.218 19.2712 13.3476 19.3975 13.4304C19.5239 13.5133 19.678 13.5425 19.826 13.5117C19.9739 13.4809 20.1035 13.3926 20.1864 13.2662C20.2692 13.1398 20.2984 12.9857 20.2676 12.8378C19.3832 8.59748 15.6835 5.55469 11.4796 5.55469C7.27575 5.55469 3.57614 8.59748 2.69165 12.8378C2.66085 12.9857 2.69009 13.1398 2.77292 13.2662C2.85575 13.3926 2.98539 13.4809 3.13332 13.5117C3.28126 13.5425 3.43537 13.5133 3.56175 13.4304C3.68813 13.3476 3.77643 13.218 3.80722 13.07ZM11.4683 8.96971C12.5249 8.96971 13.5383 9.38948 14.2855 10.1367C15.0327 10.8838 15.4525 11.8972 15.4525 12.9539C15.4525 14.0106 15.0327 15.024 14.2855 15.7712C13.5383 16.5183 12.5249 16.9381 11.4683 16.9381C10.4116 16.9381 9.39819 16.5183 8.65101 15.7712C7.90383 15.024 7.48407 14.0106 7.48407 12.9539C7.48407 11.8972 7.90383 10.8838 8.65101 10.1367C9.39819 9.38948 10.4116 8.96971 11.4683 8.96971Z"
                  fill="#6A707C"
                />
                <line
                  x1="20.1362"
                  y1="4.47762"
                  x2="5.44013"
                  y2="18.0432"
                  stroke="#6A707C"
                  stroke-width="1.3"
                />
              </svg>
            )
          }
        />
      ) : otpInput ? (
        <Input.OTP length={4} {...sharedProps} ref={otpRef} />
      ) : (
        <Input placeholder={placeholder} />
      )}
    </Form.Item>
  );
};

export default AntdFormItem;
