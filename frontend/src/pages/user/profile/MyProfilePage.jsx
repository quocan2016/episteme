/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useMode } from "../../../context/mode-context";
import { tokens } from "../../../constants/theme";
import { useAuth } from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { CardPost } from "../../../components/CardPost";
import {
  getAllCardByType,
  getStatisticByType,
} from "../../../services/authorService";
import CardDraft from "../../../components/CardDraft/CardDraft";
import CardAuthor from "../../../components/CardAuthor";
import {
  PostCategoryStat,
  ProfileStatistic,
} from "../../../components/ProfileStatistic";
import Swal from "sweetalert2";
import { deletePost, updatePost } from "../../../services/postService";
import { toast } from "react-toastify";
import { STATUS_POST } from "../../../constants/status";

const MyProfilePage = ({ title }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cardType, setCardType] = useState("posts");
  const [statistic, setStatistic] = useState({});
  const [categoriesPosted, setCategoriesPosted] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = title;
    if (user?.id) {
      getStatisticByType(user?.id, "posts-views")
        .then((response) =>
          setStatistic((prev) => {
            return { ...prev, totalView: response.data };
          })
        )
        .catch((e) =>
          console.log("ProfilePage - GetStatisticByType-postviews", e)
        );
      getStatisticByType(user?.id, "post-number")
        .then((response) =>
          setStatistic((prev) => {
            return { ...prev, totalPost: response.data };
          })
        )
        .catch((e) => console.log("ProfilePage - GetStatisticByType-posts", e));
      getStatisticByType(user?.id, "bookmarks-number")
        .then((response) =>
          setStatistic((prev) => {
            return {
              ...prev,
              totalBookmark: response.data,
            };
          })
        )
        .catch((e) =>
          console.log("ProfilePage - GetStatisticByType-bookmarks", e)
        );
      getStatisticByType(user?.id, "follows/count")
        .then((response) =>
          setStatistic((prev) => {
            return { ...prev, totalFollower: response.data };
          })
        )
        .catch((e) =>
          console.log("ProfilePage - GetStatisticByType-followers", e)
        );
      getStatisticByType(user?.id, "pominent-categories")
        .then((response) => setCategoriesPosted(response.data))
        .catch((e) =>
          console.log("ProfilePage - GetStatisticByType-categories", e)
        );
    }
  }, [user]);

  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };
  return (
    <Box>
      <Container>
        <Grid
          container
          spacing={1}
          sx={{
            marginBlock: "50px 0",
            flexFlow: {
              xs: "column",
              md: "row",
            },
            alignItems: {
              xs: "center",
              md: "flex-start",
            },
          }}>
          <Grid item md={1} sm={2}>
            <Avatar
              alt={user?.fullname || user?.id || user?.email}
              src={user?.image}
              sx={{
                "& .MuiAvatar-root .MuiAvatar-circular": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                marginX: "auto",
                maxWidth: "80px",
                width: "100%",
                height: "80px",
                marginBottom: {
                  sm: 2,
                  md: 0,
                },
              }}
            />
          </Grid>
          <Grid
            item
            md={11}
            sm={10}
            sx={{
              marginY: "auto",
              display: "flex",
              rowGap: 2,
              alignItems: {
                xs: "center",
                md: "initial",
              },
              flexFlow: {
                xs: "column",
                md: "row",
              },
              justifyContent: {
                md: "space-between",
              },
            }}>
            <Box
              component="div"
              sx={{
                display: "flex",
                flexFlow: "column",
                order: {
                  xs: 2,
                  md: 1,
                },
                rowGap: {
                  md: "8px",
                },
              }}>
              <Typography variant="h5">{user?.fullname}</Typography>
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ fontSize: "12px" }}>
                @{user?.email.split("--")[0]}
              </Typography>
            </Box>
            <MyButton
              onClick={handleUpdateProfile}
              label="Chỉnh sửa thông tin cá nhân"
            />
          </Grid>
        </Grid>
      </Container>
      <Container
        sx={{
          marginBlock: "50px",
        }}>
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <ListButtons setCardType={setCardType} />
            <ListData type={cardType} user={user} />
          </Grid>
          <Grid item md={3} xs={12}>
            <ProfileStatistic statistic={statistic} />
            <PostCategoryStat categories={categoriesPosted} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const ListData = ({ type, user }) => {
  const [data, setData] = useState([]);
  // useEffect(() => {
  //    async function fetchData(id) {
  //       if (id) {
  //          await getAllPostOfAuthor(id)
  //             .then((response) => {
  //                setData(response.data);
  //             })
  //             .catch((e) => console.log(e));
  //          console.log(
  //             "🚀 ~ file: MyProfilePage.jsx:200 ~ ListData ~ data:",
  //             data
  //          );
  //       }
  //    }
  //    fetchData(userId);
  // }, []);
  useEffect(() => {
    if (user?.id) {
      getAllCardByType(type, user?.id)
        .then((response) => setData(response.data))
        .catch((e) => console.log(e));
    }
  }, [type, user]);

  if (!data || data.length <= 0) return null;

  const handleDeleteDraftPost = (id) => {
    Swal.fire({
      title: `Bạn có chắc muốn xóa bài viết nháp này`,
      text: "Khi xóa không thể hoàn tác lại!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(id)
          .then(() => {
            setData((prevData) =>
              prevData.filter((prevItem) => prevItem.id !== id)
            );
            toast.success("Xóa bài viết nháp thành công");
          })
          .catch(() =>
            toast.error("Đã có lỗi xảy ra! Không xóa được bài viết nháp")
          );
      }
    });
  };

  const handleDeletePost = (e, postDeleted) => {
    const { id, title } = postDeleted;
    Swal.fire({
      title: `Bạn có chắc muốn xóa bài viết có tiêu đề ${title}`,
      text: "Khi xóa không thể hoàn tác lại!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        updatePost(id, {
          ...postDeleted,
          status: STATUS_POST.DELETED,
        })
          .then(() => {
            setData((prevData) =>
              prevData.filter((prevItem) => prevItem.id !== id)
            );
            toast.success("Xóa bài viết thành công");
          })
          .catch(() =>
            toast.error("Đã có lỗi xảy ra! Không xóa được bài viết nháp")
          );
      }
    });
  };

  return (
    <Grid container spacing={2}>
      {!data ||
        (data.length <= 0 && (
          <Grid item xs={12} textAlign="center">
            Không có thông tin
          </Grid>
        ))}
      {data &&
        data.length > 0 &&
        data.map((item) => {
          return (
            <Grid item xs={12} key={item.id}>
              {type === "drafts" && (
                <CardDraft
                  handleDeleteDraftPost={() => handleDeleteDraftPost(item.id)}
                  info={item}
                />
              )}
              {type === "posts" && (
                <CardPost
                  iconDelete
                  handleDeletePost={(e) => handleDeletePost(e, item)}
                  postInfo={item}
                  direction="horizontal"
                />
              )}
              {type === "bookmarks" && (
                <CardPost postInfo={item?.post} direction="horizontal" />
              )}
              {type.includes("follow") && <CardAuthor data={item} />}
            </Grid>
          );
        })}
    </Grid>
  );
};

