"use client";
import { Layout } from "antd";
import React from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

const { Content } = Layout;
function HomeLayout({ isLogin, children }) {
  return (
    <Layout>
      <Navbar isLogin={isLogin} />
      <Content> {children} </Content>
      <Footer />
    </Layout>
  );
}

export default HomeLayout;
