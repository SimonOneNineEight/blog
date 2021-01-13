import firebase from "firebase";
import db from "./config.js";

const BASE_URL = "https://student-json-api.lidemy.me";

export const getAllPost = () => {
  return db
    .ref("/posts")
    .once("value")
    .then((snapShot) => snapShot.val());
};

export const getPostById = (id) => {
  console.log("Webapi");
  return db
    .ref(`/posts/${id}`)
    .once("value")
    .then((snapShot) => snapShot.val());
};

export const login = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      console.log(error.message);
    });
};

export const getMe = () => {
  return firebase.auth().currentUser;
};

export const register = (username, password, nickname) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const newPost = (title, content) => {
  return db
    .ref(`/posts`)
    .push({
      title,
      content,
      createdAt: Date.now(),
    })
    .then((res) => "success")
    .catch((error) => {
      console.log(error);
    });
};

export const getLimitedPosts = (page, limit) => {
  return fetch(
    `${BASE_URL}/posts?_page=${page}&_limit=${limit}&_sort=createdAt&_order=desc`
  ).then((res) => res.json());
};
