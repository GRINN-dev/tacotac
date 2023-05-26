"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { GetCurrentUserQuery } from "@/../../@tacotacIO/codegen/dist";

import { GenericForm } from "@/components/form/generic-form";
import { getUpdateUserFormProps } from "./userForm";

interface UpdateUserFormProps {
  user: GetCurrentUserQuery["currentUser"];
}

const UpdateUserForm: FC<UpdateUserFormProps> = ({ user }) => {
  const router = useRouter();

  return (
    <div className="px-10">
      <GenericForm {...getUpdateUserFormProps({ data: user })} />
    </div>
  );
};

export default UpdateUserForm;
