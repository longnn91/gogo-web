"use client";
import { useSearchParams } from "next/navigation";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import * as yup from "yup";

import { useAppDispatch } from "@/hooks/useHook";
import { useEffect, useState } from "react";
// import { useLoginGoogle } from "../hooks/useLoginGoogle";
import { InputField } from "@/components/BaseUI/Forms/Input/InputField";
// import { ButtonGoogle } from "@/components/BaseUI/Forms/Button/ButtonGoogle";
import { Button } from "@/components/BaseUI/Forms/Button/Button";
import styled from "@emotion/styled";

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().min(6).max(20).required(),
});

interface LoginFormProps {
  isQuickLogin?: boolean;
}

export const LoginForm = ({ isQuickLogin }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  // const { handleGoogleLogin, loading: googleLoginLoading } = useLoginGoogle();
  const params = useSearchParams();
  const email = params.get("email");

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (email) {
      reset({ email });
    }
  }, [email]);

  const registerFormRef = register as unknown as UseFormRegister<FieldValues>;

  const handleLogin = async (data: FieldValues) => {
    setLoading(false);
  };

  return (
    <LoginFormWrapper onSubmit={handleSubmit(handleLogin)}>
      <InputField
        label="Identification"
        placeholder="Votre adresse e-mail"
        type="email"
        name="email"
        formRef={registerFormRef}
        error={errors.email?.message as string}
        disabled={!!email && !!isQuickLogin}
      />
      <InputField
        label="Mot De Passe"
        placeholder="Votre mot de passe"
        type="password"
        name="password"
        formRef={registerFormRef}
        error={errors.password?.message as string}
      />
      <Box className="flex gap-6 items-center">
        {/* <ButtonGoogle
          loading={googleLoginLoading}
          type="button"
          onClick={() => handleGoogleLogin()}
          disabled={googleLoginLoading || loading}
        >
          Avec Google
        </ButtonGoogle> */}
        <Button type="submit" loading={loading} disabled={loading}>
          Continuer
        </Button>
      </Box>
    </LoginFormWrapper>
  );
};

const LoginFormWrapper = styled("form")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;

  .custom-button {
    min-width: 22.5rem;
  }

  .custom-upload-image {
    margin-bottom: 2rem;
  }
`;
