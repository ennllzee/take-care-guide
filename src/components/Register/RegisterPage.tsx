import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useGoogleLogout } from "react-google-login";
import { history } from "../../helper/history";
import GuideForm from "../../models/GuideForm";
import Alert from "../Alert/Alert";
import Submit from "../Submit/Submit";
import TopBar from "../TopBar/TopBar";
import ContactForm from "./ContactForm";
import ProfileForm from "./ProfileForm";
import RegisterSubmit from "./RegisterSubmit";
import { useMutation } from "@apollo/client";
import EducationForm from "./EducationForm";
import WorkForm from "./WorkForm";
import useGuideApi from "../../hooks/guidehooks";
import IdentifyForm from "./IdentifyForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      paddingRight: "5%",
      paddingLeft: "5%",
      // minWidth: "100vw",
      width: "90vw",
    },
    form: {
      paddingTop: "5%",
    },
    margin: {
      margin: theme.spacing(1),
    },
    box: {
      padding: "5%",
      marginBottom: "5%",
    },
    img: {
      height: "20vh",
      weight: "80%",
      border: "2px solid #000",
    },
    card: {
      padding: "2%",
    },
  })
);

function RegisterPage() {
  const classes = useStyles();

  const accessToken = localStorage.getItem("accessToken");
  const gmail = localStorage.getItem("gmail");
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("_id");

  const [alert, setAlert] = useState<boolean>(false);

  const logout = () => {
    localStorage.clear()
    history.push("/")
  };

  const { signOut } = useGoogleLogout({
    clientId:
      "907374215732-jc7l3sk84f05vlsf9e23ceo674ek0sbe.apps.googleusercontent.com",
    onLogoutSuccess: logout,
  });

  useEffect(() => {
    if (accessToken !== null && id !== null) {
      history.push(`/appointment&=${accessToken}`);
    }
    if (gmail === null) {
      history.push("/");
    }
  }, [accessToken, gmail, id]);

  const [submit, setSubmit] = useState<boolean>(false);

  const {
    SIGNUP_GUIDE,
    UPLOAD_PROFILE,
    UPLOAD_CERTIFICATE,
    UPLOAD_FACEWITHIDCARD,
  } = useGuideApi();

  const [displayImg, setDisplayImg] = useState<any | undefined>();
  const [displayIdImg, setDisplayIdImg] = useState<any | undefined>();
  const [displayCerImg, setDisplayCerImg] = useState<any | undefined>();

  const [createGuide] = useMutation(SIGNUP_GUIDE, {
    onCompleted: (data) => {
      console.log(data);
      if (user.Avatar) {
        addProfile({
          variables: {
            addGuideProfileFile: user.Avatar,
            addGuideProfileGuideId: data.createdGuide._id,
          },
        });
      }
      if (user.Education?.Certificate) {
        addCertificate({
          variables: {
            uploadCertificateGuideFile: user.Education?.Certificate,
            uploadCertificateGuideGuideId: data.createdGuide._id,
          },
        });
      }

      if (user.FaceWithIdCard) {
        addFaceWithIdCard({
          variables: {
            uploadFaceWithIdcardGuideFile: user.FaceWithIdCard,
            uploadFaceWithIdcardGuideGuideId: data.createdGuide._id,
          },
        });
      }
    },
  });

  const [addProfile] = useMutation(UPLOAD_PROFILE, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const [addCertificate] = useMutation(UPLOAD_CERTIFICATE, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const [addFaceWithIdCard] = useMutation(UPLOAD_FACEWITHIDCARD, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  //NEEDED BACKEND
  const onSubmit = async () => {
    console.log(user);
    createGuide({
      variables: {
        createdGuideInput: {
          ...user,
          Avatar: null,
          Education: { ...user.Education, Certificate: null },
          FaceWithIdCard: null
        },
      },
    });
    setAlert(true);
  };

  const [step, setStep] = useState<number>(1);
  const [user, setUser] = useState<GuideForm>({
    WorkExp: [],
    Token: token,
  });

  return (
    <Grid>
      <TopBar page="ลงทะเบียน" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="flex-start"
      >
        <Grid item className={classes.main}>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justify="center"
          >
            <Grid item xs={12} md={12} lg={12}>
              {step === 1 && (
                <ProfileForm
                  user={user}
                  setUser={setUser}
                  setStep={setStep}
                  setDisplayImg={setDisplayImg}
                  displayImg={displayImg} 
                />
              )}
              {step === 2 && (
                <IdentifyForm
                  user={user}
                  setUser={setUser}
                  setStep={setStep}
                  setDisplayImg={setDisplayIdImg}
                  displayImg={displayIdImg} 
                />
              )}
              {step === 3 && (
                <EducationForm
                  user={user}
                  setUser={setUser}
                  setStep={setStep}
                  setDisplayImg={setDisplayCerImg}
                  displayImg={displayCerImg} 
                />
              )}
              {step === 4 && (
                <WorkForm user={user} setUser={setUser} setStep={setStep} />
              )}
              {step === 5 && (
                <ContactForm user={user} setUser={setUser} setStep={setStep} />
              )}
              {step === 6 && (
                <RegisterSubmit
                  user={user}
                  setStep={setStep}
                  setSubmit={setSubmit}
                  displayImg={displayCerImg} 
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Alert
          closeAlert={() => {
            setAlert(false);
            signOut();
          }}
          alert={alert}
          title="สำเร็จ"
          text="ลงทะเบียนสำเร็จ กรุณาลงชื่อเข้าระบเพื่อเริ่มใช้งาน"
          buttonText="ตกลง"
        />
        <Submit
          submit={submit}
          title="ยืนยันการลงทะเบียน?"
          text="กรุณาตรวจสอบความถูกต้องของข้อมูลก่อนกดยืนยัน"
          denyText="ยกเลิก"
          submitText="ยืนยัน"
          denyAction={() => setSubmit(false)}
          submitAction={onSubmit}
        />
        {/* {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error :( Please try again</p>} */}
        {/* <Grid item className={classes.end}></Grid> */}
      </Grid>
    </Grid>
  );
}
export default RegisterPage;
