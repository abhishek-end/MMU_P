import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileperc, setFilePerc] = useState(0);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({});
  const avatar = formData.avatar || currentUser.avatar;
  console.log(avatar);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-bold my-7">Profile</h1>

      <form className="flex flex-col gap-y-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name="avatar"
          id="avatar"
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <img
          onClick={() => fileRef.current.click()}
          src={avatar}
          alt="profile"
          className="rounded-full h-32 w-32 self-center text-center cursor-pointer object-cover"
        />
        <p>
          {error ? (
            <span className="text-red-700">image is greater than 2MB</span>
          ) : fileperc > 0 && fileperc < 100 ? (
            <span>Progress: {fileperc}%</span>
          ) : fileperc === 100 ? (
            <span className="text-green-700">Image uploaded!</span>
          ) : null}
        </p>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="border p-3 rounded-lg outline-none"
        />
        <p></p>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="border p-3 rounded-lg outline-none"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border p-3 rounded-lg outline-none"
        />
        <button className="bg-primary rounded-lg p-3">Upgrade</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer m-1">Delete account</span>
        <span className="text-red-700 cursor-pointer m-1">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