const ListButtons = ({ setCardType }) => {
  const [active, setActive] = useState("");
  useEffect(() => {
    setCardType("posts");
    setActive("posts");
  }, []);
  const handleGetPosts = () => {
    setActive("posts");
    setCardType("posts");
  };
  const handleGetDrafts = () => {
    setActive("drafts");
    setCardType("drafts");
  };
  const handleGetFollowings = () => {
    setActive("followings");
    setCardType("followings");
  };
  const handleGetFollowers = () => {
    setActive("followers");
    setCardType("followers");
  };
  const handleGetBookmarks = () => {
    setActive("bookmarks");
    setCardType("bookmarks");
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        mb: 3,
        overflowX: "auto",
        flexWrap: "nowrap",
        alignItems: "center",
        paddingBlock: 1,
      }}>
      <ButtonItem
        text="Bài viết"
        onClick={handleGetPosts}
        active={active === "posts"}
      />
      <ButtonItem
        text="Bài viết nháp"
        onClick={handleGetDrafts}
        active={active === "drafts"}
      />
      <ButtonItem
        text="Đã lưu"
        onClick={handleGetBookmarks}
        active={active === "bookmarks"}
      />
      <ButtonItem
        text="Theo dõi"
        onClick={handleGetFollowings}
        active={active === "followings"}
      />
      <ButtonItem
        text="Người theo dõi"
        onClick={handleGetFollowers}
        active={active === "followers"}
      />
    </Box>
  );
};

const ButtonItem = ({ text, onClick = () => {}, active }) => {
  const { theme } = useMode();
  const token = tokens(theme.palette.mode);

  return (
    <Button
      variant="outlined"
      component="span"
      sx={{
        width: "fit-content",
        wordBreak: "normal",
        wordWrap: "normal",
        borderColor: active ? "initial" : "transparent",
        color: token.text,
        flexShrink: 0,
      }}
      onClick={onClick}>
      {text}
    </Button>
  );
};

const MyButton = ({ onClick = () => {}, label }) => {
  const {
    theme: { palette },
  } = useMode();
  const token = tokens(palette.mode);
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={{
        alignSelf: "center",
        color: token.textColor,
        height: "fit-content",
        borderColor: "currentColor",
        order: {
          md: 2,
          xs: 1,
        },
      }}>
      {label}
    </Button>
  );
};

export default MyProfilePage;
