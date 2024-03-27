import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  InputBase,
  Modal,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import { tokens } from "../../../constants/theme";
import { createPost } from "../../../services/postService";
import { toast } from "react-toastify";
import { getCategories } from "./../../../services/categoryService";
import Editor from "./../../../components/Editor/index";
import { STATUS_POST } from "../../../constants/status";
import { useAuth } from "../../../context/auth-context";
import ErrorPage from "./../error/ErrorPage";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [description, setDescription] = useState("");
  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Tạo bài viết";
    const fetchAPI = async () => {
      const response = await getCategories();
      setCategories(response?.data || []);
    };
    fetchAPI();
  }, []);

  if (!user) return <ErrorPage />;

  const handleRemoveSelectedCategory = (id) => {
    setSelectedCategories((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectedCategory = (category) => {
    setSelectedCategories((prev) => [...prev, category]);
  };

  const handleNextButton = () => {
    if (titleRef.current.value) {
      setOpenModal(true);
    } else {
      toast.warning("Vui lòng nhập tiêu đề bài viết");
    }
  };

  const handleCreatePost = async () => {
    const dataPost = await editorRef.current.save();
    const image =
      dataPost?.blocks.find((block) => block.type === "image")?.data.file.url ||
      "";
    const post = {
      title: titleRef.current.value,
      categories: selectedCategories,
      content: JSON.stringify(dataPost?.blocks || []),
      summary: description,
      status: STATUS_POST.PENDING,
      thumbnail: image,
    };
    setOpenModal(false);
    createPost(post, user.id)
      .then((response) => {
        navigate(`/profile/me`);
        toast.success("Tạo bài viết thành công");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Tạo bài viết thất bại");
      });
  };

  const handleSaveDraft = async () => {
    const dataPost = await editorRef.current.save();
    const post = {
      title: titleRef.current.value,
      categories: selectedCategories,
      content: JSON.stringify(dataPost?.blocks || []),
      summary: description,
      status: STATUS_POST.DRAFT,
    };
    createPost(post, user.id)
      .then((response) => {
        navigate(`/profile/me`);
        toast.success("Lưu nháp thành công");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Lưu nháp thất bại");
      });
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", mt: "40px" }}>
      {/* <IconButton
        size="large"
        sx={{
          position: "absolute",
          top: "15px",
          left: "15px",
        }}
        aria-label="prev-page">
        <ArrowBackIosIcon />
      </IconButton> */}
      <Container>
        <Box sx={{ maxWidth: "650px", width: "100%", mx: "auto" }}>
          <InputBase
            inputRef={titleRef}
            placeholder="Tiêu đề bài viết"
            name="title"
            autoComplete="off"
            multiline
            spellCheck={false}
            sx={{
              fontSize: "32px",
              fontWeight: 500,
              m: "12px 0 30px",
              wordBreak: "break-word",
              width: "100%",
            }}
          />
          <Editor ref={editorRef} />
        </Box>
      </Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          position: "fixed",
          bottom: "35px",
          left: 0,
          right: 0,
          mx: "0",
          zIndex: "9999",
        }}>
        <Button
          variant="outlined"
          onClick={handleSaveDraft}
          startIcon={<SaveAltIcon />}>
          Lưu nháp
        </Button>
        <Button
          variant="contained"
          sx={{
            color: colors.background,
          }}
          onClick={handleNextButton}
          endIcon={<ArrowForwardIosIcon />}>
          Tiếp theo
        </Button>
      </Box>
      <Modal
        open={openModal}
        sx={{
          zIndex: "10000",
          "& .MuiBackdrop-root.MuiModal-backdrop": {
            backdropFilter: "blur(10px)",
          },
        }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "500px",
            width: "100%",
            p: "30px",
          }}>
          <Box component="label">
            <Typography variant="h5" color="#fff" mb="12px">
              Mô tả
            </Typography>
            <TextField
              placeholder="Nhập mô tả (không bắt buộc)"
              multiline
              rows={4}
              maxRows={4}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              sx={{
                width: "100%",
                backgroundColor: colors.background,
                borderRadius: "4px",
                "& label,textarea": {},
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.blueAccent,
                  borderWidth: "0.5px!important",
                },
                "& .MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: `1px solid ${colors.blueAccent}!important`,
                    top: "-6px",
                  },

                "& textarea:focus .MuiOutlinedInput-notchedOutline": {
                  border: `1px solid ${colors.blueAccent}!important`,
                },
              }}
            />
          </Box>
          <Box sx={{ mt: "30px" }}>
            <Typography variant="h5" color="#fff">
              Danh mục
            </Typography>
            <Box
              sx={{
                border: `0.5px solid ${colors.blueAccent}`,
                mt: "12px",
                borderRadius: "4px",
                backgroundColor: colors.background,
                p: "16px",
              }}>
              <Box
                component="label"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: `0.5px solid ${colors.blueAccent}`,
                  p: "4px 8px",
                  borderRadius: "50px",
                  mb: "12px",
                }}>
                <SearchIcon />
                <InputBase
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  sx={{ flex: 1, p: "0 8px 0 12px" }}
                  placeholder="Tìm kiếm..."
                />
              </Box>
              <Typography mb="12px">Các tag đã chọn:</Typography>
              <Stack
                direction="row"
                gap="12px"
                flexWrap="wrap"
                sx={{
                  maxHeight: "10vh",
                  overflowY: "auto",
                }}>
                {selectedCategories.map((selectedCategory) => (
                  <Chip
                    key={selectedCategory.name}
                    sx={{
                      "& .MuiChip-label": {
                        fontSize: "12px",
                      },
                    }}
                    label={selectedCategory.name}
                    onDelete={() =>
                      handleRemoveSelectedCategory(selectedCategory.id)
                    }
                  />
                ))}
              </Stack>
              <Divider sx={{ my: "12px" }}></Divider>
              <Stack
                direction="row"
                gap="12px"
                flexWrap="wrap"
                sx={{
                  maxHeight: "15vh",
                  overflowY: "auto",
                }}>
                {categories
                  .filter(
                    (category) =>
                      !selectedCategories.includes(category) &&
                      category.name
                        .toLowerCase()
                        .includes(searchCategory.toLowerCase())
                  )
                  .map((category) => (
                    <Chip
                      key={category.id}
                      sx={{
                        "& .MuiChip-label": {
                          fontSize: "12px",
                        },
                      }}
                      label={category.name}
                      variant="outlined"
                      onClick={() => handleSelectedCategory(category)}
                      icon={<AddIcon />}
                    />
                  ))}
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              mt: "30px",
            }}>
            <Button
              variant="outlined"
              onClick={() => setOpenModal(false)}
              startIcon={<ArrowBackIcon />}>
              Quay về
            </Button>
            <Button
              sx={{
                color: colors.background,
              }}
              onClick={handleCreatePost}
              variant="contained"
              endIcon={<AddCircleIcon />}>
              Tạo
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreatePostPage;
