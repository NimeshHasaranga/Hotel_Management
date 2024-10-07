import React from "react";
import { Form, Input, Button, Typography, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const { Title, Text } = Typography;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            dispatch({ type: "SHOW_LOADING" });
            const res = await axios.post("/api/users/login", values);

            if (res.status === 200) {
                message.success("User Login Successfully!");
                localStorage.setItem('auth', JSON.stringify(res.data));
                dispatch({ type: "HIDE_LOADING" });
                navigate("/");
            } else {
                message.error(res.data.message || "Login Failed");
                dispatch({ type: "HIDE_LOADING" });
            }
        } catch (error) {
            if (error.response && error.response.data) {
                message.error(error.response.data.message || "Something Went Wrong!");
            } else {
                message.error("Something Went Wrong!");
            }
            dispatch({ type: "HIDE_LOADING" });
            console.log(error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f0f2f5", // Light background
        }}>
            <div style={{
                background: "#ffffff", // White background for the form
                padding: "30px",
                borderRadius: "10px", // Rounded corners
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
                width: "400px", // Fixed width for the form
            }}>
                <Title level={2} style={{
                    textAlign: "center",
                    color: "#1a1a1a", // Dark text color
                }}>Bar Management</Title>
                <Title level={4} style={{
                    textAlign: "center",
                    color: "#666", // Lighter text color
                }}>Login Page</Title>
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="userId"
                        label="User ID"
                        rules={[{ required: true, message: "Please enter your User ID!" }]}
                    >
                        <Input placeholder="Enter your User ID" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Please enter your password!" }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                            <Text>Not a user? <Link to="/register">Register Here!</Link></Text>
                        </div>
                        <Button type="primary" htmlType="submit" style={{
                            width: "100%", // Full width for button
                            height: "40px", // Fixed height for button
                            backgroundColor: "#800000", // Dark red color
                            borderColor: "#800000", // Matching border color
                            color: "#fff", // White text color
                        }}>
                            Login
                        </Button>
                    </Space>
                </Form>
            </div>
        </div>
    );
};

export default Login;
