"use client";

import { FC } from "react";
import { CreateOrganizationMutation } from "@/../../@tacotacIO/codegen/dist";

import { GenericForm } from "@/components/form/generic-form";
import { getCreateOrganizationFormProps } from "./create-organization-form-props";

interface CreateOrganizationFormProps {
  onSuccess: (data: CreateOrganizationMutation) => void;
}

export const CreateOrganizationForm: FC<CreateOrganizationFormProps> = ({ onSuccess }) => {
  return <GenericForm onSuccess={onSuccess} {...getCreateOrganizationFormProps({})} />;
};
