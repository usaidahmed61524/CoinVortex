"use client";
import Image from "next/image";
import React from "react";
import Logo from "../../../public/images/logo.png";
import tradeImg from "../../../public/images/four-trade.svg";
import sideTrade from "../../../public/images/side-trade.svg";
import pic1 from "../../../public/images/four-1.svg";
import pic2 from "../../../public/images/four-2.svg";
import pic3 from "../../../public/images/four-3.svg";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";
import { useAuth } from "../auth/login";
import axios from "axios";
const Page = () => {
  const [show, setShow] = useState(false);
  const [domain, setDomain] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginBtnVisible, setLoginBtnVisible] = useState(true);


  const auth = useAuth();

  const signIn = async (username, tokenid) => {
    const regex = /\.mmit$/;
    if (!regex.test(domain) || !domain || !tokenId) {
      setInputError("Please fill all the fields");
      return;
    }
    setLoading(true);
    let response;
    try {
      response = await axios.get(`/api/sdk`, {
        params: {
          username: username,
          id: tokenid
        }
      });
    } catch (error) {
      console.error(error);
    }
    const uservalidator = response?.data?.data
    if (uservalidator.success == true) {
      setLoginBtnVisible(false);
      handleClose()
      setLoading(false);
    }
    else {
      swal("Error", `${uservalidator.message}`, "error");
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    auth.login({ domain, tokenId });
    signIn(domain, tokenId)
  };




  const logOutUser = () => {
    setLoginBtnVisible(true);
  };

  const handleClose = () => {
    setShow(false);
    setDomain("");
    setTokenId("");
  };

  const handleShow = () => setShow(true);
  return (
    <div className="bg-black w-full h-full relative">
      <div className="flex justify-between p-6">
        <div className="flex items-center">
          <div className="mx-auto sm:mx-0 w-[150px] sm:w-[200px]">
            <Image src={Logo} alt="logo"/>
          </div>
        </div>
        <div className="flex items-center gap-6 text-[#a6a6a6]">
          <div className="text-base font-medium max-sm:hidden cursor-pointer hover:text-white">
            Blog
          </div>
          <div className="text-base font-medium max-sm:hidden cursor-pointer hover:text-white">
            Careers
          </div>
          <div className="text-base font-medium max-sm:hidden cursor-pointer hover:text-white">
            Sign in
          </div>
          <button
            className="bg-[white] text-[black] py-[0.5rem]
           px-[1.25rem] rounded-[0.5rem] font-medium hover:bg-gray-900 hover:text-white"
          >
            Get Access
          </button>
        </div>
      </div>
      <div className="py-20 text-center text-white w-[613px] m-auto max-sm:w-[100%]">
        <p className="text-[40px] font-bold leading-[45px] mb-4">
          Create your ideal website without the stress of programming. 🔥
        </p>
        <p className="text-[16px] text-[#ADADAD]">
          You don&apos;t need any programming knowledge. Create your ideal website easily, with a smooth and effective procedure that conserves both time and energy.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          {loginBtnVisible ? (
            <button
              className="py-3 px-5 rounded-2xl text-lg font-semibold border border-white
              hover:bg-[#fff] hover:text-black"
              onClick={handleShow}
            >
              Login With MMIT Domain
            </button>
          ) : (
            <>
              <button
                className="uppercase py-2 px-5 text-black bg-white rounded-3xl 
                hover:bg-[#9EF948] hover:text-white"
                onClick={logOutUser}
              >
                Logout
              </button>
            </>
          )}

          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Insert Your MMIT Domain</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="Domain"
                      onChange={(e) => {
                        setDomain(e.target.value);
                        setInputError("");
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="number"
                      placeholder="Token Id"
                      onChange={(e) => {
                        setTokenId(e.target.value);
                        setInputError("");
                      }}
                    />
                  </Form.Group>

                  <p className="text-danger my-2">{inputError}</p>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="dark" onClick={onSubmit}>
                  Login
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
      <div className="m-auto w-max">
        <Image
          src={tradeImg}
          alt="image"
          className="w-[722px] h-[390px] max-[750px]:w-[318px] max-[750px]:h-[175px]"
        />
      </div>
      {/*  */}
      <div className="flex items-center max-[964px]:flex-wrap p-8 m-12 bg-[#101010] rounded-2xl">
        <div className="w-[50%] max-[964px]:w-[100%] flex items-center">
          <div className="px-2">
            <p className="text-[#6f8eff] text-center text-lg">Seamless</p>
            <p className="text-[40px] font-bold leading-[45px] mb-4 text-white">
              Revamp your website with effortless ease.
            </p>
            <p className="text-[16px] text-[#ADADAD]">
              The Storm Framer Template equips you to establish a potent online footprint, providing all the crucial components to attract your target audience.
            </p>
          </div>
        </div>
        <div className="w-[50%] max-[964px]:w-[100%]">
          <Image src={sideTrade} alt="image" className="max-[964px]:w-[100%]" />
        </div>
      </div>
      <div>
        <p className="text-[#6f8eff] text-center text-lg">Features</p>
        <p className="text-[40px] font-bold leading-[45px] mb-4 text-white text-center">
          Give life to your business.
        </p>
        <p className="text-[16px] text-[#ADADAD] text-center">
          Build your dream website hassle-free, enjoying a seamless process.
        </p>
        <div className="flex my-4 max-[914px]:flex-wrap">
          <div className="w-[33.33%] max-[914px]:w-[50%] max-[480px]:w-[100%] p-2">
            <div className="bg-[#101010] rounded-3xl p-6">
              <Image src={pic2} alt="image" className="w-[335px] h-[140px] m-auto" />
              <p className="text-white mt-2 text-center text-lg font-semibold">
                Always available.
              </p>
              <p className="text-[#ADADAD] text-center text-sm">
                Create, craft and share stories together with real time
                collabration.
              </p>
            </div>
          </div>
          <div className="w-[33.33%] max-[914px]:w-[50%] max-[480px]:w-[100%] p-2">
            <div className="bg-[#101010] rounded-3xl p-6">
              <Image src={pic1} alt="image" className="w-[335px] h-[140px] m-auto" />
              <p className="text-white mt-2 text-center text-lg font-semibold">
                Actionable insights.
              </p>
              <p className="text-[#ADADAD] text-center text-sm">
                Measure and optimize performance. Uncover valuable data.
              </p>
            </div>
          </div>
          <div className="w-[33.33%] max-[914px]:w-[50%] max-[480px]:w-[100%] p-2">
            <div className="bg-[#101010] rounded-3xl p-6">
              <Image src={pic3} alt="image" className="w-[335px] h-[140px] m-auto" />
              <p className="text-white mt-2 text-center text-lg font-semibold">
                Efficient workflows.
              </p>
              <p className="text-[#ADADAD] text-center text-sm">
                Boost productivity with keyboard shortcuts. Work smarter and
                faster.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-white py-2 bg-[#101010] text-sm ">
        Copy Right @2023
      </div>
    </div>
  );
};

export default Page;
