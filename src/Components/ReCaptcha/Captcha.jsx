import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const Captcha = () => {
  const captchaRef = useRef(null);

  const handleRecaptchaChange = async () => {
    let token = captchaRef.current.getValue();

    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${"6LcjymMlAAAAAKExpXMSoRzqjVzvpSKQMJfsIlh9"}&response=${token}`
      // null,
      // {
      //   params: {
      //     secret: "6LcjymMlAAAAAKExpXMSoRzqjVzvpSKQMJfsIlh9",
      //     response: token,
      //   },
      // }
    );

    if (response.data.success) {
      console.log("reCAPTCHA verification passed!");
    } else {
      console.log("reCAPTCHA verification failed!");
    }
    // };

    // try {
    //   const response = await axios.post(
    //     "https://www.google.com/recaptcha/api/siteverify?secret=${'process.env.CAPTCHA_APP_SECRET_KEY'}&response=${token}",
    // null,
    // {
    //   params: {
    //     secret: "6LcjymMlAAAAAKExpXMSoRzqjVzvpSKQMJfsIlh9",
    //     response: token,
    //   },
    // }
    //       );

    //       if (response.data.success) {
    //         console.log("reCAPTCHA verification passed!");
    //       } else {
    //         console.log("reCAPTCHA verification failed!");
    //       }

    //     } catch (error) {
    //       console.error(error);
    //     }
  };

  return (
    <>
      {
        <form action="?" method="POST">
          <ReCAPTCHA
            sitekey="6LcjymMlAAAAAESisOMUZa_CvA3lP_mD0YcGi81q"
            onChange={handleRecaptchaChange}
          />
        </form>
      }
    </>
  );
};

export default Captcha;
