import { Box, Container, Typography } from "@mui/material";
import image from "../../../assets/img/ngongbagang.png";
import { useEffect } from "react";
import { useMode } from "../../../context/mode-context";
import { tokens } from "../../../constants/theme";

const About = ({ title }) => {
  const { theme } = useMode();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <Container
      sx={{
        textAlign: "center",
        mt: "70px",
      }}>
      <Typography
        variant="h1"
        marginBottom={5}
        sx={{
          textAlign: "center",
          display: "inline-block",
          paddingBlock: 1,
          border: "3px solid transparent",
          borderBottomColor: colors.greenAccent,
        }}>
        Về chúng tôi
      </Typography>
      <Box
        component="ul"
        sx={{
          paddingLeft: "12px",
          listStyleType: "order",
        }}>
        <Box component="li" id="episteme">
          <Typography variant="h4" textAlign="left" marginBottom={3}>
            Episteme
          </Typography>
          <Box
            marginBottom={8}
            textAlign="left"
            display="flex"
            alignItems="center"
            flexDirection="column">
            <Typography variant="h5" component="p" marginBottom={2}>
              <b>Episteme</b> đươc thành lập bởi nhóm <b>Ngỗng Ba Gang</b> với
              hi vọng là phát triển nơi này thành một nơi để mọi người có thể
              chia sẻ kiến thức đã lĩnh hội được trong cuộc sống, học tập đến
              với mọi người. Hãy cùng nhau phát triển <b>Episteme</b> thành một
              cộng đồng văn minh, ý thức.
            </Typography>
            <Typography variant="h5" component="p" marginBottom={2}>
              Episteme không chỉ đơn thuần là một trang blog, mà là một cộng
              đồng đam mê học hỏi và trao đổi thông tin. Chúng ta tin rằng kiến
              thức nên được chia sẻ một cách tự do và rộng rãi, để mỗi người có
              cơ hội học hỏi từ nhau và phát triển bản thân.
            </Typography>
            <Typography variant="h5" component="p" marginBottom={2}>
              Trang blog này là nơi chúng ta có thể khám phá các chủ đề mới, tìm
              hiểu những kiến thức hữu ích, và cùng nhau trải nghiệm những hành
              trình học tập thú vị. Chúng ta sẽ khám phá những bài viết đa dạng
              từ các tác giả, bao gồm các hướng dẫn, phân tích sâu về các chủ
              đề, những cảm nhận và chia sẻ cá nhân.
            </Typography>
            <Typography variant="h5" component="p" marginBottom={2}>
              Qua Episteme, chúng tôi mong muốn xây dựng một cộng đồng mở, nơi
              mỗi người đều có cơ hội chia sẻ những gì họ biết và học hỏi từ
              những người khác. Chúng tôi tin rằng mỗi cá nhân đều có một góc
              nhìn riêng, và khi chúng ta cùng nhau chia sẻ, kiến thức của mọi
              người sẽ càng trở nên đa dạng và phong phú hơn.
            </Typography>
            <Typography variant="h5" component="p" marginBottom={2}>
              Hãy cùng nhau tham gia vào cuộc hành trình học tập và chia sẻ trên
              trang blog Episteme. Chúng ta sẽ cùng nhau tạo nên một không gian
              học tập mở và thú vị, nơi mọi người có thể kết nối và tiến xa hơn
              trên con đường khám phá kiến thức.
            </Typography>
          </Box>
        </Box>
        <Box component="li" id="dev">
          <Typography variant="h4" textAlign="left" marginBottom={3}>
            Đội ngũ phát triển
          </Typography>
          <Box
            marginBottom={8}
            textAlign="left"
            display="flex"
            flexDirection="column"
            gap={2}>
            <Typography variant="h5">
              Chúng tôi xin gửi lời chào và giới thiệu về đội ngũ phát triển đầy
              nhiệt huyết của chúng tôi tại dự án này. Chúng tôi là một nhóm
              sinh viên đam mê học tập, sẵn sàng kết hợp kiến thức và sự sáng
              tạo để tạo nên một không gian học tập mở và thú vị.
            </Typography>
            <Typography variant="h5">
              Chúng tôi hiểu rằng thời sinh viên là giai đoạn quý báu để khám
              phá, học hỏi và góp phần vào sự phát triển xã hội. Chính vì vậy,
              dự án này không chỉ là nơi chúng tôi chia sẻ kiến thức mà còn là
              cơ hội để học hỏi, thử nghiệm ý tưởng và hoàn thiện kỹ năng của
              mình.
            </Typography>
            <Typography variant="h5">
              Chúng tôi xin chân thành cảm ơn sự ủng hộ và quan tâm của bạn đối
              với dự án này. Hãy đồng hành cùng chúng tôi trên hành trình bơi
              lội thế giới kiến thức và học tập, tạo nên những dấu ấn đáng nhớ
              trong thời gian học tập.
            </Typography>
            <Box
              sx={{
                width: "100%",
                maxWidth: "400px",
                margin: "40px auto",
              }}>
              <img
                style={{ width: "100%", objectFit: "cover" }}
                className="image"
                src={image}
                alt="ngong-ba-gang"
              />
            </Box>
            <Typography
              textAlign="center"
              variant="h1"
              sx={{
                backgroundImage: `linear-gradient(96.38deg, rgb(72, 202, 125) -0.67%, rgb(72, 202, 125) 31.53%, rgb(56, 182, 255) 61.61%, rgb(56, 182, 255) 100.67%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}>
              Ngỗng Ba Gang
            </Typography>
          </Box>
        </Box>
        <Box component="li" id="thanks">
          <Typography variant="h4" textAlign="left" marginBottom={3}>
            Lời cảm ơn
          </Typography>
          <Box
            marginBottom={8}
            textAlign="left"
            display="flex"
            flexDirection="column"
            gap={2}>
            <Typography variant="h5">
              Chúng tôi xin chân thành cảm ơn bạn đã dành thời gian quý báu để
              ghé thăm trang blog Episteme của chúng tôi. Sự quan tâm và ủng hộ
              của bạn chính là động lực để chúng tôi tiếp tục phát triển và chia
              sẻ kiến thức đa dạng, hữu ích với cộng đồng.
            </Typography>
            <Typography variant="h5">
              Episteme không chỉ là một trang blog, mà là một không gian mà
              chúng tôi mong muốn cùng bạn xây dựng - một không gian mà mỗi
              người đều có thể tìm thấy những kiến thức mới, tận hưởng những
              hành trình học tập thú vị và chia sẻ những cảm xúc, suy nghĩ của
              riêng mình.
            </Typography>
            <Typography variant="h5">
              Chúng tôi biết rằng kiến thức không bao giờ ngừng lan tỏa và phát
              triển khi được chia sẻ. Và với sự góp mặt của bạn, chúng tôi tin
              rằng Episteme sẽ trở thành một nguồn tài liệu quý báu, một không
              gian mở để cùng nhau học hỏi và cùng nhau trải nghiệm những điều
              mới mẻ.
            </Typography>
            <Typography variant="h5">
              Một lần nữa, chúng tôi xin chân thành cảm ơn bạn đã đồng hành cùng
              chúng tôi trên con đường chia sẻ kiến thức và học tập. Hãy tiếp
              tục ủng hộ và chia sẻ Episteme cùng với những người xung quanh, để
              chúng ta cùng nhau làm cho thế giới trở nên thông tin hơn, sáng
              ngời hơn.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
