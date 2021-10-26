import React from "react";
import {
	Button,
	Menu,
	Form,
	Input,
	Message,
	Row,
	notification,
	Spin,
	Col,
	Dropdown,
	Avatar,
	Card,
} from "antd";

import { useState } from "react";
import Head from "next/head";

// const Content = styled.div`
//   max-width: 400px;
//   z-index: 2;
//   min-width: 300px;
// `;
const FormItem = Form.Item;

const Profile = ({ form }) => {
	const [passVisible, setPassVisible] = useState(false);
	const [passVisible2, setPassVisible2] = useState(false);
	const [passVisible3, setPassVisible3] = useState(false);

	const [confirmPassVisible, setConfirmPassVisible] = useState(false);

	const [formChangePass] = Form.useForm();

	function showSukses(msg) {
		notification["success"]({
			message: "Sukses!",
			description: msg,
		});
	}

	const handleChangePass = async (values) => {
		try {
			console.log(values);
			showSukses(JSON.stringify(values));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Head>
				<title>Profile</title>
			</Head>

			<Row>
				<Col lg="4">
					<Avatar
						className="mx-4 my-auto pointer"
						src="/images/cecep.jpg"
						style={{ height: "90px", width: "90px" }}
					/>
				</Col>
				<Col lg="8" style={{ display: "flex", alignItems: "center" }}>
					<div>
						<div style={{ fontSize: "12px" }}>Admin</div>
						<div
							className="my-1"
							style={{ fontSize: "16px", fontWeight: "bold", color: "#33539E" }}
						>
							John Doe
						</div>
						<div style={{ fontSize: "12px" }}>
							admin@gmail.com
						</div>
					</div>
				</Col>
			</Row>
			<Row className="mt-5">
				<Card style={{ width: "100%", borderRadius: "15px", cursor: "default" }} hoverable={true}>
					<div
						style={{ fontSize: "16px", fontWeight: "bold", color: "#33539E" }}
					>
						EDIT PASSWORD
					</div>

					{/* Form Input */}
					<div style={{ height: "20px" }}></div>
					<Form layout="vertical" form={formChangePass} onFinish={handleChangePass}>
						<Row gutter={[10, 10]}>
							<Col xs={24} sm={24} md={24} lg={24}>
								<p style={{ margin: 0, fontWeight: "bold" }}>Current Password</p>
							</Col>

							<Col xs={24} sm={24} md={12} lg={10}>
								<FormItem
									style={{ marginBottom: "12px" }}
									name="password"
									rules={[
										{ required: true, message: "Please input your current password!" },
									]}
								>
									<Input
										type={passVisible ? "text" : "password"}
										placeholder="Current Password"
										suffix={
											<img
												onClick={() => {
													setPassVisible(!passVisible);
												}}
												className="pointer"
												src="/images/icon/login/eye.svg"
												alt="eye"
											/>
										}
									/>
								</FormItem>
							</Col>
						</Row>

						<Row gutter={[10, 10]}>
							<Col xs={24} sm={24} md={24} lg={24}>
								<p style={{ margin: 0, fontWeight: "bold" }}>New Password</p>
							</Col>
							<Col xs={24} sm={24} md={12} lg={10}>
								<FormItem
									style={{ marginBottom: "12px" }}
									name="newpassword"
									rules={[
										{
											pattern:
												/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/gm,
											message:
												"password harus terdapat 1 huruf besar, 1 huruf kecil, 1 special character dan minimal 8 karakter!",
										},
										{ required: true, message: "Please input your new password!" },
									]}
								>
									<Input
										type={passVisible2 ? "text" : "password"}
										placeholder="Current Password"
										suffix={
											<img
												onClick={() => {
													setPassVisible2(!passVisible2);
												}}
												className="pointer"
												src="/images/icon/login/eye.svg"
												alt="eye"
											/>
										}
									/>
								</FormItem>
							</Col>
						</Row>

						<Row gutter={[10, 10]}>
							<Col xs={24} sm={24} md={24} lg={24}>
								<p style={{ margin: 0, fontWeight: "bold" }}>Confirm New Password</p>
							</Col>
							<Col xs={24} sm={24} md={12} lg={10}>
								<FormItem
									name="newpasswordConfirmation"
									dependencies={["newpassword"]}
									rules={[
										{ required: true, message: "Please input your new password again!" },
										({ getFieldValue }) => ({
											validator(rule, value) {
												if (!value || getFieldValue("newpassword") === value) {
													return Promise.resolve();
												}
												return Promise.reject("password tidak sama!");
											},
										}),
									]}
								>
									<Input
										type={passVisible3 ? "text" : "password"}
										placeholder="Password Min. 6"
										suffix={
											<img
												onClick={() => {
													setPassVisible3(!passVisible3);
												}}
												className="pointer"
												src="/images/icon/login/eye.svg"
												alt="eye"
											/>
										}
									/>
								</FormItem>
							</Col>
						</Row>

						<div style={{ height: "20px" }}></div>
						<FormItem>
							<Row>
								<Col xs={24} sm={24} md={6} lg={5}>
									<Button
										style={{
											background: "#33539E",
											borderColor: "#33539E",
											borderRadius: "20px",
										}}
										type="primary"
										htmlType="submit"
										block
										className="colorWhite"
									>
										Update Password
									</Button>
								</Col>
							</Row>
						</FormItem>

					</Form>
				</Card>
			</Row>
		</>
	);
};
export default Profile;
