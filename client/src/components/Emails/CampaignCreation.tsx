import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const CampaignCreation = () => (
  <Html>
    <Head />
    <Preview>Your campaign has been submitted for approval.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Text style={logo}>FundMe</Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            Thankyou for choosing FundMe to create your campaign.
          </Text>
          <Text style={paragraph}>
            You can view status of your campaign on the website. Press the
            button below for the same.
          </Text>
          <Button style={button} href={`${baseUrl}/profile`}>
            View your Campaigns
          </Button>
          <Hr style={hr} />
          <Text style={paragraph}>
            Once your campaign is approved you will recieve another mail. Please
            keep in mind that after your campaign is approved there will be a
            small gas fees that needs to be paid before the campaign goes
            online.
          </Text>

          <Text style={paragraph}>
            For any kind of support feel free to email us at{" "}
            <Link style={anchor} href="mailto:ssanketpatil16@gmail.com">
              ssanketpatil16@gmail.com
            </Link>
            .
          </Text>
          <Text style={paragraph}>— The FundMe team</Text>
          <Hr style={hr} />
          <Text style={footer}>©️ FundMe</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default CampaignCreation;

const logo = {
  borderColor: "#14f588",
  fontSize: "20px",
};
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#14f588",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#14f588",
};

const button = {
  backgroundColor: "#14f588",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
