const url = "https://chat-app-backend-vg68.onrender.com/api";

export async function createUser(body) {
  try {
    const fileData = new FormData();

    fileData.append("profileImage", body.profileImage[0]);

    Object.keys(body).forEach((key) => {
      if (key !== "profileImage") {
        fileData.append(key, body[key]);
      }
    });

    const newUser = await fetch(`${url}/auth/signup`, {
      method: "POST",
      body: fileData,
    });

    const jsonData = await newUser.json();
    return jsonData.message;
  } catch (err) {
    console.error(err.message);
    return err;
  }
}

export async function loginuser(body) {
  try {
    const newUser = await fetch(`${url}/auth/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
    const jsonData = await newUser.json();
    if (
      jsonData.jwt !== undefined &&
      jsonData.jwt !== null &&
      jsonData.jwt !== ""
    ) {
      localStorage.setItem("token", jsonData.jwt);
      localStorage.setItem("userId", jsonData.id);
    }
    return jsonData;
  } catch (err) {
    console.log(err.message);
    return err;
  }
}
