import axios from "axios";

const authByToken =
  ({ authInfo, access_token }) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      dispatch(
        authInfo({
          signedIn: true,
          token: access_token,
          authUserId: data.id,
          userName: data.name,
          showError: false,
          errorMessage: null,
        })
      );
    } catch (error) {
      dispatch(
        authInfo({
          signedIn: false,
          authUserId: null,
          userName: null,
          showError: true,
          token: null,
          errorMessage: error.message,
        })
      );
    }
  };

export default authByToken;
