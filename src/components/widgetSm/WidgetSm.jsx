import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/users/latest?new=true", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjliZmE3ODNmZTE2ZTA0YjhmNzFiMCIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjU2NjYwODQ4LCJleHAiOjE2NTY5MjAwNDh9.-mIvBrpQw-u8cAO2nbgNA92FInVH9LFnZ1OZE9YUxzM",
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
          <li key={user._id} className="widgetSmListItem">
            <img
              src={
                user.profilePicture ||
                "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              }
              alt=""
              className="widgetSmImg"
            />
            <div classNamusere="widgetSmUser">
              <span className="widgetSmUsername">{user.userName}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
