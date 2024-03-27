import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import HeaderAdmin from "../../components/HeaderAdmin";
import StatBox from "./../../components/StatBox/index";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { tokens } from "../../constants/theme";
import { useTheme } from "@emotion/react";
import LineChart from "../../components/LineChart";
import InfoUserTable from "../../components/InfoUserTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReportPostNew } from "../../services/reportService";
import { getReportUserNew } from "./../../services/reportService";
import {
  getPostsByType,
  getPostsPedingForAdmin,
} from "../../services/postService";
import { getPopularAuthors } from "../../services/authorService";
import { CardPost } from "../../components/CardPost";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { set } from "date-fns";

const getPrevDay = (about) => {
  // Lấy ngày hiện tại
  var currentDate = new Date();

  // Lấy ngày ngày trước
  var sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - about);

  return sevenDaysAgo.toISOString().split("T")[0];
};

const precentDownUp = (value1, value2) => {
  if (value2 === 0) return 0;
  const precent = ((value2 - value1) / value2) * 100;
  console.log(precent);
  return precent;
};

const HomePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [reportWeek, setReportWeek] = useState([]);
  const [reportUserDay, setReportUserDay] = useState({
    total: 0,
    prescent: 0,
  });
  const [posts, setPosts] = useState([]);
  const [popularAuthors, setPopularAuthors] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [toDate, setToDate] = useState(getPrevDay(6));
  const [fromDate, setFromDate] = useState(getPrevDay(0));
  const [reportPostrDay, setReportPostrDay] = useState({
    total: 0,
    prescent: 0,
  });

  useEffect(() => {
    setReportWeek([]);
    getReportPostNew(toDate, fromDate).then((response) =>
      setReportWeek((prev) => [...prev, response.data])
    );
    getReportUserNew(toDate, fromDate).then((response) =>
      setReportWeek((prev) => [...prev, response.data])
    );
  }, [toDate, fromDate]);

  useEffect(() => {
    getPostsPedingForAdmin().then((response) => setPosts(response?.data));

    getReportPostNew(getPrevDay(1), getPrevDay(0)).then((response) => {
      const report = response.data.data;

      setReportPostrDay({
        total: report[1].y,
        prescent: precentDownUp(report[0].y, report[1].y),
      });
    });
    getReportUserNew(getPrevDay(1), getPrevDay(0)).then((response) => {
      const report = response.data.data;
      setReportUserDay({
        total: report[1].y,
        prescent: precentDownUp(report[0].y, report[1].y),
      });
    });

    getPopularAuthors().then((response) => setPopularAuthors(response.data));

    getPostsByType({
      type: "popular",
      pageNumber: 0,
      pageSize: 5,
      sortBy: "createAt",
    }).then((response) => setPopularPosts(response.data.content));
  }, []);

  return (
    <Box m="20px">
      <HeaderAdmin
        title="Trang chủ"
        subtitle="Thống kê một số thông tin"></HeaderAdmin>
      <Grid container spacing="20px">
        <Grid item md={4} sm={4} xs={12}>
          <StatBox
            progress={1}
            icon={
              <ConfirmationNumberIcon
                sx={{ color: colors.greenAccent, fontSize: "26px" }}
              />
            }
            title={posts.length}
            subtitle="Bài viết chờ duyệt"></StatBox>
        </Grid>
        <Grid item md={4} sm={4} xs={12}>
          <StatBox
            icon={
              <CreateNewFolderIcon
                sx={{ color: colors.greenAccent, fontSize: "26px" }}
              />
            }
            progress={reportPostrDay.prescent / 100}
            title={reportPostrDay.total}
            increase={`${reportPostrDay.prescent}%`}
            subtitle="Bài viết mới"></StatBox>
        </Grid>
        {reportUserDay && (
          <Grid item md={4} sm={4} xs={12}>
            <StatBox
              progress={reportUserDay.prescent / 100}
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent, fontSize: "26px" }}
                />
              }
              title={reportUserDay.total}
              increase={`${reportUserDay.prescent}%`}
              subtitle="Người dùng mới"></StatBox>
          </Grid>
        )}
        <Grid item md={8} sm={12} xs={12}>
          <Paper sx={{ padding: "20px", overflowX: "auto" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap="20px">
              <Typography variant="h5">Thống kê theo tuần</Typography>
              <Box display="flex" alignItems="center" gap="20px">
                <DatePicker
                  format="DD/MM/YYYY"
                  value={dayjs(toDate)}
                  onChange={(value) =>
                    setToDate(dayjs(value).format("YYYY-MM-DD"))
                  }
                  sx={{ width: "150px" }}
                />
                -
                <DatePicker
                  format="DD/MM/YYYY"
                  value={dayjs(fromDate)}
                  onChange={(value) =>
                    setFromDate(dayjs(value).format("YYYY-MM-DD"))
                  }
                  sx={{ width: "150px" }}
                />
              </Box>
            </Box>
            <Box height="400px" minWidth="400px">
              <LineChart data={reportWeek} />
            </Box>
          </Paper>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <Paper sx={{ padding: "20px", mb: "20px" }}>
            <Typography variant="h5" mb="20px">
              Tác giả nổi bật
            </Typography>
            <Stack spacing="15px" overflow="hidden">
              {popularAuthors.map((popularAuthor) => (
                <Link
                  to={`/profile/${popularAuthor.id}`}
                  key={popularAuthor.id}>
                  <InfoUserTable
                    title={popularAuthor.fullname}
                    subtitle={popularAuthor.email}
                    avatar={popularAuthor.image}></InfoUserTable>
                </Link>
              ))}
            </Stack>
          </Paper>
          <Paper sx={{ padding: "20px" }}>
            <Typography variant="h5" mb="20px">
              Bài viết nổi bật
            </Typography>
            <Stack
              spacing="20px"
              overflow="hidden"
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "transparent",
                },
              }}>
              {popularPosts.map((popularPost) => (
                <CardPost
                  key={popularPost.id}
                  postInfo={popularPost}
                  direction="horizontal"></CardPost>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
