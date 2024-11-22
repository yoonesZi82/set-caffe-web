"use client";
import React, { useEffect, useState } from "react";
import { Loader } from "@/components/loading/product/Loader";
import { Avatar, Rate } from "antd";
import { PiUserBold } from "react-icons/pi";
import axios from "axios";
import FormClient from "./form/Form";

function CommentsTab({ id, user }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("/api/products/recive-accept", {
        productID: id,
      })
      .then((res) => {
        res.status === 200 && setComments(res.data.comment);
      })
      .catch((err) => {
        err.status === 402
          ? setError("محصول یافت نشد")
          : setError("در پیدا کردن محصول مشکلی به وجود امد");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading && <Loader />}
      {error && <p className="text-navbarDashboard text-xl">{error}</p>}
      {!loading && !error && comments && (
        <div className="gap-16 grid grid-cols-1 desktop:grid-cols-2 laptop:grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-2 pt-10 h-[500px]">
          <div className="flex flex-col gap-2 h-full max-h-[500px] overflow-y-auto">
            <FormClient id={id} user={user} />
          </div>
          {comments.length === 0 && (
            <div className="flex justify-center items-center bg-sidebarTheme rounded-[8px] h-full max-h-[500px] overflow-y-auto">
              <p className="text-navbarDashboard text-xl"> کامنتی یافت نشد </p>
            </div>
          )}
          {comments.length > 0 && (
            <div className="flex flex-col gap-2 bg-sidebarTheme p-3 rounded-[8px] w-full h-full max-h-[500px] overflow-y-auto">
              {comments.map((comment) => (
                <>
                  {comment.isAccept && (
                    <div className="flex flex-col gap-1 bg-navbarDashboard px-3 py-5 rounded-[8px] w-full">
                      <div className="flex justify-between items-center w-full">
                        <div className="flex gap-2">
                          {comment.user.image ? (
                            <Avatar
                              size="large"
                              src={`/uploads/account/${comment.user.image}`}
                            />
                          ) : (
                            <Avatar
                              size="large"
                              icon={<PiUserBold size={18} />}
                            />
                          )}
                          <p className="text-contentDashboard text-lg">
                            {" "}
                            {comment.user.name}{" "}
                          </p>
                        </div>
                        <Rate disabled defaultValue={comment.score} allowHalf />
                      </div>
                      <div className="w-full">
                        <p className="text-sidebarTheme">{comment.body}</p>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CommentsTab;
