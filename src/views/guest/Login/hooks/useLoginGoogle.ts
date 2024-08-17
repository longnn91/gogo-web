'use client';

import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { getSession, signIn } from 'next-auth/react';
import { useAppDispatch } from '@/hooks/useHook';
import { globalActions } from '@/store/global/global.slice';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/app.const';
import { authActions } from '@/store/auth/auth.slice';
import authApi from '@/services/auth.service';

export const useLoginGoogle = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => doLoginWithGoogle(codeResponse.code),
    onError: (errorResponse) => console.log(errorResponse),
  });

  const [loading, setLoading] = useState(false);

  const doLoginWithGoogle = async (code: string) => {
    setLoading(true);

    const { data: loginResponse } = await authApi.userLoginWithGoogle({
      google_token: code,
    });

    const { loginWithGoogle } = loginResponse as any;

    if (!loginWithGoogle) {
      dispatch(
        globalActions.pushNotification({
          message: 'Échec de la connexion',
          type: 'error',
        }),
      );
      setLoading(false);
      return;
    } else {
      if (loginWithGoogle?.is_new_user) {
        setLoading(false);
        return router.push(`${PATH.REGISTER}?email=${loginWithGoogle.email}`);
      }

      if (loginWithGoogle?.access_token) {
        const result = await signIn('credentials-google-token', {
          accessToken: loginWithGoogle.access_token,
          refreshToken: loginWithGoogle.refresh_token,
          redirect: false,
        });

        if (!result?.ok) {
          dispatch(
            globalActions.pushNotification({
              message: result?.error!,
              type: 'error',
            }),
          );
          setLoading(false);
          return;
        }
      }
    }

    const session = await getSession();

    if (session?.newUser) {
      dispatch(
        authActions.registrationGoogleInitial({
          email: session?.newUser,
        }),
      );

      setLoading(false);
      return router.push(PATH.REGISTER);
    }

    dispatch(
      globalActions.pushNotification({
        message: "Connexion réussie",
        type: 'success',
      }),
    );
    setLoading(false);
  };

  return {
    handleGoogleLogin,
    loading,
  };
};
