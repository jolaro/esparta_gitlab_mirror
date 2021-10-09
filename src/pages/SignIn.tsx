import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { signInStyles } from "../styles/mui/signInStyles";
import useTranslate from "hooks/useTranslate";
import LanguageSwitcher from "components/molecules/LanguageSwitcher";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import GlobalState from "state/GlobalState";
import { useHookstate } from "@hookstate/core";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert } from "@mui/material";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { snooze } from "utils/snooze";
import { useUser } from "hooks/useUser";

// TODO: Remove when real API is ready
const callMockApi = (validate: boolean) =>
  new Promise<void>((resolve, reject) => {
    if (validate) setTimeout(() => resolve(), 1200);
    else reject();
  });

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const SignInSide: React.FC = () => {
  const isLoading = useHookstate(false);
  const errorSignIn = useHookstate(false);
  const { isLoggedIn } = useUser();
  const t = useTranslate();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const schema = yup
    .object({
      email: yup.string().matches(EMAIL_REGEX, t("signIn.invalidEmail")).required(t("signIn.requiredField")),
      password: yup.string().min(8, t("signIn.passwordTooShort")).required(t("signIn.requiredField")),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  useEffect(() => {
    (async () => {
      if (isLoggedIn.get()) {
        await snooze(500);
        isLoading.set(false);
        await snooze(50);
        history.push("/");
      }
    })();
  }, [isLoggedIn.get()]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // TODO: Remove when real API is ready
    errorSignIn.set(false);
    try {
      isLoading.set(true);
      await callMockApi(data.email !== "reject@gmail.com");
      GlobalState.setSignedIn("dajkdoajdw9au893u28913u8921u3981u38921u");
      enqueueSnackbar(t("notification.signedIn"));
    } catch (e) {
      errorSignIn.set(true);
      isLoading.set(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={7} sx={signInStyles.grid} />
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={3} square>
        <Box sx={signInStyles.languageSwitcher}>
          <LanguageSwitcher />
        </Box>
        <Box sx={signInStyles.inputPaper}>
          <Avatar sx={signInStyles.signInIcon}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("signIn.title")}
          </Typography>
          {errorSignIn.get() && (
            <Box sx={signInStyles.errorMessage}>
              <Alert severity="error">{t("signIn.invalidLogin")}</Alert>
            </Box>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              {...register("email")}
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("signIn.email")}
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message || ""}
            />
            <TextField
              {...register("password")}
              margin="normal"
              required
              fullWidth
              label={t("signIn.password")}
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message || ""}
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label={t("signIn.rememberMe")}
              {...register("rememberMe", { setValueAs: (v) => !!v })}
            />
            <LoadingButton loading={isLoading.get()} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {t("signIn.title")}
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
