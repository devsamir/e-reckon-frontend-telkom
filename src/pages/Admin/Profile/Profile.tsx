import React, { useContext, useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Uppy from "@uppy/core";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { Dashboard } from "@uppy/react";
import Webcam from "@uppy/webcam";
import "@uppy/webcam/dist/style.min.css";
import XHR from "@uppy/xhr-upload";
import { Breadcrumb, Button, Col, Descriptions, Row, notification } from "antd";
import FInput from "src/components/form/FInput";
import FInputPassword from "src/components/form/FInputPassword";
import { AuthContext } from "src/contexts/AuthContext";
import ApiCall, { BASE_URL } from "src/services/ApiCall";

import { profileSchema } from "./config";

const Profile = () => {
  const [cookies] = useCookies();
  const { user } = useContext(AuthContext);
  const form = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: { fullname: user.fullname },
  });
  const uppy = useMemo(
    () =>
      new Uppy({
        restrictions: { maxNumberOfFiles: 1, maxFileSize: 1000 * 1000 },
      })
        .use(Webcam, { modes: ["picture"] })
        .use(XHR, {
          endpoint: `${BASE_URL}/upload/user-profile/${user.id}`,
          fieldName: "image",
          headers: { token: cookies?.["token"] },
        }),
    [cookies, user.id]
  );

  const updateMutation = useMutation({
    mutationFn: (data: any) =>
      ApiCall.post(`/user/update-me/${user.id}`, data, {
        headers: { token: cookies?.["token"] },
      }),
  });

  const onSubmit = async (values) => {
    await uppy.upload();
    await updateMutation.mutateAsync(values, {
      onSuccess: () => {
        notification.success({ message: "Berhasil update user" });
        window.location.replace("/admin/dashboard");
      },
      onError: (error: any) => {
        notification.error({
          message: error?.response?.data?.message || error?.message,
        });
      },
    });
  };

  useEffect(() => {
    const urlToObject = async () => {
      const response = await fetch(`${BASE_URL}${user.avatar}`);
      // here image is url/location of image
      const blob = await response.blob();

      uppy.addFile({
        data: blob,
        type: blob.type,
        id: user.avatar,
      });
    };
    if (user.avatar) urlToObject();
  }, [user.avatar, uppy]);

  return (
    <>
      <Breadcrumb className="mb-8">
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <form className="p-4 my-4 bg-white">
        <h4 className="text-sm tracking-wide uppercase font-bold mb-4">
          Profile
        </h4>
        <FormProvider {...form}>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={12}>
              <h4 className="font-normal text-lg mb-2">Upload Profile Image</h4>
              <Dashboard uppy={uppy} plugins={["Webcam"]} />
            </Col>
            <Col span={24} lg={12} className="pt-10">
              <div className="flex flex-col gap-1 mb-4">
                <label className="text-sm font-medium">Nama Lengkap</label>
                <FInput name="fullname" placeholder="Input" />
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <label className="text-sm font-medium">Password Lama</label>
                <FInputPassword name="password_old" placeholder="Input" />
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <label className="text-sm font-medium">Password Baru</label>
                <FInputPassword name="password_new" placeholder="Input" />
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <label className="text-sm font-medium">
                  Konfirmasi Password
                </label>
                <FInputPassword name="password_confirm" placeholder="Input" />
              </div>
              <div
                className="flex justify-end"
                onClick={form.handleSubmit(onSubmit)}
              >
                <Button type="primary">Save</Button>
              </div>
            </Col>
          </Row>
        </FormProvider>
      </form>
    </>
  );
};

export default Profile;
