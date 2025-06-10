import "../login/login.scss";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const request = useAxios();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const login = async (values: { email: string; password: string }) => {
    try {
      const response = await request({
        url: `api/user/sign-in`,
        method: "POST",
        body: {
          email: values.email,
          password: values.password,
        },
      });

      const token = response?.data?.token;
      if (token) {
        localStorage.setItem("access_token", token);
        console.log("Token:", token);
        setShouldNavigate(true); // flag o‘rnatamiz
      } else {
        console.error("Token topilmadi:", response);
      }
    } catch (error: any) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (shouldNavigate) {
      navigate("/");
    }
  }, [shouldNavigate]);

  useEffect(() => {
    console.log("BASE_URL:", import.meta.env.VITE_BASE_URL);
  }, []);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="top">
          <h1>Hush kelibsiz</h1>
        </div>
        <Form onFinish={login}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Iltimos, to'g'ri email kiriting",
              },
            ]}
          >
            <Input placeholder="Email" allowClear />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Iltimos, to'g'ri parol kiriting",
              },
            ]}
          >
            <Input.Password placeholder="Parol" allowClear />
          </Form.Item>

          <Link to={"/sign-up"} className="link">
            Ro‘yxatdan o‘tish
          </Link>

          <Button className="btn" htmlType="submit">
            Yuborish
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;