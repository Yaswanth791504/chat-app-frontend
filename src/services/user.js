/* eslint-disable no-undef */
const LOCALHOSTLINK = "https://chat-app-backend-vg68.onrender.com/api";

const getUserFriends = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const data = await fetch(`${LOCALHOSTLINK}user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const jsonData = await data.json();
    return jsonData.data.friends;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getUserMessages = async (fromId) => {
  try {
    console.log(fromId);
    const data = await fetch(`${LOCALHOSTLINK}messages/${fromId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const jsonData = await data.json();
    return jsonData.data;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const getSearchResults = async (name) => {
  try {
    const data = await fetch(`${LOCALHOSTLINK}user/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name }),
    });
    const jsonData = await data.json();
    return jsonData.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const sendRequestToUser = async (id) => {
  try {
    const data = await fetch(`${LOCALHOSTLINK}requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ to: id }),
    });
    const jsonData = await data.json();
    return jsonData.message;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const removeFriend = async (id) => {
  try {
    const data = await fetch(`${LOCALHOSTLINK}user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const jsonData = await data.json();
    return jsonData.message;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const getProfile = async (id) => {
  try {
    const data = await fetch(`${LOCALHOSTLINK}user/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const jsonData = await data.json();
    return jsonData;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const getRequests = async () => {
  try {
    const data = await fetch(`${LOCALHOSTLINK}requests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const jsonData = await data.json();
    return jsonData.requests;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const acceptRequest = async (id) => {
  try {
    console.log(id);
    const data = await fetch(`${LOCALHOSTLINK}requests/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const jsonData = await data.json();
    console.log(jsonData);
    return jsonData.message;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const getProfileInfo = async () => {
  try {
    const data = await fetch(`${LOCALHOSTLINK}user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const jsonData = await data.json();
    return jsonData.data;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const updateUserProfileInfo = async (data) => {
  try {
    const res = await fetch(`${LOCALHOSTLINK}user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    const jsonData = await res.json();
    console.log(jsonData);
    return jsonData;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const sendMessageToUser = async (data, id) => {
  try {
    console.log(data, id);
    const res = await fetch(`${LOCALHOSTLINK}messages/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ message: data }),
    });
    const jsonData = await res.json();
    return jsonData;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const updateUserProfileImage = async (body) => {
  try {
    const fileData = new FormData();
    fileData.append("profileImage", body);
    const res = await fetch(`${LOCALHOSTLINK}user/updateProfileImage`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: fileData,
    });
    const jsonData = await res.json();
    console.log(jsonData);
    return jsonData;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const updateBackgroundImage = async (body) => {
  try {
    const formData = new FormData();
    formData.append("backgroundImage", body);
    const fetchedData = await fetch(
      "${LOCALHOSTLINK}user/updateBackgroundImage",
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    const jsonData = await fetchedData.json();
    console.log(jsonData);
    return jsonData;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

export {
  acceptRequest,
  getProfile,
  getProfileInfo,
  getRequests,
  getSearchResults,
  getUserFriends,
  getUserMessages,
  removeFriend,
  sendMessageToUser,
  sendRequestToUser,
  updateBackgroundImage,
  updateUserProfileImage,
  updateUserProfileInfo,
};
