import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, message } from "antd";
import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { ButtonCommon } from "../../common/ButtonCommon/ButtonCommon";
import { onLogin } from "../../redux/user/user.actions";
import { withRouter, Redirect } from "react-router-dom";
import { ROUTE } from "../../utils/constant";
import "./LoginPage.scss";
import logo from "../../assets/images/logo-boldwolf.png";

const Login = ({ history, onLogin, token }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onLoginCallBack = (isSuccess, _rs) => {
    setIsLoading(false);
    if (!isSuccess) {
      message.error("Đăng nhập thất bại!");
    } else {
      message.success("Đăng nhập thành công!");
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
      if(e.key === 'Enter') {
        onCheck()
      }
  } 

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      setIsLoading(true);
      onLogin({ data: values, fCallBack: onLoginCallBack });
    } catch (err) {}
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  if (token) {
    return <Redirect to={ROUTE.DASH_BOARD} />;
  }

  return (
    <section className="login-wrap">
      <div className="card-container">
        <div className="title-form">BOLD WOLF</div>
        <img className="logo" src={logo} alt="logo" />
        <Form
          form={form}
          onKeyPress={handleKeyPress}
          name="dynamic_rule"
          className="content-form"
        >
          <Form.Item
            className="form-item-custom"
            name="email"
            type="string"
            rules={[
              { transform: (value) => (value ? value.trim() : "") },
              {
                required: true,
                message: "Tài khoản không được bỏ trống!",
              },
            ]}
          >
            <Input
              placeholder="Tài khoản"
              type="string"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            className="form-item-custom"
            name="password"
            type="password"
            rules={[
              { transform: (value) => (value ? value.trim() : "") },
              {
                required: true,
                message: "Mật khẩu không được bỏ trống",
              },
            ]}
          >
            <Input.Password
              placeholder="Mật khẩu"
              type="password"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item className="form-item-btn">
            <ButtonCommon type="primary" onClick={onCheck} loading={isLoading}>
              Đăng nhập
            </ButtonCommon>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

Login.propTypes = {};
const mapStateToProps = (state) => ({ token: state.user.token });

export const LoginPage = compose(
  connect(mapStateToProps, { onLogin }),
  withRouter
)(Login);
