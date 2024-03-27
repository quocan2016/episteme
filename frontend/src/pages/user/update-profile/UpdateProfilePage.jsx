import { Container, Grid, Paper, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth-context";
import ChangePasswordTab from "../../../components/Tab/ChangePasswordTab";
import { UpdateAuthorInfoTab } from "../../../components/Tab";

const UpdateProfilePage = () => {
  const [value, setValue] = useState(0);
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper
        sx={{
          marginBottom: 5,
          textAlign: "center",
          paddingBlock: {
            md: 5,
            xs: 2,
          },
          letterSpacing: {
            md: "0.5px",
          },
          fontSize: {
            md: 32,
          },
          fontWeight: {
            md: 600,
          },
        }}>
        ACCOUNT
      </Paper>
      <Container>
        <Grid container spacing={3}>
          <Grid item md={3} xs={12}>
            <Tabs
              // orientation="vertical"
              className="tabs"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              sx={{
                borderRight: 1,
                borderColor: "divider",
                flexFlow: { md: "column", xs: "row" },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
                height: {
                  md: "600px",
                  xs: "fit-content",
                },

                "& .MuiTabs-scroller .MuiTabs-hideScrollbar .MuiTabs-scrollableX":
                  {
                    height: {
                      md: "100%",
                      xs: "fit-content",
                    },
                  },

                "& .MuiTabs-flexContainer": {
                  justifyContent: {
                    xs: "center",
                    md: "flex-start",
                  },
                  height: {
                    md: "100%",
                    xs: "fit-content",
                  },
                  flexFlow: { md: "column", xs: "row" },
                },
              }}>
              <Tab label="Cập nhật thông tin" {...a11yProps(0)} />
              {!user?.email.includes("--google") && (
                <Tab label="Đổi mật khẩu" {...a11yProps(1)} />
              )}
            </Tabs>
          </Grid>
          <Grid item md={9} xs={12}>
            <div>
              <UpdateAuthorInfoTab
                user={userInfo}
                value={value}
                index={0}></UpdateAuthorInfoTab>
              <ChangePasswordTab
                user={userInfo}
                value={value}
                index={1}></ChangePasswordTab>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default UpdateProfilePage;
