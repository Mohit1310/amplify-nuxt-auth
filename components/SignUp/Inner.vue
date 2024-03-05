<template>
  <form
    v-if="step === steps.register"
    class="form"
    @submit.prevent="registerLocal"
  >
    <label for="">
      First Name
      <input type="text" v-model="registerForm.first_name" />
    </label>
    <label for="">
      Last Name
      <input type="text" v-model="registerForm.last_name" />
    </label>
    <label for="">
      Email
      <input type="email" v-model="registerForm.email" />
    </label>
    <label for="">
      Password
      <input type="password" v-model="registerForm.password" />
    </label>
    <label for="">
      Confirm Password
      <input type="password" v-model="registerForm.confirmPassword" />
    </label>
    <button type="submit">Register</button>
  </form>

  <form v-else @submit.prevent="confirmLocal">
    <p>Enter verification code sent to your email</p>
    <p>Enter code:</p>
    <input type="text" v-model="confirmForm.code" />
    <button type="submit">Confirm</button>
    <div>
      <button @click="resendCode">Resend code</button>
      <p @click="goToSignUp">Edit your details</p>
    </div>
  </form>
</template>

<script setup>
// import { useMainStore } from "@/store/store";
import { useAuthStore } from "~/store/auth";
import AWS from "aws-sdk";
// import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

AWS.config.update(
  {
    region: process.env.REGION,
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  console.log("inside aws.config.update")
);

const router = useRouter();
// const mainStore = useMainStore();
const authStore = useAuthStore();

const register = authStore.register;
const confirmRegistration = authStore.confirmRegistration;
const login = authStore.login;
const resendConfirmationCode = authStore.resendConfirmationCode;
const passwordMatched = ref(false);
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const registerForm = ref({
  email: null,
  first_name: null,
  last_name: null,
  password: null,
  confirmPassword: "",
});

const confirmForm = ref({
  email: "",
  code: "",
});

const userId = ref(null);

const steps = {
  register: "REGISTER",
  confirm: "CONFIRM",
};

const stepsRef = ref({ ...steps });
const step = ref(stepsRef.value.register);

const checkPasswordMatch = () => {
  if (registerForm.password === registerForm.confirmPassword) {
    passwordMatched = true;
  } else {
    passwordMatched = false;
    // this.isDisabled = true;
  }
};

const registerLocal = async () => {
  // const mainStore = useMainStore();
  try {
    // sendEmail();
    console.log("Register in frontend: " + registerForm.value.email);
    const userData = await register({
      first_name: registerForm.value.first_name,
      last_name: registerForm.value.last_name,
      email: registerForm.value.email,
      rpassword: registerForm.value.password,
    });
    if (!userData) {
      return;
    }
    console.log("userData: " + userData.userSub);
    userId.value = userData.userSub;
    confirmForm.value.email = registerForm.value.email;
    // router.push("/homepage");
    step.value = stepsRef.value.confirm;
    // this.$swal.fire({
    //   toast: true,
    //   position: 'top-end',
    //   icon: 'success',
    //   title: 'Check your email for the verification code',
    //   showConfirmButton: false,
    //   timerProgressBar: true,
    //   timer: 7000,
    // });
  } catch (err) {
    console.log("Error frontend register: " + err);
    // this.$swal.fire({
    //   toast: true,
    //   position: 'top-end',
    //   icon: 'error',
    //   title: 'Something went wrong',
    //   showConfirmButton: false,
    //   timerProgressBar: true,
    //   timer: 7000,
    // });
  }
};

const confirmLocal = async () => {
  try {
    const res = await confirmRegistration({
      email: confirmForm.value.email,
      code: confirmForm.value.code,
    });
    if (!res) {
      // this.$swal.fire({
      //   toast: true,
      //   position: 'top-end',
      //   icon: 'error',
      //   title: 'Something went wrong',
      //   showConfirmButton: false,
      //   timerProgressBar: true,
      //   timer: 7000,
      // });
      return;
    }
    // Till now User is present only in cognito is not in DB. In login function (action file) we are making user object in DB
    const form = { email: registerForm.email, password: registerForm.password };
    await login(form);
    // this.changeBodyStyle();
    router.push("/homepage");
    // await this.createUserLocal();
    // this.$swal.fire({
    //   toast: true,
    //   position: 'top-end',
    //   icon: 'success',
    //   title: 'Successfully registered account',
    //   showConfirmButton: false,
    //   timerProgressBar: true,
    //   timer: 7000,
    // });
  } catch (err) {
    console.log("Error confirmLocal: " + err);
    // this.$swal.fire({
    //   toast: true,
    //   position: 'top-end',
    //   icon: 'error',
    //   title: 'Something went wrong',
    //   showConfirmButton: false,
    //   timerProgressBar: true,
    //   timer: 7000,
    // });
  }
};

const resendCode = async () => {
  await resendConfirmationCode(confirmForm.value.email);
};

const newWindowsOpen = async (params) => {
  const domain = process.env.DOMAIN;
  if (params === "pp") {
    await Browser.open({ url: `https://${domain}/privacy-policy` });
  } else {
    await Browser.open({ url: `https://${domain}/terms-conditions` });
  }
};

// const sesClient = new SESClient({ region: "us-east-1" });

const sendEmail = () => {
  console.log("inside send email");
  const params = {
    Destination: {
      ToAddresses: [ADMIN_EMAIL],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: `<div
    style="
      font-family: Helvetica, Arial, sans-serif;
      min-width: 1000px;
      overflow: auto;
      line-height: 2;
    "
  >
    <div style="margin: 50px auto; width: 70%; padding: 20px 20px">
      <div style="border-bottom: 1px solid #eee">
        <img
          src="https://amplify-mobileappmarketplace-dev-123858-deployment.s3.amazonaws.com/logo_with_name.svg"
        />
      </div>
      <p style="font-size: 1.1em">New User</p>
      <p>First Name: ${registerForm.first_name}</p>
      <p>Last Name: ${registerForm.last_name}</p>
      <p>Email: ${registerForm.email}</p>

      <p style="font-size: 0.9em">Regards,<br />MockCertified Team</p>
      <hr style="border: none; border-top: 1px solid #eee" />
      <div
        style="
          float: right;
          padding: 8px 0;
          color: #aaa;
          font-size: 0.8em;
          line-height: 1;
          font-weight: 300;
        "
      >
        <img
          src="https://amplify-mobileappmarketplace-dev-123858-deployment.s3.amazonaws.com/logo_with_name.svg"
        />
      </div>
    </div>
  </div>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `New user is created: ${registerForm.first_name} ${registerForm.last_name}`,
      },
    },
    Source: SUPPORT_EMAIL,
  };

  // Create the promise and SES service object
  var sendPromise = new AWS.SES().sendEmail(params).promise();

  // Handle promise's fulfilled/rejected states
  sendPromise
    .then(function (data) {
      console.log("sendPromise data: " + data);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });

  // try {
  //   // Send email
  //   const data = await sesClient.send(new SendEmailCommand(params));
  //   console.log("Email sent successfully", data);
  // } catch (err) {
  //   console.error("Error sending email", err);
  // }
};

const goToSignUp = () => {
  step.value = stepsRef.value.register;
};
</script>
