import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../sign-up/sign_up.scss";
import { useState } from "react";
import { BiLoader } from "react-icons/bi";
const SignUp = () => {
  const navigate = useNavigate();
  const [loading] = useState(false);
  const access_token2 = "64eecf3b54abde61153d1fd3"
  const register = async (values: {
    name: string;
    surname: string;
    password: string;
    email: string;
  }) => {
    try {
      const response = await axios({
        url: `https://beckend-n14.vercel.app/api/user/sign-up?access_token=${access_token2}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token2}`,
        },
        method: "POST",
        data: {
          name:values.name,
          surname:values.surname,
          email: values.email,
          password: values.password,
        },
      });

      const token = response.data?.data?.token;
      localStorage.setItem("token", token);
      console.log(token, "token");
      console.log(response.data);
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="sign-up">
      <h1>Hush kelibsiz </h1>
      <Form onFinish={register}>
        <Form.Item
          name={"name"}
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input placeholder="Ismingizni kiriting..." />
        </Form.Item>
        <Form.Item
          name={"surname"}
          rules={[{ required: true, message: "Please input your surname" }]}
        >
          <Input placeholder="Familyangizni kiriting..." />
        </Form.Item>
        <Form.Item
          name={"email"}
          rules={[{ required: true, message: "Please input your Email" }]}
        >
          <Input placeholder="Emailingizni kiriting..." />
        </Form.Item>
        <Form.Item
          name={"password"}
          rules={[{ required: true, message: "Please input your Password" }]}
        >
          <Input.Password placeholder="*****" />
        </Form.Item>

        <Button className="btn" htmlType="submit">
          {loading ? <BiLoader className="loader" /> : "Royxatdan o'tish"}
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
