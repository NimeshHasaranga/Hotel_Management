import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { useEffect } from "react";



const Register = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            dispatch({ type: "SHOW_LOADING" });
            await axios.post("/api/users/register", values);
            
              message.success("Register Successfully!");
            dispatch({ type: "HIDE_LOADING" });
            navigate("/login");
          } catch (error) {
            message.error("Something Went Wrong!");
            console.log(error);
            dispatch({ type: "HIDE_LOADING" });
          }   
         }

         useEffect(() => {
          if(localStorage.getItem("auth")){
            localStorage.getItem("auth")
            navigate("/");
          }
        }, [navigate]);


    return (
    <>
    <div className="register">
        <div className="register-form">
        <h1>POS APP</h1>
        <h3>Register Page</h3>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="userId" label="User ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <p>
                Already Register Please
            <Link to ="/login"> Login Here!</Link>
            </p>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </div>
        </Form>
        </div>
    </div>
    </>
    );
};

export default Register;