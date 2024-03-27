import { Box, Typography } from "@mui/material";
import { useMode } from "../../context/mode-context";
import { tokens } from "../../constants/theme";

const ProfileStatistic = ({ statistic }) => {
   const { theme } = useMode();
   const token = tokens(theme.palette.mode);
   if (!statistic) return null;
   return (
      <Box
         component="ul"
         sx={{
            display: "flex",
            flexFlow: "column",
            rowGap: 1,
            listStyle: "none",
            alignItems: "flex-start",
            padding: 2,
            borderRadius: 1,
            border: `1px solid ${token.textColor}`,
            "> li": {
               width: "100%",
               display: "flex",
               alignItems: "center",
               justifyContent: "space-between",
               cursor: "pointer",
               ":hover > span:last-child": {
                  color: token.greenAccent,
               },
               "> span": {
                  md: {
                     fontSize: "14px",
                  },
                  xs: {
                     fontSize: "10px",
                  },
               },
               // fontSize: {
               //    md: "16px",
               // },
            },
         }}
      >
         <Box component="li">
            <Typography variant="subtitle2" component="span">
               Tổng số lượt xem
            </Typography>
            <Typography variant="subtitle2" component="span">
               {statistic?.totalView || 0}
            </Typography>
         </Box>
         <Box component="li">
            <Typography variant="subtitle2" component="span">
               Số lượng bài viết
            </Typography>
            <Typography variant="subtitle2" component="span">
               {statistic?.totalPost || 0}
            </Typography>
         </Box>
         <Box component="li">
            <Typography variant="subtitle2" component="span">
               Người theo dõi
            </Typography>
            <Typography variant="subtitle2" component="span">
               {statistic?.totalFollower?.follower || 0}
            </Typography>
         </Box>
         <Box component="li">
            <Typography variant="subtitle2" component="span">
               Người đang theo dõi
            </Typography>
            <Typography variant="subtitle2" component="span">
               {statistic?.totalFollower?.following || 0}
            </Typography>
         </Box>
         <Box component="li">
            <Typography variant="subtitle2" component="span">
               Bài viết đã lưu
            </Typography>
            <Typography variant="subtitle2" component="span">
               {statistic?.totalBookmark || 0}
            </Typography>
         </Box>
      </Box>
   );
};

export default ProfileStatistic;
